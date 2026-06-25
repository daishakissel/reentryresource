import { useState, useCallback, useRef } from "react";
import { supabase } from "./supabase";
import type { Resource } from "@/types/database";

const PAGE_SIZE = 10;

const JUNCTION_MAP: Record<string, { table: string; fk: string }> = {
  where_location_types: { table: "resources_where_location_types", fk: "where_location_type_id" },
  when_times: { table: "resources_when_times", fk: "when_time_id" },
  how_formats: { table: "resources_how_formats", fk: "how_format_id" },
  who_centerings: { table: "resources_who_centerings", fk: "who_centering_id" },
};

interface UseInfiniteResourcesOptions {
  topicIds?: string[];
  filters: Record<string, Set<string>>;
}

export function useInfiniteResources({ topicIds, filters }: UseInfiniteResourcesOptions) {
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

      for (const [filterKey, ids] of activeFilters) {
        const junction = JUNCTION_MAP[filterKey];
        if (!junction) continue;
        const { data: links } = await supabase
          .from(junction.table)
          .select("resource_id")
          .in(junction.fk, Array.from(ids));
        const resourceIds = new Set((links ?? []).map((l: any) => l.resource_id));
        if (matchingIds === null) matchingIds = resourceIds;
        else matchingIds = new Set([...matchingIds].filter((id) => resourceIds.has(id)));
      }

      matchedIdsRef.current = matchingIds ? Array.from(matchingIds) : [];
    } else if (reset) {
      matchedIdsRef.current = null;
    }

    // If filters resulted in no matches
    if (matchedIdsRef.current !== null && matchedIdsRef.current.length === 0) {
      if (reset) setResources([]);
      setHasMore(false);
      setLoading(false);
      setLoadingMore(false);
      return;
    }

    // Build query
    let query = supabase
      .from("resources")
      .select("*")
      .order("created_at", { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1);

    if (topicIds && topicIds.length > 0) {
      query = query.in("what_topic_id", topicIds);
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
  }, [filters, topicIds]);

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
