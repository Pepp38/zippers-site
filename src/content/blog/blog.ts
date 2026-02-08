export type BlogEntry = {
  slug: string;
  title: string;
  dateISO: string;
};

export const blogEntries: BlogEntry[] = [
  {
    slug: "why-savior-exists",
    title: "Why Savior Exists",
    dateISO: "2026-01-10",
  },
  {
    slug: "why-savior-safestate-recovery-exists",
    title: "Why Savior SafeState Recovery Exists",
    dateISO: "2026-02-07",
  },
];


export function getLatestBlogEntries(limit = 3): BlogEntry[] {
  return [...blogEntries]
    .sort((a, b) => b.dateISO.localeCompare(a.dateISO))
    .slice(0, limit);
}
