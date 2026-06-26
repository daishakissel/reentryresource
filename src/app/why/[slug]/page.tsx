"use client";

import { useEffect, useState, useCallback } from "react";
import { notFound } from "next/navigation";
import ViewToggle from "@/components/ViewToggle";
import ResourceFilter from "@/components/ResourceFilter";
import { supabase } from "@/lib/supabase";
import { WHY_CATEGORIES } from "@/lib/constants";
import { useInfiniteResources } from "@/lib/useInfiniteResources";
import { loadFilters, saveFilters, saveLastWhy } from "@/lib/filterStorage";

interface WhyPageProps {
  params: { slug: string };
}

export default function WhyPage({ params }: WhyPageProps) {
  const category = WHY_CATEGORIES.find((c) => c.slug === params.slug);
  const [selected, setSelected] = useState<Record<string, Set<string>>>({});
  const [loaded, setLoaded] = useState(false);
  const [whyCategoryId, setWhyCategoryId] = useState<string | undefined>(undefined);
  const [topicIds, setTopicIds] = useState<string[] | undefined>(undefined);
  const [resolving, setResolving] = useState(true);

  useEffect(() => {
    const stored = loadFilters();
    // Clear WHAT topics when switching WHY categories since they don't carry over
    if (stored.what_topics) {
      delete stored.what_topics;
      saveFilters(stored);
    }
    setSelected(stored);
    if (category) saveLastWhy(category.label, category.href);
    setLoaded(true);
  }, [params.slug, category]);

  function handleSelectionChange(newSelected: Record<string, Set<string>>) {
    setSelected(newSelected);
    saveFilters(newSelected);
  }

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
    if (loaded && !resolving && topicIds !== undefined) {
      loadInitial();
    }
  }, [loaded, resolving, topicIds, loadInitial]);

  if (!category || category.slug === "all") notFound();

  if (!loaded) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{category.label}</h1>
      <ResourceFilter selected={selected} onSelectionChange={handleSelectionChange} whyCategoryId={whyCategoryId} />
      {loading || resolving ? (
        <p className="text-gray-500">Loading resources...</p>
      ) : (
        <ViewToggle
          resources={resources}
          hasMore={hasMore}
          loadingMore={loadingMore}
          onLoadMore={loadMore}
        />
      )}
    </div>
  );
}
