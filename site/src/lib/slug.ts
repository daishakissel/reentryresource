export function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Resource slugs use the full organization name first, then the title.
export function resourceSlug(orgName: string | null | undefined, title: string): string {
  const base = [orgName, title].filter(Boolean).join(" ");
  return slugify(base || title);
}
