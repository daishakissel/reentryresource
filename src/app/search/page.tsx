"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { searchResources, getUniqueCities } from "@/lib/searchUtils";
import type { SearchableResource } from "@/lib/searchUtils";
import Link from "next/link";

const PAGE_SIZE = 12;

interface FilterOptions {
  topics: { id: string; name: string }[];
  cities: string[];
  where_types: { id: string; name: string }[];
  who_centerings: { id: string; name: string }[];
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [allResources, setAllResources] = useState<SearchableResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({ topics: [], cities: [], where_types: [], who_centerings: [] });
  const [page, setPage] = useState(1);

  // Filter state
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set());
  const [selectedCities, setSelectedCities] = useState<Set<string>>(new Set());
  const [selectedWhere, setSelectedWhere] = useState<Set<string>>(new Set());
  const [selectedWho, setSelectedWho] = useState<Set<string>>(new Set());
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Junction data for WHERE and WHO filtering
  const [resourceWhereMap, setResourceWhereMap] = useState<Record<string, string[]>>({});
  const [resourceWhoMap, setResourceWhoMap] = useState<Record<string, string[]>>({});

  const fetchData = useCallback(async () => {
    setLoading(true);

    const [resourcesRes, filtersRes, whereRes, whoRes] = await Promise.all([
      supabase.from("resources").select("*, what_topics(name)").order("title"),
      fetch("/api/filters", { cache: "no-store" }),
      supabase.from("resources_where_location_types").select("resource_id, where_location_type_id"),
      supabase.from("resources_who_centerings").select("resource_id, who_centering_id"),
    ]);

    const resources: SearchableResource[] = (resourcesRes.data ?? []).map((r: any) => ({
      ...r,
      topic_name: r.what_topics?.name || "",
      city_display: r.city || "",
    }));
    setAllResources(resources);

    // Build junction maps
    const whereMap: Record<string, string[]> = {};
    (whereRes.data ?? []).forEach((row: any) => {
      if (!whereMap[row.resource_id]) whereMap[row.resource_id] = [];
      whereMap[row.resource_id].push(row.where_location_type_id);
    });
    setResourceWhereMap(whereMap);

    const whoMap: Record<string, string[]> = {};
    (whoRes.data ?? []).forEach((row: any) => {
      if (!whoMap[row.resource_id]) whoMap[row.resource_id] = [];
      whoMap[row.resource_id].push(row.who_centering_id);
    });
    setResourceWhoMap(whoMap);

    if (filtersRes.ok) {
      const f = await filtersRes.json();
      setFilterOptions({
        topics: f.what_topics ?? [],
        cities: getUniqueCities(resources),
        where_types: f.where_location_types ?? [],
        who_centerings: f.who_centerings ?? [],
      });
    }

    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Update URL when query changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      const url = query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : "/search";
      router.replace(url, { scroll: false });
    }, 300);
    return () => clearTimeout(timeout);
  }, [query, router]);

  // Reset page when filters or query change
  useEffect(() => { setPage(1); }, [query, selectedTopics, selectedCities, selectedWhere, selectedWho]);

  // Filter and search
  const filteredResources = useMemo(() => {
    let results = query.trim() ? searchResources(allResources, query) : allResources;

    if (selectedTopics.size > 0) {
      results = results.filter((r) => r.what_topic_id && selectedTopics.has(r.what_topic_id));
    }
    if (selectedCities.size > 0) {
      results = results.filter((r) => r.city && selectedCities.has(r.city));
    }
    if (selectedWhere.size > 0) {
      results = results.filter((r) => {
        const whereIds = resourceWhereMap[r.id] ?? [];
        return whereIds.some((id) => selectedWhere.has(id));
      });
    }
    if (selectedWho.size > 0) {
      results = results.filter((r) => {
        const whoIds = resourceWhoMap[r.id] ?? [];
        return whoIds.some((id) => selectedWho.has(id));
      });
    }

    return results;
  }, [allResources, query, selectedTopics, selectedCities, selectedWhere, selectedWho, resourceWhereMap, resourceWhoMap]);

  const totalPages = Math.ceil(filteredResources.length / PAGE_SIZE);
  const paginatedResources = filteredResources.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const activeFilterCount = selectedTopics.size + selectedCities.size + selectedWhere.size + selectedWho.size;

  function toggleSet(set: Set<string>, value: string, setter: (s: Set<string>) => void) {
    const next = new Set(set);
    if (next.has(value)) next.delete(value); else next.add(value);
    setter(next);
  }

  function clearAllFilters() {
    setSelectedTopics(new Set());
    setSelectedCities(new Set());
    setSelectedWhere(new Set());
    setSelectedWho(new Set());
  }

  if (loading) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      {/* Search input */}
      <div className="mb-6">
        <div className="relative max-w-2xl">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, description, topic, location..."
            className="w-full pl-12 pr-10 py-3 text-base rounded-lg border border-gray-300 dark:border-ocean-light bg-white dark:bg-ocean-light text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters */}
        <div className="md:w-64 flex-shrink-0">
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className="md:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-ocean-light text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 w-full"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>

          <div className={`space-y-5 ${filtersOpen ? "block" : "hidden md:block"}`}>
            {activeFilterCount > 0 && (
              <button onClick={clearAllFilters} className="text-sm text-red-600 hover:underline">Clear all filters</button>
            )}

            {/* Topics */}
            <FilterSection title="Topics" options={filterOptions.topics} selected={selectedTopics} onToggle={(id) => toggleSet(selectedTopics, id, setSelectedTopics)} />

            {/* Cities */}
            <div>
              <h3 className="text-xs font-semibold text-brand-gray dark:text-gray-400 uppercase tracking-wider mb-2">Location</h3>
              <div className="max-h-40 overflow-y-auto space-y-1">
                {filterOptions.cities.map((city) => (
                  <label key={city} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <input
                      type="checkbox"
                      checked={selectedCities.has(city)}
                      onChange={() => toggleSet(selectedCities, city, setSelectedCities)}
                      className="h-3.5 w-3.5 rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
                    />
                    {city}
                  </label>
                ))}
              </div>
            </div>

            {/* Where */}
            <FilterSection title="Where" options={filterOptions.where_types} selected={selectedWhere} onToggle={(id) => toggleSet(selectedWhere, id, setSelectedWhere)} />

            {/* Who */}
            <FilterSection title="Who" options={filterOptions.who_centerings} selected={selectedWho} onToggle={(id) => toggleSet(selectedWho, id, setSelectedWho)} />
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Found <span className="font-medium text-gray-900 dark:text-white">{filteredResources.length}</span> resource{filteredResources.length !== 1 ? "s" : ""}
            {query.trim() && <> for &ldquo;<span className="font-medium">{query}</span>&rdquo;</>}
          </p>

          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 mb-2">Search did not find good matches</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">Try different keywords, check spelling, or broaden your filters</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedResources.map((r) => (
                  <Link key={r.id} href={`/resource/${r.slug || r.id}`}>
                    <div className="bg-white dark:bg-ocean-light rounded-lg border border-gray-200 dark:border-ocean-light overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
                      {r.featured_image ? (
                        <div className="h-32 bg-gray-100 flex-shrink-0">
                          <img src={r.featured_image} alt={r.title} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="h-32 bg-gray-100 dark:bg-ocean flex items-center justify-center flex-shrink-0">
                          <span className="text-gray-400 text-xs">No image</span>
                        </div>
                      )}
                      <div className="p-3 flex-1 flex flex-col">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">{r.title}</h3>
                        {r.description && (
                          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">{r.description.slice(0, 150)}</p>
                        )}
                        <div className="mt-auto flex items-center justify-between">
                          {r.city && (
                            <span className="text-xs text-gray-400">{r.city}{r.state ? `, ${r.state}` : ""}</span>
                          )}
                          {r.topic_name && (
                            <span className="text-xs px-1.5 py-0.5 rounded bg-brand-gold-light text-brand-gold">{r.topic_name}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1.5 rounded text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-ocean-light hover:bg-gray-200 dark:hover:bg-ocean disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-1.5 rounded text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-ocean-light hover:bg-gray-200 dark:hover:bg-ocean disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterSection({ title, options, selected, onToggle }: {
  title: string;
  options: { id: string; name: string }[];
  selected: Set<string>;
  onToggle: (id: string) => void;
}) {
  if (options.length === 0) return null;
  return (
    <div>
      <h3 className="text-xs font-semibold text-brand-gray dark:text-gray-400 uppercase tracking-wider mb-2">{title}</h3>
      <div className="max-h-40 overflow-y-auto space-y-1">
        {options.map((opt) => (
          <label key={opt.id} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={selected.has(opt.id)}
              onChange={() => onToggle(opt.id)}
              className="h-3.5 w-3.5 rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
            />
            {opt.name}
          </label>
        ))}
      </div>
    </div>
  );
}
