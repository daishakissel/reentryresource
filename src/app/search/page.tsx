"use client";

import { Suspense, useEffect, useState, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { searchResources } from "@/lib/searchUtils";
import type { SearchableResource } from "@/lib/searchUtils";
import { loadFilters, saveFilters, saveLastWhy } from "@/lib/filterStorage";
import ViewToggle, { MapToggleButton } from "@/components/ViewToggle";
import ResourceFilter from "@/components/ResourceFilter";

const JUNCTION_MAP: Record<string, { table: string; fk: string }> = {
  where_location_types: { table: "resources_where_location_types", fk: "where_location_type_id" },
  when_times: { table: "resources_when_times", fk: "when_time_id" },
  how_formats: { table: "resources_how_formats", fk: "how_format_id" },
  who_centerings: { table: "resources_who_centerings", fk: "who_centering_id" },
};

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="text-gray-500">Loading...</p>}>
      <SearchPageInner />
    </Suspense>
  );
}

function SearchPageInner() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [allResources, setAllResources] = useState<SearchableResource[]>([]);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState<Record<string, Set<string>>>({});
  const [loaded, setLoaded] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [junctionData, setJunctionData] = useState<Record<string, Record<string, string[]>>>({});

  // Sync query from URL when it changes
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  // Load filters from localStorage
  useEffect(() => {
    setSelected(loadFilters());
    saveLastWhy("Search", "/search");
    setLoaded(true);
  }, []);

  function handleSelectionChange(newSelected: Record<string, Set<string>>) {
    setSelected(newSelected);
    saveFilters(newSelected);
  }

  // Fetch all resources once
  const fetchData = useCallback(async () => {
    setLoading(true);

    const [resourcesRes, ...junctionResults] = await Promise.all([
      supabase.from("resources").select("*, what_topics(name)").or(`expiration_date.is.null,expiration_date.gte.${new Date().toISOString().split("T")[0]}`).order("title"),
      ...Object.entries(JUNCTION_MAP).map(([, config]) =>
        supabase.from(config.table).select(`resource_id, ${config.fk}`)
      ),
    ]);

    setAllResources(
      (resourcesRes.data ?? []).map((r: any) => ({
        ...r,
        topic_name: r.what_topics?.name || "",
        city_display: r.city || "",
      }))
    );

    // Build junction maps: { filterKey: { resourceId: [filterId, ...] } }
    const jd: Record<string, Record<string, string[]>> = {};
    Object.keys(JUNCTION_MAP).forEach((key, idx) => {
      const fk = JUNCTION_MAP[key].fk;
      const map: Record<string, string[]> = {};
      ((junctionResults[idx] as any)?.data ?? []).forEach((row: any) => {
        if (!map[row.resource_id]) map[row.resource_id] = [];
        map[row.resource_id].push(row[fk]);
      });
      jd[key] = map;
    });
    setJunctionData(jd);

    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Apply fuzzy search and filters
  const searchResults = useMemo(() => {
    let results = query.trim() ? searchResources(allResources, query) : allResources;

    const activeFilters = Object.entries(selected).filter(([, ids]) => ids.size > 0);
    for (const [filterKey, ids] of activeFilters) {
      if (filterKey === "what_topics") {
        results = results.filter((r) => r.what_topic_id && ids.has(r.what_topic_id));
      } else if (junctionData[filterKey]) {
        results = results.filter((r) => {
          const resourceFilterIds = junctionData[filterKey][r.id] ?? [];
          return resourceFilterIds.some((id) => ids.has(id));
        });
      }
    }

    return results;
  }, [allResources, query, selected, junctionData]);

  if (!loaded) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Search</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {query.trim() ? (
          <>Found <span className="font-medium text-gray-900 dark:text-white">{searchResults.length}</span> resource{searchResults.length !== 1 ? "s" : ""} for &ldquo;<span className="font-medium">{query}</span>&rdquo;</>
        ) : (
          <>Showing all <span className="font-medium text-gray-900 dark:text-white">{searchResults.length}</span> resources</>
        )}
      </p>

      <ResourceFilter selected={selected} onSelectionChange={handleSelectionChange} />
      <div className="mb-4">
        <MapToggleButton showMap={showMap} onToggle={() => setShowMap((v) => !v)} />
      </div>

      {loading ? (
        <p className="text-gray-500">Loading resources...</p>
      ) : searchResults.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-2">Search did not find good matches</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Try different keywords or check spelling</p>
        </div>
      ) : (
        <ViewToggle resources={searchResults} showMap={showMap} />
      )}
    </div>
  );
}
