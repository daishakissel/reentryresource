"use client";

import { useEffect, useState } from "react";
import ViewToggle from "@/components/ViewToggle";
import ResourceFilter from "@/components/ResourceFilter";
import { useInfiniteResources } from "@/lib/useInfiniteResources";
import { loadFilters, saveFilters } from "@/lib/filterStorage";

export default function HomePage() {
  const [selected, setSelected] = useState<Record<string, Set<string>>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSelected(loadFilters());
    setLoaded(true);
  }, []);

  function handleSelectionChange(newSelected: Record<string, Set<string>>) {
    setSelected(newSelected);
    saveFilters(newSelected);
  }

  const { resources, loading, loadingMore, hasMore, loadInitial, loadMore } =
    useInfiniteResources({ filters: selected });

  useEffect(() => {
    if (loaded) loadInitial();
  }, [loaded, loadInitial]);

  if (!loaded) return <p className="text-gray-500">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">All Resources</h1>
      <ResourceFilter selected={selected} onSelectionChange={handleSelectionChange} />
      {loading ? (
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
