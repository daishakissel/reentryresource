import { useEffect, useRef } from "react";
import type { Resource } from "@/types/database";
import ResourceCard from "./ResourceCard";

interface CategoryImage {
  name: string;
  imageUrl: string;
}

interface ResourceGridProps {
  resources: Resource[];
  hasMore?: boolean;
  loadingMore?: boolean;
  onLoadMore?: () => void;
  resourceModeMap?: Record<string, string[]>;
  modeLookup?: Record<string, string>;
  resourceCategoryImages?: Record<string, CategoryImage[]>;
  resourceFormatLabels?: Record<string, string[]>;
  resourceCenteringLabels?: Record<string, string[]>;
}

export default function ResourceGrid({ resources, hasMore, loadingMore, onLoadMore, resourceModeMap, modeLookup, resourceCategoryImages, resourceFormatLabels, resourceCenteringLabels }: ResourceGridProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onLoadMore || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore) {
          onLoadMore();
        }
      },
      { rootMargin: "200px" }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [onLoadMore, hasMore, loadingMore]);

  if (resources.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No resources found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {resources.map((resource) => {
          const modeNames = resourceModeMap && modeLookup
            ? (resourceModeMap[resource.id] ?? []).map((id) => modeLookup[id]).filter(Boolean)
            : [];
          const catImages = resourceCategoryImages?.[resource.id] ?? [];
          const formatLabels = resourceFormatLabels?.[resource.id] ?? [];
          const centeringLabels = resourceCenteringLabels?.[resource.id] ?? [];
          return <ResourceCard key={resource.id} resource={resource} modeLabels={modeNames} categoryImages={catImages} formatLabels={formatLabels} centeringLabels={centeringLabels} />;
        })}
      </div>
      {hasMore && (
        <div ref={sentinelRef} className="py-8 text-center">
          {loadingMore && <p className="text-gray-500 text-sm">Loading more...</p>}
        </div>
      )}
    </div>
  );
}
