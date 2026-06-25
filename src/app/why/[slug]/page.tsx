"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import ViewToggle from "@/components/ViewToggle";
import ResourceFilter from "@/components/ResourceFilter";
import { supabase } from "@/lib/supabase";
import { WHY_CATEGORIES } from "@/lib/constants";
import { serializeFilters, deserializeFilters } from "@/lib/filterUtils";
import { useInfiniteResources } from "@/lib/useInfiniteResources";

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
  const [selected, setSelected] = useState<Record<string, Set<string>>>(() =>
    deserializeFilters(searchParams.toString())
  );
  const [whyCategoryId, setWhyCategoryId] = useState<string | undefined>(undefined);
  const [topicIds, setTopicIds] = useState<string[] | undefined>(undefined);
  const [resolving, setResolving] = useState(true);

  // Resolve WHY category → topic IDs
  const resolveTopics = useCallback(async () => {
    if (!category || category.slug === "all") return;
    setResolving(true);

    const { data: whyCat } = await supabase
      .from("why_categories")
      .select("id")
      .eq("slug", params.slug)
      .single();

    if (!whyCat) { setResolving(false); return; }
    setWhyCategoryId(whyCat.id);

    const { data: topicLinks } = await supabase
      .from("what_topics_why_categories")
      .select("what_topic_id")
      .eq("why_category_id", whyCat.id);

    setTopicIds((topicLinks ?? []).map((l: any) => l.what_topic_id));
    setResolving(false);
  }, [params.slug, category]);

  useEffect(() => {
    resolveTopics();
  }, [resolveTopics]);

  const { resources, loading, loadingMore, hasMore, loadInitial, loadMore } =
    useInfiniteResources({ topicIds, whyCategoryId, filters: selected });

  useEffect(() => {
    if (!resolving && topicIds !== undefined) {
      loadInitial();
    }
  }, [resolving, topicIds, loadInitial]);

  if (!category || category.slug === "all") notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{category.label}</h1>
      <ResourceFilter selected={selected} onSelectionChange={setSelected} whyCategoryId={whyCategoryId} />
      {loading || resolving ? (
        <p className="text-gray-500">Loading resources...</p>
      ) : (
        <ViewToggle
          resources={resources}
          backPath={`/why/${params.slug}?${serializeFilters(selected)}`}
          hasMore={hasMore}
          loadingMore={loadingMore}
          onLoadMore={loadMore}
        />
      )}
    </div>
  );
}
