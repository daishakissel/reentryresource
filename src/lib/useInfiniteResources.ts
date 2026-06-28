import { useState, useCallback, useRef } from "react";
import { supabase } from "./supabase";
import type { Resource } from "@/types/database";

const PAGE_SIZE = 10;

const JUNCTION_MAP: Record<string, { table: string; fk: string }> = {
  modes: { table: "resources_modes", fk: "mode_id" },
  formats: { table: "resources_formats", fk: "format_id" },
  centerings: { table: "resources_centerings", fk: "centering_id" },
};

interface UseInfiniteResourcesOptions {
  topicIds?: string[];
  elementId?: string;
  filters: Record<string, Set<string>>;
}

export function useInfiniteResources({ topicIds, elementId, filters }: UseInfiniteResourcesOptions) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const matchedIdsRef = useRef<string[] | null>(null);

  const fetchPage = useCallback(async (offset: number, reset: boolean) => {
    if (reset) {
      setLoading(true);
      setHasMore(true);
    } else {
      setLoadingMore(true);
    }

    const activeFilters = Object.entries(filters).filter(([, ids]) => ids.size > 0);

    // If filters active, resolve matching resource IDs first (only on reset)
    if (reset && activeFilters.length > 0) {
      let matchingIds: Set<string> | null = null;

      // WHAT topic filter: strict match on category_id
      const whatFilter = activeFilters.find(([key]) => key === "categories");
      if (whatFilter) {
        const { data: resources } = await supabase
          .from("resources")
          .select("id")
          .in("category_id", Array.from(whatFilter[1]));
        matchingIds = new Set((resources ?? []).map((r: any) => r.id));
      }

      // Junction filters: only narrow results for resources that HAVE entries
      for (const [filterKey, ids] of activeFilters) {
        if (filterKey === "categories") continue;
        const junction = JUNCTION_MAP[filterKey];
        if (!junction) continue;
        const { data: links } = await supabase
          .from(junction.table)
          .select("resource_id")
          .in(junction.fk, Array.from(ids));
        const resourceIds = new Set((links ?? []).map((l: any) => l.resource_id));
        if (matchingIds === null) {
          matchingIds = resourceIds;
        } else {
          matchingIds = new Set([...matchingIds].filter((id) => resourceIds.has(id)));
        }
      }

      matchedIdsRef.current = matchingIds ? Array.from(matchingIds) : [];
    } else if (reset) {
      matchedIdsRef.current = null;
    }

    // If scoped to a element, intersect with resources in that category
    if (reset && elementId) {
      const { data: whyLinks } = await supabase
        .from("resources_elements")
        .select("resource_id")
        .eq("element_id", elementId);
      const whyResourceIds = new Set((whyLinks ?? []).map((l: any) => l.resource_id));
      if (matchedIdsRef.current === null) {
        matchedIdsRef.current = Array.from(whyResourceIds);
      } else {
        matchedIdsRef.current = matchedIdsRef.current.filter((id) => whyResourceIds.has(id));
      }
    }

    // If filters resulted in no matches
    if (matchedIdsRef.current !== null && matchedIdsRef.current.length === 0) {
      if (reset) setResources([]);
      setHasMore(false);
      setLoading(false);
      setLoadingMore(false);
      return;
    }

    // Build query — exclude expired resources
    const today = new Date().toISOString().split("T")[0];
    let query = supabase
      .from("resources")
      .select("*, categories(name)")
      .or(`expiration_date.is.null,expiration_date.gte.${today}`)
      .order("created_at", { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1);

    if (topicIds && topicIds.length > 0) {
      query = query.in("category_id", topicIds);
    }

    if (matchedIdsRef.current !== null) {
      query = query.in("id", matchedIdsRef.current);
    }

    const { data } = await query;
    const newResources = data ?? [];

    if (reset) {
      setResources(newResources);
    } else {
      setResources((prev) => [...prev, ...newResources]);
    }

    setHasMore(newResources.length === PAGE_SIZE);
    setLoading(false);
    setLoadingMore(false);
  }, [filters, topicIds, elementId]);

  const loadInitial = useCallback(() => {
    fetchPage(0, true);
  }, [fetchPage]);

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      fetchPage(resources.length, false);
    }
  }, [fetchPage, loadingMore, hasMore, resources.length]);

  return { resources, loading, loadingMore, hasMore, loadInitial, loadMore };
}
