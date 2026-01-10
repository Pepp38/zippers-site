export type BlogPost = {
  slug: string;
  title: string;
  dateISO: string; // YYYY-MM-DD
  excerpt: string;
  authorName: string;
  readingTimeText: string; // e.g. "9 min read"
  microhook: string;
  quoteText: string;
  quoteAuthor: string;
  contentHtml: string; // (no microhook, no title, no quote)
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-savior-exists",
    title: "Why Savior Exists",
    dateISO: "2026-01-10",
    excerpt:
      "Autosave is supposed to be boring. Until it fails. This is the story of why Savior exists: not to be flashy, but to be reliable when people are tired, distracted, or one scroll away from losing everything.",
    authorName: "PL",
    readingTimeText: "9 min read",
    microhook:
      "Most people don’t complain when a form eats their work. They just disappear.",
    quoteText:
      "Somewhere, something incredible is waiting to be known.",
    quoteAuthor: "Carl Sagan",
    contentHtml: [
      "<p>There’s a quiet kind of failure on the web. No crash screen. No error dialog. Just a refresh, a tab close, a flaky mobile connection, and five minutes of effort turns into nothing.</p>",
      "<p>When that happens, most users do the same thing: they leave. They don’t open a ticket. They don’t write an email. They don’t even know who to blame. They simply stop trusting the flow.</p>",
      "<h2>The failure you don’t measure</h2>",
      "<p>Product teams measure conversions, clicks, funnels. But the most expensive failure is often invisible: the moment a user decides it’s not worth trying again.</p>",
      "<ul>",
      "<li>They were almost done.</li>",
      "<li>They had momentum.</li>",
      "<li>They were interrupted by something normal: a notification, a swipe, a reload.</li>",
      "</ul>",
      "<p>If you build serious products, you’ve seen it: fewer completions, vague feedback, and a general sense that ‘something’ is off, but no single bug report to fix.</p>",
      "<h2>Why not just ‘use autosave’?</h2>",
      "<p>Because autosave is not one thing. It’s a system. And systems fail in strange ways:</p>",
      "<ul>",
      "<li>drafts get overwritten by the wrong session</li>",
      "<li>storage gets cleared or becomes unavailable</li>",
      "<li>payloads change shape between releases</li>",
      "<li>serialization breaks (invalid JSON, partial writes)</li>",
      "</ul>",
      "<p>Most implementations are ‘good enough’ until they aren’t. And the day they aren’t is the day you lose trust, not just data.</p>",
      "<h2>The design goal</h2>",
      "<p>Savior exists to make autosave boring again. Not ‘clever’, not ‘magical’. Just dependable.</p>",
      "<h3>Local-first, by default</h3>",
      "<p>If the data can be saved locally, it should be. It’s fast, private, and resilient to network chaos.</p>",
      "<h3>Fail-soft, not fail-silent</h3>",
      "<p>When something goes wrong, the system should degrade gracefully. Keep what’s valid. Drop what isn’t. Never corrupt a good snapshot with a bad one.</p>",
      "<h3>Deterministic restore</h3>",
      "<p>Restoration should be predictable. Same inputs, same outputs. No spooky behavior that makes developers afraid to ship it.</p>",
      "<h2>The real reason</h2>",
      "<p>At the end of the day, this isn’t about storage APIs. It’s about respect.</p>",
      "<p>Respect for the user’s time. Respect for the fact that they’re distracted, human, and sometimes one accidental scroll away from giving up.</p>",
      "<p>Savior is my answer to that quiet failure: make it harder to lose work, and easier to trust the flow.</p>",
    ].join("\n"),
  },
  {
    slug: "writing-once-choosing-platform",
    title: "Writing Once, Choosing a Platform",
    dateISO: "2025-01-08",
    excerpt: "Canonical source here. Everything else is a mirror.",
    authorName: "PL",
    readingTimeText: "2 min read",
    microhook: "Write once. Publish everywhere. But keep a single source of truth.",
    quoteText: "The map is not the territory.",
    quoteAuthor: "Alfred Korzybski",
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
    authorName: "PL",
    readingTimeText: "3 min read",
    microhook: "Serious projects ask for consistency, not bursts of heroism.",
    quoteText: "Simplicity is prerequisite for reliability.",
    quoteAuthor: "Edsger W. Dijkstra",
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
