export type BlogPostAuthor = {
  name: string;
  tagline?: string;
  website?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  dateISO: string;
  excerpt: string;
  author: {
    name: "Pierre-Luc Carignan",
    tagline: "Creator of Savior",
    website: "zippers.dev",
  },
  readingTimeText: string;
  microhook: string;
  quoteText: string;
  quoteAuthor: string;
  contentHtml: string;
};

export const blogPosts: BlogPost[] = [
{
  slug: "why-savior-exists",
  title: "Why Savior Exists",
  dateISO: "2026-01-10",
  excerpt:
    "A short essay about silent data loss, normal user behavior, and the problems product metrics don’t see. Savior exists to protect user-entered form data from the quiet failures that rarely show up in dashboards.",
  authorName: "Pierre-Luc Carignan
Creator of Savior
zippers.dev",
  readingTimeText: "3 min read",
  microhook:
    "A short essay about silent data loss, normal user behavior, and the problems product metrics don’t see.",
  quoteText:
    "Absence of evidence is not evidence of absence.",
  quoteAuthor: "Carl Sagan",
  contentHtml: [
    "<h2>A quiet problem in modern web apps</h2>",
    "<p>Data loss in web forms is not a new problem. But in modern applications, it has become strangely invisible.</p>",
    "<p>The issue did not disappear. It shifted.</p>",
    "<p>Today’s web apps are used more on mobile, across unstable networks, with aggressive browser lifecycle management. Forms are longer, more complex, often multi-step, and users are interrupted constantly.</p>",
    "<p>The result is not necessarily more bugs, but more opportunities for normal human behavior to cause silent data loss.</p>",
    "<p>Most teams measure what breaks loudly: server errors, crashes, failed payments, validation errors. Dashboards are full of red bars and alerts. When something goes wrong at scale, we usually know.</p>",
    "<p>What we almost never measure is what disappears quietly.</p>",
    "<p>There are very few modern, maintained, and simple solutions dedicated to protecting user-entered data in web forms. Existing approaches tend to fall into three categories:</p>",
    "<ul>",
    "<li>Legacy libraries that are no longer actively maintained</li>",
    "<li>Heavy solutions that require deep integration or framework-specific setups</li>",
    "<li>Partial fixes that do not reflect real usage patterns, especially on mobile</li>",
    "</ul>",
    "<p>Yet form data loss is still happening. Frequently. Silently.</p>",

    "<h2>A very ordinary failure</h2>",
    "<p>A few weeks ago, I was filling out a survey for a major Canadian airline on my iPhone. It was not a short form. After about five minutes, the interface showed I was roughly 25% done.</p>",
    "<p>Then it happened. A small, accidental upward scroll. The page refreshed. Everything was gone.</p>",
    "<p>No warning. No recovery. Just an empty form.</p>",
    "<p>My reaction was immediate, and completely unremarkable. I closed the page. I did not complain. I did not send feedback. I did not try again. I simply gave up.</p>",
    "<p>This behavior is not exceptional. It is normal.</p>",
    "<p>When users lose data, they tend to blame themselves. They assume they made a mistake, shrug it off, and move on. The product never hears about it.</p>",

    "<h3>Silence is not satisfaction</h3>",
    "<p>In customer experience research, this pattern is well documented.</p>",
    "<p>Multiple studies consistently show that <strong>only a small minority of dissatisfied users ever complain directly to a company</strong>. The vast majority do not escalate the issue, do not provide feedback, and do not explain what went wrong.</p>",
    "<p>Instead, they leave.</p>",
    "<p>Visible complaints therefore represent only a thin surface layer of actual frustration. Beneath each one sits a much larger volume of silent abandonments that never appear in dashboards, metrics, or support tickets.</p>",

    "<h2>The blind spot in product metrics</h2>",
    "<p>Product teams are not careless. They are usually very good at measuring what is visible.</p>",
    "<p>Errors are tracked. Crashes are logged. Performance regressions show up quickly. When something breaks in a noisy way, it leaves a trace.</p>",
    "<p>Data loss rarely does.</p>",
    "<p>When a user refreshes a page, closes a tab, or loses a form because the browser crashed, nothing necessarily looks wrong from the system’s point of view. No error is thrown. No alert fires. No red line appears on a dashboard.</p>",
    "<p>The user simply leaves.</p>",
    "<p>From the product’s perspective, nothing failed. From the user’s perspective, everything did.</p>",
    "<p>That gap is the blind spot Savior was built for.</p>",

    "<h2>Why Savior exists</h2>",
    "<p>I did not build Savior to optimize performance charts or polish UX details; I built it because people are human.</p>",
    "<p>They get interrupted. They mis-scroll. They reload a tab without thinking. Browsers crash. Phones do what phones do.</p>",
    "<p>None of this is exceptional. It is everyday behavior.</p>",
    "<p>Savior exists as a local safety net for those moments. It quietly keeps form data around so that a brief interruption does not wipe out several minutes of effort.</p>",
    "<p>For the user, it removes a small but very real source of frustration. For the product, it prevents a failure that would otherwise leave no trace at all.</p>",
    "<p>No jargon. No ceremony. Just protection where things usually go wrong.</p>",

    "<h3>A quiet conclusion</h3>",
    "<p>Savior exists because data loss is common, frustrating, and almost always silent.</p>",
    "<p>If you have ever lost form data and quietly gave up, this is exactly why Savior exists.</p>",
    "<p>Learn more at <strong>zippers.dev</strong>.</p>",
  ].join("\n"),
},
];

export function getAllPostsSorted(): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.dateISO.localeCompare(a.dateISO));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
