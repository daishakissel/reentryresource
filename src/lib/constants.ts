export const WHY_CATEGORIES = [
  { slug: "all", label: "All", href: "/" },
  { slug: "health", label: "Health", href: "/why/health" },
  { slug: "housing", label: "Housing", href: "/why/housing" },
  { slug: "admin", label: "Admin", href: "/why/admin" },
  { slug: "income", label: "Income", href: "/why/income" },
  { slug: "daily-essentials", label: "Daily Essentials", href: "/why/daily-essentials" },
  { slug: "my-team", label: "My Team", href: "/why/my-team" },
] as const;

export type WhyCategorySlug = (typeof WHY_CATEGORIES)[number]["slug"];
