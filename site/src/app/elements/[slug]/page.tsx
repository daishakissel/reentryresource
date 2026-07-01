"use client";

import { useEffect, useState, useCallback } from "react";
import { notFound } from "next/navigation";
import ViewToggle, { MapToggleButton, ModeToggleButtons, ViewControlsInfo } from "@/components/ViewToggle";
import ResourceFilter from "@/components/ResourceFilter";
import { supabase } from "@/lib/supabase";
import { ELEMENTS } from "@/lib/constants";
import { useInfiniteResources } from "@/lib/useInfiniteResources";
import { loadFilters, saveFilters, saveLastWhy } from "@/lib/filterStorage";

interface WhyPageProps {
  params: { slug: string };
}

export default function WhyPage({ params }: WhyPageProps) {
  const category = ELEMENTS.find((c) => c.slug === params.slug);
  const [selected, setSelected] = useState<Record<string, Set<string>>>({});
  const [loaded, setLoaded] = useState(false);
  const [elementId, setWhyCategoryId] = useState<string | undefined>(undefined);
  const [topicIds, setTopicIds] = useState<string[] | undefined>(undefined);
  const [resolving, setResolving] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [showInPerson, setShowInPerson] = useState(true);
  const [showOnline, setShowOnline] = useState(true);
  const [activeFormatId, setActiveFormatId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const stored = loadFilters();
    // Clear WHAT topics when switching elementies since they don't carry over
    if (stored.categories) {
      delete stored.categories;
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

    const { data: elementCat } = await supabase
      .from("elements")
      .select("id")
      .eq("slug", params.slug)
      .single();

    if (!elementCat) { setResolving(false); return; }
    setWhyCategoryId(elementCat.id);

    const { data: topicLinks } = await supabase
      .from("categories_elements")
      .select("category_id")
      .eq("element_id", elementCat.id);

    setTopicIds((topicLinks ?? []).map((l: any) => l.category_id));
    setResolving(false);
  }, [params.slug, category]);

  useEffect(() => {
    resolveTopics();
  }, [resolveTopics]);

  const { resources, loading, loadingMore, hasMore, loadInitial, loadMore } =
    useInfiniteResources({ topicIds, elementId, filters: selected, formatId: activeFormatId });

  useEffect(() => {
    if (loaded && !resolving && topicIds !== undefined) {
      loadInitial();
    }
  }, [loaded, resolving, topicIds, loadInitial, activeFormatId]);

  if (!category || category.slug === "all") notFound();

  if (!loaded) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{category.label} Resources</h1>
      <ResourceFilter selected={selected} onSelectionChange={handleSelectionChange} elementId={elementId} />
      <div className="flex flex-wrap gap-2 mb-4">
        <ViewControlsInfo />
        <MapToggleButton showMap={showMap} onToggle={() => setShowMap((v) => !v)} />
        <ModeToggleButtons showInPerson={showInPerson} showOnline={showOnline} onToggleInPerson={() => setShowInPerson((v) => !v)} onToggleOnline={() => setShowOnline((v) => !v)} />
      </div>
      {resolving || (loading && resources.length === 0) ? (
        <p className="text-gray-500">Loading resources...</p>
      ) : !loading && !resolving && resources.length === 0 && !activeFormatId ? (
        <p className="text-gray-500 dark:text-gray-400">No resources match your filters.</p>
      ) : (
        <ViewToggle
          resources={resources}
          loading={loading}
          hasMore={hasMore}
          loadingMore={loadingMore}
          showMap={showMap}
          showInPerson={showInPerson}
          showOnline={showOnline}
          onLoadMore={loadMore}
          onFormatChange={setActiveFormatId}
        />
      )}
    </div>
  );
}
