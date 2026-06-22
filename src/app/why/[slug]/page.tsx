"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import ViewToggle from "@/components/ViewToggle";
import ResourceFilter from "@/components/ResourceFilter";
import { supabase } from "@/lib/supabase";
import { WHY_CATEGORIES } from "@/lib/constants";
import { serializeFilters } from "@/lib/filterUtils";
import type { Resource } from "@/types/database";

const JUNCTION_MAP: Record<string, { table: string; fk: string }> = {
  where_location_types: { table: "resources_where_location_types", fk: "where_location_type_id" },
  when_times: { table: "resources_when_times", fk: "when_time_id" },
  how_formats: { table: "resources_how_formats", fk: "how_format_id" },
  who_centerings: { table: "resources_who_centerings", fk: "who_centering_id" },
};

interface WhyPageProps {
  params: { slug: string };
}

export default function WhyPage({ params }: WhyPageProps) {
  return (
    <Suspense fallback={<p className="text-gray-500">Loading...</p>}>
      <WhyPageInner params={params} />
    </Suspense>
  );
}

function WhyPageInner({ params }: WhyPageProps) {
  const category = WHY_CATEGORIES.find((c) => c.slug === params.slug);
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
  const [whyCategoryId, setWhyCategoryId] = useState<string | undefined>(undefined);

  const fetchResources = useCallback(async () => {
    if (!category || category.slug === "all") return;
    setLoading(true);

    // Get the WHY category ID
    const { data: whyCat } = await supabase
      .from("why_categories")
      .select("id")
      .eq("slug", params.slug)
      .single();

    if (!whyCat) { setLoading(false); return; }
    setWhyCategoryId(whyCat.id);

    // Get WHAT topic IDs that belong to this WHY category
    const { data: topicLinks } = await supabase
      .from("what_topics_why_categories")
      .select("what_topic_id")
      .eq("why_category_id", whyCat.id);

    const topicIds = (topicLinks ?? []).map((l: any) => l.what_topic_id);
    if (topicIds.length === 0) { setResources([]); setLoading(false); return; }

    const activeFilters = Object.entries(selected).filter(([, ids]) => ids.size > 0);

    if (activeFilters.length === 0) {
      const { data } = await supabase
        .from("resources")
        .select("*")
        .in("what_topic_id", topicIds)
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
          .in("what_topic_id", topicIds)
          .in("id", Array.from(matchingIds))
          .order("created_at", { ascending: false });
        setResources(data ?? []);
      }
    }

    setLoading(false);
  }, [params.slug, category, selected]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  if (!category || category.slug === "all") notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{category.label}</h1>
      <ResourceFilter selected={selected} onSelectionChange={setSelected} whyCategoryId={whyCategoryId} />
      {loading ? (
        <p className="text-gray-500">Loading resources...</p>
      ) : (
        <ViewToggle resources={resources} backPath={`/why/${params.slug}?${serializeFilters(selected)}`} />
      )}
    </div>
  );
}
