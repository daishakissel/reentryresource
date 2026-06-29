import Fuse from "fuse.js";
import type { Resource } from "@/types/database";

export interface SearchableResource extends Resource {
  category_display?: string;
  city_display?: string;
}

const fuseOptions: Fuse.IFuseOptions<SearchableResource> = {
  keys: [
    { name: "title", weight: 0.4 },
    { name: "description", weight: 0.2 },
    { name: "content", weight: 0.15 },
    { name: "category_display", weight: 0.15 },
    { name: "city", weight: 0.05 },
    { name: "street_address", weight: 0.05 },
  ],
  threshold: 0.15,
  ignoreLocation: true,
  minMatchCharLength: 2,
};

export function searchResources(
  resources: SearchableResource[],
  query: string
): SearchableResource[] {
  if (!query.trim()) return resources;
  const fuse = new Fuse(resources, fuseOptions);
  return fuse.search(query).map((result) => result.item);
}

export function getUniqueCities(resources: SearchableResource[]): string[] {
  const cities = new Set<string>();
  resources.forEach((r) => {
    if (r.city) cities.add(r.city);
  });
  return Array.from(cities).sort();
}
