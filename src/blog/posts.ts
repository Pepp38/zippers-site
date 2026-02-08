// posts.tsx
// ---------------------------------------------
// Editorial source of truth for Zippers Blog
// - Long-form, evergreen essays
// - No presentation logic
// - Senior / HN-friendly structure
// ---------------------------------------------

export type BlogPostAuthor = {
  name: string;
  tagline?: string;
  website?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  dateISO: string; // YYYY-MM-DD
  excerpt: string;
  author: BlogPostAuthor;
  readingTimeText: string; // e.g. "3 min read"
  microhook: string;
  quoteText: string;
  quoteAuthor: string;
  contentHtml: string; // Body only (no title, no quote, no signature)
};

// ---------------------------------------------
// Posts
// ---------------------------------------------

export const blogPosts: BlogPost[] = [
  {
    slug: "why-savior-exists",
    title: "Why Savior Exists",
    dateISO: "2026-01-10",
    readingTimeText: "3 min read",

    excerpt:
      "A short essay about silent data loss, normal user behavior, and the problems product metrics don’t see.",

    microhook:
      "A short essay about silent data loss, normal user behavior, and the problems product metrics don’t see.",

    author: {
      name: "Pierre-Luc Carignan",
      tagline: "Creator of Savior",
      website: "https://zippers.dev",
    },

    quoteText: "Absence of evidence is not evidence of absence.",
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
      "<p>Learn more about this issue in the <a href=\"/concepts/silent-data-loss\">Silent Data Loss</a> concept page.</p>",

      "<h2>A very ordinary failure</h2>",
      "<p>A few weeks ago, I was filling out a survey for a major Canadian airline on my iPhone. It was not a short form. After about five minutes, the interface showed I was roughly 25% done.</p>",
      "<p>Then it happened. A small, accidental upward scroll. The page refreshed. Everything was gone.</p>",
      "<p>No warning. No recovery. Just an empty form.</p>",
      "<p>My reaction was immediate, and completely unremarkable. I closed the page. I did not complain. I did not send feedback. I did not try again. I simply gave up.</p>",
      "<p>This behavior is not exceptional. It is normal.</p>",

      "<p class=\"blogPull\">When users lose data, they tend to blame themselves. They assume they made a mistake, shrug it off, and move on. The product never hears about it.</p>",

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
    ].join("\n"),
  },
  {
    slug: "why-savior-safestate-recovery-exists",
    title: "Why Savior SafeState Recovery Exists",
    dateISO: "2026-02-07",
    readingTimeText: "4 min read",

    excerpt:
      "Why autosave alone is not enough, and why deterministic rollback became necessary.",

    microhook:
      "Autosave gave confidence. SafeState Recovery became necessary.",

    author: {
      name: "Pierre-Luc Carignan",
      tagline: "Creator of Savior",
      website: "https://zippers.dev",
    },

    quoteText: "The latest saved state is not necessarily a safe state.",
    quoteAuthor: "Zippers.dev",

    contentHtml: [
      "<h2>Autosave gave us confidence. Too much.</h2>",
      "<p>Autosave solves a visible problem.</p>",
      "<p>It prevents users from losing input when pages refresh, tabs close, or browsers misbehave.</p>",
      "<p>But autosave also introduces a dangerous assumption: <strong>that the last saved state is safe to restore</strong>.</p>",
      "<p>For a long time, that assumption holds.</p>",
      "<p>Autosave absorbs interruptions so well that failure disappears from daily concern. The system feels resilient.</p>",
      "<p>Until confidence quietly replaces verification.</p>",

      "<h2>The day autosave wasn’t enough</h2>",
      "<p>The breaking point did not arrive with a crash. It arrived with a restore.</p>",
      "<p>Autosave worked. The data came back.</p>",
      "<p><strong>But the restored state was already invalid.</strong></p>",
      "<p>Fields no longer respected their invariants. Derived values contradicted their sources. Validation rules rejected persisted inputs.</p>",
      "<p>Nothing was lost. But <strong>nothing could be safely recovered</strong>.</p>",
      "<p>Autosave had done its job perfectly. It had preserved a state that should never have been restored.</p>",

      "<h2>When the latest state is already corrupted</h2>",
      "<p>Persistence does not imply correctness.</p>",
      "<p><strong>An application can faithfully restore a state that is semantically broken.</strong></p>",
      "<p>Modern client-side state is not static. It emerges from sequencing, invariants, timing, and side effects. A snapshot can be complete, syntactically valid, and still unusable.</p>",
      "<p>This happens through ordinary situations:</p>",
      "<ul>",
      "<li>interrupted writes</li>",
      "<li>schema or validation changes</li>",
      "<li>derived fields saved out of order</li>",
      "<li>concurrent updates across inputs</li>",
      "<li>partial rehydration after navigation or memory pressure</li>",
      "</ul>",
      "<p>In those moments, “latest” does not mean “safe”.</p>",
      "<p>Restoring the most recent snapshot simply reproduces the failure, reliably.</p>",

      "<h2>Why retries and heuristics fail</h2>",
      "<p>When recovery logic is implicit, teams fall back to probability.</p>",
      "<p>Reload. Retry submission. Clear a few fields. Reset everything.</p>",
      "<p><strong>These strategies do not restore correctness. They gamble on it.</strong></p>",
      "<p>Sometimes the next attempt lands on a valid state. Sometimes it doesn’t. When it fails, it fails quietly, without signal or explanation.</p>",
      "<p>Retries optimize for likelihood. Reliability requires certainty.</p>",

      "<h2>The need for deterministic rollback</h2>",
      "<p>At this point, recovery is no longer about saving more often.</p>",
      "<p><strong>It becomes about restoring a state that is known to be valid.</strong></p>",
      "<p>Not “what was last written”, but:</p>",
      "<blockquote>",
      "<p>What was the last state that satisfied the application’s invariants?</p>",
      "</blockquote>",
      "<p>That question cannot be answered after the fact unless validity was recorded explicitly.</p>",
      "<p>Deterministic rollback requires:</p>",
      "<ul>",
      "<li>a definition of validity</li>",
      "<li>explicit marking of valid states</li>",
      "<li>exact restoration of those states</li>",
      "</ul>",
      "<p>Without this, recovery remains guesswork. With it, recovery becomes predictable.</p>",

      "<h2>What SafeState Recovery guarantees</h2>",
      "<p>SafeState Recovery does not extend autosave. <strong>It separates persistence from validity.</strong></p>",
      "<p>Its role is not to capture more data, but to ensure that recovery never restores an incoherent state.</p>",
      "<p>When recovery happens, the application returns to a state that was explicitly known to be valid at the time it was recorded.</p>",
      "<p>No inference. No partial repair. No heuristics.</p>",
      "<p>See the <a href=\"/concepts/safe-state-recovery\">SafeState Recovery</a> concept page for the formal model.</p>",

      "<h2>Why this became a separate module</h2>",
      "<p>Autosave addresses a universal problem. Deterministic rollback addresses a structural one.</p>",
      "<p><strong>Keeping both under the same abstraction would have hidden a critical boundary.</strong></p>",
      "<p>Savior Core persists user input defensively. Savior SafeState Recovery governs state validity and rollback.</p>",
      "<p>Not every application needs deterministic rollback. But when it does, that logic cannot remain implicit, optional, or improvised.</p>",
      "<p>It had to be explicit. Auditable. Isolated.</p>",
      "<p>This separation was not a packaging decision. It was an architectural one.</p>",

      "<h2>Who this is for (and who it isn’t)</h2>",
      "<p>This exists for applications where:</p>",
      "<ul>",
      "<li>state has internal dependencies</li>",
      "<li>recovery must be predictable</li>",
      "<li>restoring an invalid state is worse than restoring an older one</li>",
      "</ul>",
      "<p>It is not for trivial forms. It is not for demos. It is not for optimistic shortcuts.</p>",
      "<p>It is for teams who have learned that persistence alone does not equal safety.</p>",

      "<h3>Final note</h3>",
      "<p>SafeState Recovery did not start as a feature.</p>",
      "<p><strong>It emerged when autosave reached its limit and honesty required acknowledging it.</strong></p>",
      "<p>At that point, it could no longer stay implicit.</p>",
    ].join("\n"),
  }

];

// ---------------------------------------------
// Selectors
// ---------------------------------------------

export function getAllPostsSorted(): BlogPost[] {
  return [...blogPosts].sort((a, b) =>
    b.dateISO.localeCompare(a.dateISO)
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
