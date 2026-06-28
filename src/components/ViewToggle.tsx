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
  const [activeTab, setActiveTab] = useState<string | null>(null);

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

  function getResourceModeNames(resourceId: string): string[] {
    const modeIds = resourceModeMap[resourceId] ?? [];
    return modeIds.map((id) => modeLookup[id]).filter(Boolean);
  }

  // Filter resources by active mode toggles
  const modeFiltered = loaded ? resources.filter((r) => {
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

  // Group by format tabs
  const formatTabs: { format: FormatItem; count: number }[] = [];
  const formatResourceMap: Record<string, Resource[]> = {};
  const assignedIds = new Set<string>();

  if (loaded) {
    // Find the Services format ID to use as default for unassigned
    const servicesFormat = formats.find((f) => f.name === "Services");

    for (const format of formats) {
      const matching = modeFiltered.filter((r) => {
        const fIds = resourceFormatMap[r.id] ?? [];
        return fIds.includes(format.id);
      });
      if (matching.length > 0) {
        formatTabs.push({ format, count: matching.length });
        formatResourceMap[format.id] = matching;
        matching.forEach((r) => assignedIds.add(r.id));
      }
    }

    // Unassigned resources go into Services
    const unassigned = modeFiltered.filter((r) => !assignedIds.has(r.id));
    if (unassigned.length > 0 && servicesFormat) {
      if (!formatResourceMap[servicesFormat.id]) {
        formatResourceMap[servicesFormat.id] = [];
        formatTabs.unshift({ format: servicesFormat, count: 0 });
      }
      formatResourceMap[servicesFormat.id] = [...(formatResourceMap[servicesFormat.id] ?? []), ...unassigned];
      const tab = formatTabs.find((t) => t.format.id === servicesFormat.id);
      if (tab) tab.count = formatResourceMap[servicesFormat.id].length;
    }
  }

  // Set default active tab
  useEffect(() => {
    if (loaded && activeTab === null && formatTabs.length > 0) {
      setActiveTab(formatTabs[0].format.id);
    }
  }, [loaded, formatTabs.length]);

  const activeResources = activeTab ? (formatResourceMap[activeTab] ?? []) : modeFiltered;
  const mappable = modeFiltered.filter((r) => r.latitude && r.longitude);

  return (
    <div>
      {showMap && mappable.length > 0 && (
        <div className="mb-6">
          <ResourceMap resources={mappable} />
        </div>
      )}

      {!loaded ? (
        <p className="text-gray-500">Loading...</p>
      ) : modeFiltered.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No resources found.</p>
      ) : (
        <div>
          {/* Format tabs */}
          {formatTabs.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-6 border-b border-gray-200 dark:border-ocean-light">
              {formatTabs.map(({ format, count }) => (
                <button
                  key={format.id}
                  onClick={() => setActiveTab(format.id)}
                  className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                    activeTab === format.id
                      ? "border-brand-gold text-brand-gold"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  {format.name} <span className="text-xs opacity-60">({count})</span>
                </button>
              ))}
            </div>
          )}

          {/* Resources for active tab */}
          <ResourceGrid
            resources={activeResources}
            hasMore={hasMore}
            loadingMore={loadingMore}
            onLoadMore={onLoadMore}
            resourceModeMap={resourceModeMap}
            modeLookup={modeLookup}
          />
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
