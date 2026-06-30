"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import InfoTooltip from "./InfoTooltip";

interface FilterOption {
  id: string;
  name: string;
}

interface Filters {
  categories: (FilterOption & { slug: string })[];
  modes: FilterOption[];
  formats: FilterOption[];
  centerings: FilterOption[];
  categories_elements: { category_id: string; element_id: string }[];
}

const FILTER_SECTIONS = [
  { label: "Categories", filterKey: "categories", table: "resources_categories", fk: "category_id" },
  { label: "Formats", filterKey: "formats", table: "resources_formats", fk: "format_id" },
  { label: "Centerings", filterKey: "centerings", table: "resources_centerings", fk: "centering_id" },
];

const RESOURCE_FILTER_INFO = (
  <div className="space-y-3">
    <div>
      <p className="font-semibold text-gray-900 dark:text-white mb-1">Resource Filter:</p>
      <p>Select the Categories, Formats, and Centerings to find the resources you are looking for.</p>
      <p className="mt-1">Leaving a classification unmarked will show all.</p>
    </div>
    <div>
      <p className="font-semibold text-gray-900 dark:text-white mb-1">Categories:</p>
      <p>What kind of resource you're looking for, like Food, Housing, or Medical care.</p>
    </div>
    <div>
      <p className="font-semibold text-gray-900 dark:text-white mb-1">Formats:</p>
      <p>How the resource can be accessed: an offered Service, a Class, Workshop or Meeting, an Online Guidebook to read, or a Volunteering opportunity.</p>
    </div>
    <div>
      <p className="font-semibold text-gray-900 dark:text-white mb-1">Centerings:</p>
      <p>Who the resource centers around or is specifically designed for like Veterans, Women, or Youth & Children.</p>
    </div>
  </div>
);

interface ResourceFilterProps {
  selected: Record<string, Set<string>>;
  onSelectionChange: (selected: Record<string, Set<string>>) => void;
  elementId?: string;
  resourceIds?: string[];
}

export default function ResourceFilter({ selected, onSelectionChange, elementId, resourceIds }: ResourceFilterProps) {
  const [open, setOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<Filters | null>(null);
  const [loaded, setLoaded] = useState(false);
  // Junction data: { filterKey: { resourceId: Set<filterId> } }
  const [junctionData, setJunctionData] = useState<Record<string, Record<string, Set<string>>>>({});
  // All valid resource IDs (non-expired, optionally scoped to element)
  const [allResourceIds, setAllResourceIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function loadData() {
      const [filtersRes, ...junctionResults] = await Promise.all([
        fetch("/api/filters", { cache: "no-store" }),
        ...FILTER_SECTIONS.map((s) =>
          supabase.from(s.table).select(`resource_id, ${s.fk}`)
        ),
      ]);

      if (filtersRes.ok) setFilters(await filtersRes.json());

      const jd: Record<string, Record<string, Set<string>>> = {};
      FILTER_SECTIONS.forEach((section, idx) => {
        const map: Record<string, Set<string>> = {};
        ((junctionResults[idx] as any)?.data ?? []).forEach((row: any) => {
          if (!map[row.resource_id]) map[row.resource_id] = new Set();
          map[row.resource_id].add(row[section.fk]);
        });
        jd[section.filterKey] = map;
      });
      setJunctionData(jd);

      // Only fetch baseline resource IDs if not externally scoped
      if (!resourceIds) {
        const today = new Date().toISOString().split("T")[0];
        const { data: resources } = await supabase
          .from("resources")
          .select("id")
          .or(`expiration_date.is.null,expiration_date.gte.${today}`);
        let ids = new Set((resources ?? []).map((r: any) => r.id));

        if (elementId) {
          const { data: whyLinks } = await supabase
            .from("resources_elements")
            .select("resource_id")
            .eq("element_id", elementId);
          const whyIds = new Set((whyLinks ?? []).map((l: any) => l.resource_id));
          ids = new Set([...ids].filter((id) => whyIds.has(id)));
        }

        setAllResourceIds(ids);
      }

      setLoaded(true);
    }
    loadData();
  }, [elementId, resourceIds]);

  // Keep allResourceIds in sync with resourceIds prop
  useEffect(() => {
    if (resourceIds) {
      setAllResourceIds(new Set(resourceIds));
    }
  }, [resourceIds]);

  // Compute faceted counts: for each dimension, apply all OTHER filters, then count
  const counts = useMemo(() => {
    const result: Record<string, Record<string, number>> = {};

    for (const section of FILTER_SECTIONS) {
      // Get resources that pass ALL other dimension filters
      let pool = allResourceIds;

      for (const otherSection of FILTER_SECTIONS) {
        if (otherSection.filterKey === section.filterKey) continue;
        const selectedIds = selected[otherSection.filterKey];
        if (!selectedIds || selectedIds.size === 0) continue;

        // Only keep resources that have at least one of the selected values in this other dimension
        const otherJunction = junctionData[otherSection.filterKey] ?? {};
        pool = new Set(
          [...pool].filter((rid) => {
            const resourceValues = otherJunction[rid];
            if (!resourceValues) return false;
            return [...selectedIds].some((sid) => resourceValues.has(sid));
          })
        );
      }

      // Now count how many resources in the pool have each option in this dimension
      const sectionJunction = junctionData[section.filterKey] ?? {};
      const sectionCounts: Record<string, number> = {};

      for (const rid of pool) {
        const values = sectionJunction[rid];
        if (values) {
          for (const v of values) {
            sectionCounts[v] = (sectionCounts[v] || 0) + 1;
          }
        }
      }

      result[section.filterKey] = sectionCounts;
    }

    return result;
  }, [selected, junctionData, allResourceIds]);

  function toggleSection(key: string) {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }

  function toggleOption(filterKey: string, id: string) {
    const next = { ...selected };
    const set = new Set(next[filterKey] ?? []);
    if (set.has(id)) set.delete(id); else set.add(id);
    next[filterKey] = set;
    onSelectionChange(next);
  }

  const totalSelected = Object.values(selected).reduce((sum, set) => sum + set.size, 0);

  return (
    <div className="mb-2">
      <div className="flex items-center gap-1.5">
        <InfoTooltip text={RESOURCE_FILTER_INFO} />
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-ocean-light hover:bg-gray-200 dark:hover:bg-ocean-dark text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span>Resource Filter</span>
          {totalSelected > 0 && (
            <span className="px-1.5 py-0.5 text-xs rounded-full bg-brand-gold text-white">{totalSelected}</span>
          )}
          <svg className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="mt-2 rounded-lg border border-gray-200 dark:border-ocean-light bg-white dark:bg-ocean-dark overflow-hidden">
          {!loaded || !filters ? (
            <p className="p-4 text-sm text-gray-500">Loading filters...</p>
          ) : (
            FILTER_SECTIONS.map((section) => {
              let options: FilterOption[] = (filters as any)[section.filterKey] ?? [];

              // Filter categories by element when on a specific WHY page
              if (section.filterKey === "categories" && elementId && filters.categories_elements) {
                const validTopicIds = new Set(
                  filters.categories_elements
                    .filter((link) => link.element_id === elementId)
                    .map((link) => link.category_id)
                );
                options = options.filter((o) => validTopicIds.has(o.id));
              }

              if (options.length === 0) return null;
              const isExpanded = expandedSections.has(section.filterKey);
              const sectionSelected = selected[section.filterKey]?.size ?? 0;

              return (
                <div key={section.filterKey} className="border-b border-gray-100 dark:border-ocean-light last:border-b-0">
                  <button
                    onClick={() => toggleSection(section.filterKey)}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-ocean-light transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span>{section.label}</span>
                      {sectionSelected > 0 && (
                        <span className="px-1.5 py-0.5 text-xs rounded-full bg-brand-gold-light text-brand-brown">
                          {sectionSelected}
                        </span>
                      )}
                    </div>
                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-3 flex flex-wrap gap-x-6 gap-y-2">
                      {options.map((opt) => {
                        const count = counts[section.filterKey]?.[opt.id] ?? 0;
                        return (
                          <label key={opt.id} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <input
                              type="checkbox"
                              checked={selected[section.filterKey]?.has(opt.id) ?? false}
                              onChange={() => toggleOption(section.filterKey, opt.id)}
                              className="h-4 w-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
                            />
                            {opt.name}
                            <span className="text-xs text-gray-400">({count})</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}

          {totalSelected > 0 && (
            <div className="px-4 py-2 border-t border-gray-200 dark:border-ocean-light bg-gray-50 dark:bg-ocean-deeper">
              <button
                onClick={() => {
                  const cleared: Record<string, Set<string>> = {};
                  FILTER_SECTIONS.forEach((s) => { cleared[s.filterKey] = new Set(); });
                  onSelectionChange(cleared);
                }}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
