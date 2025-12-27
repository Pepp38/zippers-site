export type BlogPost = {
  slug: string;
  title: string;
  dateISO: string; // YYYY-MM-DD
  excerpt: string;
  contentHtml: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "writing-once-choosing-platform",
    title: "Writing Once, Choosing a Platform",
    dateISO: "2025-01-08",
    excerpt: "Canonical source here. Everything else is a mirror.",
    contentHtml: [
      "<p>Another placeholder.</p>",
      "<p>This blog is the canonical source.<br>Everything else is a mirror.</p>",
    ].join("\n"),
  },
  {
    slug: "what-a-serious-project-asks-of-you",
    title: "What a Serious Project Asks of You",
    dateISO: "2025-01-12",
    excerpt: "A placeholder post to validate structure and flow.",
    contentHtml: [
      "<p>This is a placeholder article.</p>",
      "<p>It exists to validate:</p>",
      "<ul>",
      "<li>markdown rendering</li>",
      "<li>URL structure</li>",
      "<li>canonical publishing flow</li>",
      "</ul>",
    ].join("\n"),
  },
];

export function getAllPostsSorted(): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.dateISO.localeCompare(a.dateISO));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
