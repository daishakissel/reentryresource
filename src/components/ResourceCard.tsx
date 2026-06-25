import Link from "next/link";
import type { Resource } from "@/types/database";

interface ResourceCardProps {
  resource: Resource;
  backPath?: string;
}

export default function ResourceCard({ resource, backPath }: ResourceCardProps) {
  const href = backPath
    ? `/resource/${resource.slug || resource.id}?from=${encodeURIComponent(backPath)}`
    : `/resource/${resource.slug || resource.id}`;

  return (
    <Link href={href}>
      <div className="bg-white dark:bg-ocean-light rounded-lg border border-gray-200 dark:border-ocean-light overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
        {resource.featured_image ? (
          <div className="h-40 bg-gray-100 flex-shrink-0">
            <img src={resource.featured_image} alt={resource.title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="h-40 bg-gray-100 dark:bg-ocean flex items-center justify-center flex-shrink-0">
            <span className="text-gray-400 text-sm">No image</span>
          </div>
        )}
        <div className="p-4 flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">{resource.title}</h3>
          {resource.description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{resource.description}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
