"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ViewToggle from "@/components/ViewToggle";
import ResourceFilter from "@/components/ResourceFilter";
import { useInfiniteResources } from "@/lib/useInfiniteResources";
import { serializeFilters, deserializeFilters } from "@/lib/filterUtils";

export default function HomePage() {
  return (
    <Suspense fallback={<p className="text-gray-500">Loading...</p>}>
      <HomePageInner />
    </Suspense>
  );
}

function HomePageInner() {
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<Record<string, Set<string>>>(() =>
    deserializeFilters(searchParams.toString())
  );

  const { resources, loading, loadingMore, hasMore, loadInitial, loadMore } =
    useInfiniteResources({ filters: selected });

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">All Resources</h1>
      <ResourceFilter selected={selected} onSelectionChange={setSelected} />
      {loading ? (
        <p className="text-gray-500">Loading resources...</p>
      ) : (
        <ViewToggle
          resources={resources}
          backPath={`/?${serializeFilters(selected)}`}
          hasMore={hasMore}
          loadingMore={loadingMore}
          onLoadMore={loadMore}
        />
      )}
    </div>
  );
}
