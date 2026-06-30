export const ELEMENTS = [
  { slug: "all", label: "All", href: "/" },
  { slug: "health", label: "Health", href: "/elements/health" },
  { slug: "housing", label: "Housing", href: "/elements/housing" },
  { slug: "admin", label: "Admin", href: "/elements/admin" },
  { slug: "income", label: "Income", href: "/elements/income" },
  { slug: "daily-essentials", label: "Daily Essentials", href: "/elements/daily-essentials" },
  { slug: "my-team", label: "My Team", href: "/elements/my-team" },
] as const;

export type ElementSlug = (typeof ELEMENTS)[number]["slug"];
