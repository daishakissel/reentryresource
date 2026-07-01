export const ELEMENTS = [
  { slug: 'all', label: 'All' },
  { slug: 'health', label: 'Health' },
  { slug: 'housing', label: 'Housing' },
  { slug: 'admin', label: 'Admin' },
  { slug: 'income', label: 'Income' },
  { slug: 'daily-essentials', label: 'Daily Essentials' },
  { slug: 'my-team', label: 'My Team' },
] as const

export type ElementSlug = (typeof ELEMENTS)[number]['slug']
