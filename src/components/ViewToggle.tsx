"use client";

import { useEffect, useState, useCallback } from "react";
import type { Resource } from "@/types/database";
import ResourceGrid from "./ResourceGrid";
import ResourceMap from "./ResourceMap";
import { supabase } from "@/lib/supabase";

interface FormatItem {
  id: string;
  name: string;
  sort_order: number;
}

interface ModeItem {
  id: string;
  name: string;
}

interface ViewToggleProps {
  resources: Resource[];
  hasMore?: boolean;
  loadingMore?: boolean;
  onLoadMore?: () => void;
  showMap?: boolean;
  showInPerson?: boolean;
  showOnline?: boolean;
}

export default function ViewToggle({ resources, hasMore, loadingMore, onLoadMore, showMap = false, showInPerson = true, showOnline = true }: ViewToggleProps) {
  const [formats, setFormats] = useState<FormatItem[]>([]);
  const [resourceFormatMap, setResourceFormatMap] = useState<Record<string, string[]>>({});
  const [modes, setModes] = useState<ModeItem[]>([]);
  const [resourceModeMap, setResourceModeMap] = useState<Record<string, string[]>>({});
  const [loaded, setLoaded] = useState(false);

  const fetchData = useCallback(async () => {
    const [formatsRes, formatJunctionRes, modesRes, modeJunctionRes] = await Promise.all([
      supabase.from("formats").select("id, name, sort_order").order("sort_order"),
      supabase.from("resources_formats").select("resource_id, format_id"),
      supabase.from("modes").select("id, name"),
      supabase.from("resources_modes").select("resource_id, mode_id"),
    ]);
    setFormats(formatsRes.data ?? []);
    setModes(modesRes.data ?? []);

    const fMap: Record<string, string[]> = {};
    (formatJunctionRes.data ?? []).forEach((row: any) => {
      if (!fMap[row.resource_id]) fMap[row.resource_id] = [];
      fMap[row.resource_id].push(row.format_id);
    });
    setResourceFormatMap(fMap);

    const mMap: Record<string, string[]> = {};
    (modeJunctionRes.data ?? []).forEach((row: any) => {
      if (!mMap[row.resource_id]) mMap[row.resource_id] = [];
      mMap[row.resource_id].push(row.mode_id);
    });
    setResourceModeMap(mMap);
    setLoaded(true);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Build mode name lookup
  const modeLookup = Object.fromEntries(modes.map((m) => [m.id, m.name]));

  // Get mode names for a resource
  function getResourceModeNames(resourceId: string): string[] {
    const modeIds = resourceModeMap[resourceId] ?? [];
    return modeIds.map((id) => modeLookup[id]).filter(Boolean);
  }

  // Filter resources by active mode toggles
  const filteredResources = loaded ? resources.filter((r) => {
    const modeNames = getResourceModeNames(r.id);
    const isInPerson = modeNames.includes("In Person");
    const isOnline = modeNames.includes("Online");
    const hasNoMode = modeNames.length === 0 || (!isInPerson && !isOnline);

    if (showInPerson && showOnline) return true;
    if (!showInPerson && !showOnline) return false;
    if (showInPerson && !showOnline) return isInPerson || hasNoMode;
    if (!showInPerson && showOnline) return isOnline || hasNoMode;
    return true;
  }) : resources;

  const mappable = filteredResources.filter((r) => r.latitude && r.longitude);

  // Group by format
  const grouped: { format: FormatItem; resources: Resource[] }[] = [];
  const ungrouped: Resource[] = [];

  if (loaded) {
    const assigned = new Set<string>();
    for (const format of formats) {
      const matching = filteredResources.filter((r) => {
        const fIds = resourceFormatMap[r.id] ?? [];
        return fIds.includes(format.id);
      });
      if (matching.length > 0) {
        grouped.push({ format, resources: matching });
        matching.forEach((r) => assigned.add(r.id));
      }
    }
    filteredResources.forEach((r) => {
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

      {!loaded || filteredResources.length === 0 ? (
        filteredResources.length === 0 && loaded ? (
          <p className="text-gray-500 dark:text-gray-400">No resources found.</p>
        ) : (
          <ResourceGrid resources={filteredResources} hasMore={hasMore} loadingMore={loadingMore} onLoadMore={onLoadMore} resourceModeMap={resourceModeMap} modeLookup={modeLookup} />
        )
      ) : (
        <div>
          {grouped.map(({ format, resources: groupResources }) => (
            <div key={format.id} className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{format.name}</h2>
              <ResourceGrid resources={groupResources} resourceModeMap={resourceModeMap} modeLookup={modeLookup} />
            </div>
          ))}
          {ungrouped.length > 0 && (
            <div className="mb-8">
              {grouped.length > 0 && (
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Other</h2>
              )}
              <ResourceGrid resources={ungrouped} hasMore={hasMore} loadingMore={loadingMore} onLoadMore={onLoadMore} resourceModeMap={resourceModeMap} modeLookup={modeLookup} />
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
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
        showMap ? "bg-brand-gold text-white" : "bg-gray-100 dark:bg-ocean-light hover:bg-gray-200 dark:hover:bg-ocean-dark text-gray-700 dark:text-gray-300"
      }`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
      {showMap ? "Hide Map" : "Show Map"}
    </button>
  );
}

export function ModeToggleButtons({ showInPerson, showOnline, onToggleInPerson, onToggleOnline }: {
  showInPerson: boolean; showOnline: boolean; onToggleInPerson: () => void; onToggleOnline: () => void;
}) {
  return (
    <>
      <button
        onClick={onToggleInPerson}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
          showInPerson ? "bg-brand-gold text-white" : "bg-gray-100 dark:bg-ocean-light hover:bg-gray-200 dark:hover:bg-ocean-dark text-gray-700 dark:text-gray-300"
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {showInPerson ? "Hide In Person" : "Show In Person"}
      </button>
      <button
        onClick={onToggleOnline}
        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
          showOnline ? "bg-brand-gold text-white" : "bg-gray-100 dark:bg-ocean-light hover:bg-gray-200 dark:hover:bg-ocean-dark text-gray-700 dark:text-gray-300"
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
        </svg>
        {showOnline ? "Hide Online" : "Show Online"}
      </button>
    </>
  );
}
