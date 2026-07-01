"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import type { Resource } from "@/types/database";
import ResourceGrid from "./ResourceGrid";
import ResourceMap from "./ResourceMap";
import { supabase } from "@/lib/supabase";
import InfoTooltip from "./InfoTooltip";

interface FormatItem {
  id: string;
  name: string;
  sort_order: number;
}

interface ModeItem {
  id: string;
  name: string;
}

const JUNCTION_MAP: Record<string, { table: string; fk: string }> = {
  categories: { table: "resources_categories", fk: "category_id" },
  modes: { table: "resources_modes", fk: "mode_id" },
  formats: { table: "resources_formats", fk: "format_id" },
  centerings: { table: "resources_centerings", fk: "centering_id" },
};

interface ViewToggleProps {
  resources: Resource[];
  hasMore?: boolean;
  loadingMore?: boolean;
  onLoadMore?: () => void;
  showMap?: boolean;
  showInPerson?: boolean;
  showOnline?: boolean;
  filters?: Record<string, Set<string>>;
  elementId?: string;
}

export default function ViewToggle({ resources, hasMore, loadingMore, onLoadMore, showMap = false, showInPerson = true, showOnline = true, filters, elementId }: ViewToggleProps) {
  const [formats, setFormats] = useState<FormatItem[]>([]);
  const [modes, setModes] = useState<ModeItem[]>([]);
  const [resourceModeMap, setResourceModeMap] = useState<Record<string, string[]>>({});
  const [resourceCategoryImages, setResourceCategoryImages] = useState<Record<string, { name: string; imageUrl: string }[]>>({});
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [dbFormatCounts, setDbFormatCounts] = useState<Record<string, number>>({});
  // Resources fetched per tab (null = not yet fetched)
  const [tabResources, setTabResources] = useState<Record<string, Resource[] | null>>({});
  const [tabLoading, setTabLoading] = useState(false);
  const fetchingTabRef = useRef<string | null>(null);

  const fetchData = useCallback(async () => {
    const [formatsRes, modesRes, modeJunctionRes, catJunctionRes, categoriesRes] = await Promise.all([
      supabase.from("formats").select("id, name, sort_order").order("sort_order"),
      supabase.from("modes").select("id, name"),
      supabase.from("resources_modes").select("resource_id, mode_id"),
      supabase.from("resources_categories").select("resource_id, category_id"),
      supabase.from("categories").select("id, name, default_featured_image"),
    ]);
    setFormats(formatsRes.data ?? []);
    setModes(modesRes.data ?? []);

    const countsRes = await fetch("/api/filters/counts", { cache: "no-store" });
    if (countsRes.ok) {
      const data = await countsRes.json();
      setDbFormatCounts(data.formats ?? {});
    }

    // Build category image map per resource
    const catLookup = Object.fromEntries((categoriesRes.data ?? []).map((c: any) => [c.id, { name: c.name, imageUrl: c.default_featured_image }]));
    const rcMap: Record<string, { name: string; imageUrl: string }[]> = {};
    (catJunctionRes.data ?? []).forEach((row: any) => {
      if (!rcMap[row.resource_id]) rcMap[row.resource_id] = [];
      const cat = catLookup[row.category_id];
      if (cat) rcMap[row.resource_id].push(cat);
    });
    setResourceCategoryImages(rcMap);

    const mMap: Record<string, string[]> = {};
    (modeJunctionRes.data ?? []).forEach((row: any) => {
      if (!mMap[row.resource_id]) mMap[row.resource_id] = [];
      mMap[row.resource_id].push(row.mode_id);
    });
    setResourceModeMap(mMap);
    setLoaded(true);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Fetch all resources for the active tab from Supabase directly
  const fetchTabResources = useCallback(async (formatId: string) => {
    if (fetchingTabRef.current === formatId) return;
    fetchingTabRef.current = formatId;
    setTabLoading(true);

    const today = new Date().toISOString().split("T")[0];

    // Start with resource IDs for this format
    const { data: formatLinks } = await supabase
      .from("resources_formats")
      .select("resource_id")
      .eq("format_id", formatId);
    let ids: Set<string> = new Set((formatLinks ?? []).map((l: any) => l.resource_id));

    // Apply active filters (categories, centerings, etc.)
    if (filters) {
      for (const [filterKey, selectedIds] of Object.entries(filters)) {
        if (!selectedIds || selectedIds.size === 0) continue;
        const junction = JUNCTION_MAP[filterKey];
        if (!junction) continue;
        const { data: links } = await supabase
          .from(junction.table)
          .select("resource_id")
          .in(junction.fk, Array.from(selectedIds));
        const filtered = new Set((links ?? []).map((l: any) => l.resource_id));
        ids = new Set([...ids].filter((id) => filtered.has(id)));
      }
    }

    // Apply elementId scope
    if (elementId) {
      const { data: eleLinks } = await supabase
        .from("resources_elements")
        .select("resource_id")
        .eq("element_id", elementId);
      const eleIds = new Set((eleLinks ?? []).map((l: any) => l.resource_id));
      ids = new Set([...ids].filter((id) => eleIds.has(id)));
    }

    if (ids.size === 0) {
      setTabResources((prev) => ({ ...prev, [formatId]: [] }));
      fetchingTabRef.current = null;
      setTabLoading(false);
      return;
    }

    const { data } = await supabase
      .from("resources")
      .select("*")
      .in("id", Array.from(ids))
      .or(`expiration_date.is.null,expiration_date.gte.${today}`)
      .order("created_at", { ascending: false });

    setTabResources((prev) => ({ ...prev, [formatId]: data ?? [] }));
    fetchingTabRef.current = null;
    setTabLoading(false);
  }, [filters, elementId]);

  // Build mode name lookup
  const modeLookup = Object.fromEntries(modes.map((m) => [m.id, m.name]));

  function getResourceModeNames(resourceId: string): string[] {
    const modeIds = resourceModeMap[resourceId] ?? [];
    return modeIds.map((id) => modeLookup[id]).filter(Boolean);
  }

  function passesMode(r: Resource): boolean {
    const modeNames = getResourceModeNames(r.id);
    const isInPerson = modeNames.includes("In Person");
    const isOnline = modeNames.includes("Online");
    const hasNoMode = modeNames.length === 0 || (!isInPerson && !isOnline);
    if (showInPerson && showOnline) return true;
    if (!showInPerson && !showOnline) return false;
    if (showInPerson && !showOnline) return isInPerson || hasNoMode;
    if (!showInPerson && showOnline) return isOnline || hasNoMode;
    return true;
  }

  // All format tabs (shown regardless of what's currently loaded)
  const formatTabs: { format: FormatItem; count: number }[] = loaded
    ? formats.map((format) => ({ format, count: dbFormatCounts[format.id] ?? 0 }))
    : [];

  // Set default active tab to first format on load
  useEffect(() => {
    if (loaded && activeTab === null && formatTabs.length > 0) {
      setActiveTab(formatTabs[0].format.id);
    }
  }, [loaded, formatTabs.length]);

  // Fetch resources for active tab when it changes
  useEffect(() => {
    if (!activeTab || !loaded) return;
    if (tabResources[activeTab] !== undefined) return; // already fetched
    fetchTabResources(activeTab);
  }, [activeTab, loaded, tabResources, fetchTabResources]);

  // Apply mode filter to active tab's resources
  const rawActiveResources = activeTab ? (tabResources[activeTab] ?? null) : null;
  const activeResources = rawActiveResources ? rawActiveResources.filter(passesMode) : null;

  // Map uses the prop resources (already filtered+paginated, good enough for pins)
  const mappable = resources.filter((r) => r.latitude && r.longitude);

  return (
    <div>
      {showMap && mappable.length > 0 && (
        <div className="mb-6">
          <ResourceMap resources={mappable} />
        </div>
      )}

      {!loaded ? (
        <p className="text-gray-500">Loading...</p>
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
          {tabLoading || activeResources === null ? (
            <p className="text-gray-500">Loading...</p>
          ) : activeResources.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No resources found.</p>
          ) : (
            <ResourceGrid
              resources={activeResources}
              hasMore={false}
              loadingMore={false}
              onLoadMore={undefined}
              resourceModeMap={resourceModeMap}
              modeLookup={modeLookup}
              resourceCategoryImages={resourceCategoryImages}
            />
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

export function ViewControlsInfo() {
  return (
    <InfoTooltip
      text={
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white mb-1">Show Map:</p>
            <p>Show resources on a map (will not show Online Resources).</p>
            <p>Resources at the same address are grouped into one pin with a number, tap it to see the list.</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white mb-1">Show In Person / Show Online:</p>
            <p>Show or hide resources based on how you can access them: In Person at a physical location, or Online (website, phone, app).</p>
          </div>
        </div>
      }
    />
  );
}
