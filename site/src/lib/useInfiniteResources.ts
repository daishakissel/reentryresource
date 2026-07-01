import { useState, useCallback, useRef } from "react";
import { supabase } from "./supabase";
import type { Resource } from "@/types/database";

const PAGE_SIZE = 10;

const JUNCTION_MAP: Record<string, { table: string; fk: string }> = {
  categories: { table: "resources_categories", fk: "category_id" },
  modes: { table: "resources_modes", fk: "mode_id" },
  formats: { table: "resources_formats", fk: "format_id" },
  centerings: { table: "resources_centerings", fk: "centering_id" },
};

interface UseInfiniteResourcesOptions {
  topicIds?: string[];
  elementId?: string;
  filters: Record<string, Set<string>>;
  formatId?: string;
}

export function useInfiniteResources({ topicIds, elementId, filters, formatId }: UseInfiniteResourcesOptions) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  // Saved matched IDs from last reset — used by loadMore to avoid re-fetching filters
  const matchedIdsRef = useRef<string[] | null>(null);

  const fetchPage = useCallback(async (offset: number, reset: boolean) => {
    if (reset) {
      setLoading(true);
      setHasMore(true);
    } else {
      setLoadingMore(true);
    }

    // On reset, compute matched IDs fresh using LOCAL variables (not the shared ref)
    // so concurrent calls don't corrupt each other's results.
    let localMatchedIds: string[] | null = null;

    if (reset) {
      const activeFilters = Object.entries(filters).filter(([, ids]) => ids.size > 0);

      if (activeFilters.length > 0) {
        let matchingIds: Set<string> | null = null;
        for (const [filterKey, ids] of activeFilters) {
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
        localMatchedIds = matchingIds ? Array.from(matchingIds) : [];
      }

      if (elementId) {
        const { data: whyLinks } = await supabase
          .from("resources_elements")
          .select("resource_id")
          .eq("element_id", elementId);
        const whyIds = new Set((whyLinks ?? []).map((l: any) => l.resource_id));
        if (localMatchedIds === null) {
          localMatchedIds = Array.from(whyIds);
        } else {
          localMatchedIds = localMatchedIds.filter((id) => whyIds.has(id));
        }
      }

      if (formatId) {
        const { data: formatLinks } = await supabase
          .from("resources_formats")
          .select("resource_id")
          .eq("format_id", formatId);
        const formatIds = new Set((formatLinks ?? []).map((l: any) => l.resource_id));
        if (localMatchedIds === null) {
          localMatchedIds = Array.from(formatIds);
        } else {
          localMatchedIds = localMatchedIds.filter((id) => formatIds.has(id));
        }
      }

      if (topicIds && topicIds.length > 0) {
        const { data: catLinks } = await supabase
          .from("resources_categories")
          .select("resource_id")
          .in("category_id", topicIds);
        const catIds = new Set((catLinks ?? []).map((l: any) => l.resource_id));
        if (localMatchedIds === null) {
          localMatchedIds = Array.from(catIds);
        } else {
          localMatchedIds = localMatchedIds.filter((id) => catIds.has(id));
        }
      }

      // Save for subsequent loadMore calls
      matchedIdsRef.current = localMatchedIds;
    } else {
      // loadMore: reuse IDs from the last reset
      localMatchedIds = matchedIdsRef.current;
    }

    if (localMatchedIds !== null && localMatchedIds.length === 0) {
      if (reset) setResources([]);
      setHasMore(false);
      setLoading(false);
      setLoadingMore(false);
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    let query = supabase
      .from("resources")
      .select("*")
      .or(`expiration_date.is.null,expiration_date.gte.${today}`)
      .order("created_at", { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1);

    if (localMatchedIds !== null) {
      query = query.in("id", localMatchedIds);
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
  }, [filters, topicIds, elementId, formatId]);

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
