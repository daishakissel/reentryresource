"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import ViewToggle from "@/components/ViewToggle";
import ResourceFilter from "@/components/ResourceFilter";
import { supabase } from "@/lib/supabase";
import { serializeFilters } from "@/lib/filterUtils";
import type { Resource } from "@/types/database";

const JUNCTION_MAP: Record<string, { table: string; fk: string }> = {
  where_location_types: { table: "resources_where_location_types", fk: "where_location_type_id" },
  when_times: { table: "resources_when_times", fk: "when_time_id" },
  how_formats: { table: "resources_how_formats", fk: "how_format_id" },
  who_centerings: { table: "resources_who_centerings", fk: "who_centering_id" },
};

export default function HomePage() {
  return (
    <Suspense fallback={<p className="text-gray-500">Loading...</p>}>
      <HomePageInner />
    </Suspense>
  );
}

function HomePageInner() {
  const searchParams = useSearchParams();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Record<string, Set<string>>>(() => {
    const result: Record<string, Set<string>> = {};
    searchParams.forEach((value, key) => {
      result[key] = new Set(value.split(",").filter(Boolean));
    });
    return result;
  });

  const fetchResources = useCallback(async () => {
    setLoading(true);

    const activeFilters = Object.entries(selected).filter(([, ids]) => ids.size > 0);

    if (activeFilters.length === 0) {
      const { data } = await supabase
        .from("resources")
        .select("*")
        .order("created_at", { ascending: false });
      setResources(data ?? []);
    } else {
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

      if (!matchingIds || matchingIds.size === 0) {
        setResources([]);
      } else {
        const { data } = await supabase
          .from("resources")
          .select("*")
          .in("id", Array.from(matchingIds))
          .order("created_at", { ascending: false });
        setResources(data ?? []);
      }
    }

    setLoading(false);
  }, [selected]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">All Resources</h1>
      <ResourceFilter selected={selected} onSelectionChange={setSelected} />
      {loading ? (
        <p className="text-gray-500">Loading resources...</p>
      ) : (
        <ViewToggle resources={resources} backPath={`/?${serializeFilters(selected)}`} />
      )}
    </div>
  );
}
