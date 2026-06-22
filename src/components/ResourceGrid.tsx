import type { Resource } from "@/types/database";
import ResourceCard from "./ResourceCard";

interface ResourceGridProps {
  resources: Resource[];
  backPath?: string;
}

export default function ResourceGrid({ resources, backPath }: ResourceGridProps) {
  if (resources.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No resources found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} backPath={backPath} />
      ))}
    </div>
  );
}
