"use client";

import { useEffect, useState, useCallback } from "react";
import type { Resource } from "@/types/database";
import ResourceGrid from "./ResourceGrid";
import ResourceMap from "./ResourceMap";
import { supabase } from "@/lib/supabase";

interface HowFormat {
  id: string;
  name: string;
  sort_order: number;
}

interface ViewToggleProps {
  resources: Resource[];
  hasMore?: boolean;
  loadingMore?: boolean;
  onLoadMore?: () => void;
  showMap?: boolean;
}

export default function ViewToggle({ resources, hasMore, loadingMore, onLoadMore, showMap = false }: ViewToggleProps) {
  const mappable = resources.filter((r) => r.latitude && r.longitude);
  const [howFormats, setHowFormats] = useState<HowFormat[]>([]);
  const [resourceHowMap, setResourceHowMap] = useState<Record<string, string[]>>({});
  const [loaded, setLoaded] = useState(false);

  const fetchHowData = useCallback(async () => {
    const [formatsRes, junctionRes] = await Promise.all([
      supabase.from("how_formats").select("id, name, sort_order").order("sort_order"),
      supabase.from("resources_how_formats").select("resource_id, how_format_id"),
    ]);
    setHowFormats(formatsRes.data ?? []);
    const map: Record<string, string[]> = {};
    (junctionRes.data ?? []).forEach((row: any) => {
      if (!map[row.resource_id]) map[row.resource_id] = [];
      map[row.resource_id].push(row.how_format_id);
    });
    setResourceHowMap(map);
    setLoaded(true);
  }, []);

  useEffect(() => { fetchHowData(); }, [fetchHowData]);

  // Group resources by HOW format
  const resourceIds = new Set(resources.map((r) => r.id));
  const grouped: { format: HowFormat; resources: Resource[] }[] = [];
  const ungrouped: Resource[] = [];

  if (loaded) {
    const assigned = new Set<string>();
    for (const format of howFormats) {
      const matching = resources.filter((r) => {
        const howIds = resourceHowMap[r.id] ?? [];
        return howIds.includes(format.id);
      });
      if (matching.length > 0) {
        grouped.push({ format, resources: matching });
        matching.forEach((r) => assigned.add(r.id));
      }
    }
    // Resources with no HOW format
    resources.forEach((r) => {
      if (!assigned.has(r.id)) ungrouped.push(r);
    });
  }

  return (
    <div>
      {showMap && mappable.length > 0 && (
        <div className="mb-6">
          <ResourceMap resources={mappable} />
        </div>
      )}

      {!loaded || resources.length === 0 ? (
        resources.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No resources found.</p>
        ) : (
          <ResourceGrid resources={resources} hasMore={hasMore} loadingMore={loadingMore} onLoadMore={onLoadMore} />
        )
      ) : (
        <div>
          {grouped.map(({ format, resources: groupResources }) => (
            <div key={format.id} className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{format.name}</h2>
              <ResourceGrid resources={groupResources} />
            </div>
          ))}
          {ungrouped.length > 0 && (
            <div className="mb-8">
              {grouped.length > 0 && (
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Other</h2>
              )}
              <ResourceGrid resources={ungrouped} hasMore={hasMore} loadingMore={loadingMore} onLoadMore={onLoadMore} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function MapToggleButton({ showMap, onToggle }: { showMap: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-ocean-light hover:bg-gray-200 dark:hover:bg-ocean-dark text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors whitespace-nowrap"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
      {showMap ? "Hide Map" : "Show Map"}
    </button>
  );
}
