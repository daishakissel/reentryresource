import { useEffect, useRef } from "react";
import type { Resource } from "@/types/database";
import ResourceCard from "./ResourceCard";

interface ResourceGridProps {
  resources: Resource[];
  backPath?: string;
  hasMore?: boolean;
  loadingMore?: boolean;
  onLoadMore?: () => void;
}

export default function ResourceGrid({ resources, backPath, hasMore, loadingMore, onLoadMore }: ResourceGridProps) {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} backPath={backPath} />
        ))}
      </div>
      {hasMore && (
        <div ref={sentinelRef} className="py-8 text-center">
          {loadingMore && <p className="text-gray-500 text-sm">Loading more...</p>}
        </div>
      )}
    </div>
  );
}
