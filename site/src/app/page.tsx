"use client";

import { useEffect, useState, useCallback } from "react";
import ViewToggle, { MapToggleButton, ModeToggleButtons, ViewControlsInfo } from "@/components/ViewToggle";
import ResourceFilter from "@/components/ResourceFilter";
import { useInfiniteResources } from "@/lib/useInfiniteResources";
import { loadFilters, saveFilters, saveLastWhy } from "@/lib/filterStorage";

export default function HomePage() {
  const [selected, setSelected] = useState<Record<string, Set<string>>>({});
  const [loaded, setLoaded] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showInPerson, setShowInPerson] = useState(true);
  const [showOnline, setShowOnline] = useState(true);
  const [activeFormatId, setActiveFormatId] = useState<string | undefined>(undefined);

  useEffect(() => {
    setSelected(loadFilters());
    saveLastWhy("All", "/");
    setLoaded(true);
  }, []);

  function handleSelectionChange(newSelected: Record<string, Set<string>>) {
    setSelected(newSelected);
    saveFilters(newSelected);
  }

  const { resources, loading, loadingMore, hasMore, loadInitial, loadMore } =
    useInfiniteResources({ filters: selected, formatId: activeFormatId });

  useEffect(() => {
    if (loaded) loadInitial();
  }, [loaded, loadInitial, activeFormatId]);

  const handleFormatChange = useCallback((formatId: string) => {
    setActiveFormatId(formatId);
  }, []);

  if (!loaded) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">All Resources</h1>
      <ResourceFilter selected={selected} onSelectionChange={handleSelectionChange} />
      <div className="flex flex-wrap gap-2 mb-4">
        <ViewControlsInfo />
        <MapToggleButton showMap={showMap} onToggle={() => setShowMap((v) => !v)} />
        <ModeToggleButtons showInPerson={showInPerson} showOnline={showOnline} onToggleInPerson={() => setShowInPerson((v) => !v)} onToggleOnline={() => setShowOnline((v) => !v)} />
      </div>
      {loading && !activeFormatId ? (
        <p className="text-gray-500">Loading resources...</p>
      ) : !loading && resources.length === 0 && !activeFormatId ? (
        <p className="text-gray-500 dark:text-gray-400">No resources match your filters.</p>
      ) : (
        <ViewToggle
          resources={resources}
          loading={loading}
          hasMore={hasMore}
          loadingMore={loadingMore}
          onLoadMore={loadMore}
          onFormatChange={handleFormatChange}
          showMap={showMap}
          showInPerson={showInPerson}
          showOnline={showOnline}
        />
      )}
    </div>
  );
}
