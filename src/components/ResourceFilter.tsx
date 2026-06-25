"use client";

import { useEffect, useState, useCallback } from "react";

interface FilterOption {
  id: string;
  name: string;
}

interface Filters {
  what_topics: (FilterOption & { slug: string })[];
  where_location_types: FilterOption[];
  when_times: FilterOption[];
  how_formats: FilterOption[];
  who_centerings: FilterOption[];
  what_topics_why_categories: { what_topic_id: string; why_category_id: string }[];
}

const FILTER_SECTIONS = [
  { label: "What", filterKey: "what_topics" },
  { label: "Where", filterKey: "where_location_types" },
  { label: "When", filterKey: "when_times" },
  { label: "How", filterKey: "how_formats" },
  { label: "Who", filterKey: "who_centerings" },
];

interface ResourceFilterProps {
  selected: Record<string, Set<string>>;
  onSelectionChange: (selected: Record<string, Set<string>>) => void;
  whyCategoryId?: string;
}

export default function ResourceFilter({ selected, onSelectionChange, whyCategoryId }: ResourceFilterProps) {
  const [open, setOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<Filters | null>(null);
  const [counts, setCounts] = useState<Record<string, Record<string, number>>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/filters", { cache: "no-store" }).then(async (res) => {
      if (res.ok) setFilters(await res.json());
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    const countsUrl = whyCategoryId
      ? `/api/filters/counts?whyCategoryId=${whyCategoryId}`
      : "/api/filters/counts";
    fetch(countsUrl, { cache: "no-store" }).then(async (res) => {
      if (res.ok) setCounts(await res.json());
    });
  }, [whyCategoryId]);

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
    <div className="mb-6">
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

      {open && (
        <div className="mt-2 rounded-lg border border-gray-200 dark:border-ocean-light bg-white dark:bg-ocean-dark overflow-hidden">
          {!loaded || !filters ? (
            <p className="p-4 text-sm text-gray-500">Loading filters...</p>
          ) : (
            FILTER_SECTIONS.map((section) => {
              let options: FilterOption[] = (filters as any)[section.filterKey] ?? [];

              // Filter WHAT topics by WHY category when on a specific WHY page
              if (section.filterKey === "what_topics" && whyCategoryId && filters.what_topics_why_categories) {
                const validTopicIds = new Set(
                  filters.what_topics_why_categories
                    .filter((link) => link.why_category_id === whyCategoryId)
                    .map((link) => link.what_topic_id)
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
                        <span className="px-1.5 py-0.5 text-xs rounded-full bg-brand-gold-light text-brand-gold">
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
                        const count = section.filterKey === "what_topics" ? (counts[section.filterKey]?.[opt.id] ?? 0) : null;
                        return (
                          <label key={opt.id} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <input
                              type="checkbox"
                              checked={selected[section.filterKey]?.has(opt.id) ?? false}
                              onChange={() => toggleOption(section.filterKey, opt.id)}
                              className="h-4 w-4 rounded border-gray-300 text-brand-gold focus:ring-brand-gold"
                            />
                            {opt.name}
                            {count !== null && <span className="text-xs text-gray-400">({count})</span>}
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
