const STORAGE_KEY = "resourceFilters";

export function saveFilters(filters: Record<string, Set<string>>) {
  const serialized: Record<string, string[]> = {};
  for (const [key, ids] of Object.entries(filters)) {
    if (ids.size > 0) {
      serialized[key] = Array.from(ids);
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
}

export function loadFilters(): Record<string, Set<string>> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return {};
    const parsed = JSON.parse(stored);
    const result: Record<string, Set<string>> = {};
    for (const [key, ids] of Object.entries(parsed)) {
      if (Array.isArray(ids) && ids.length > 0) {
        result[key] = new Set(ids as string[]);
      }
    }
    return result;
  } catch {
    return {};
  }
}

export function clearFilters() {
  localStorage.removeItem(STORAGE_KEY);
}
