export function serializeFilters(selected: Record<string, Set<string>>): string {
  const parts: string[] = [];
  for (const [key, ids] of Object.entries(selected)) {
    if (ids.size > 0) {
      parts.push(`${key}=${Array.from(ids).join(",")}`);
    }
  }
  return parts.join("&");
}

export function deserializeFilters(query: string): Record<string, Set<string>> {
  const result: Record<string, Set<string>> = {};
  if (!query) return result;
  const params = new URLSearchParams(query);
  params.forEach((value, key) => {
    result[key] = new Set(value.split(",").filter(Boolean));
  });
  return result;
}
