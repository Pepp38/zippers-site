import fixAfterRefreshMd from "./fix-lost-form-data-after-page-refresh.md?raw";
import autosaveLocalStorageMd from "./autosave-form-data-localstorage.md?raw";
import autosaveJsMd from "./autosave-form-data-javascript.md?raw";
import preserveReactReloadMd from "./preserve-react-form-data-after-page-reload.md?raw";
import preventNavigationLossMd from "./prevent-form-data-loss-on-navigation.md?raw";

export type SolutionDoc = {
  slug: string;
  title: string;
  contentHtml: string; // Body only
  summary: string; // 1-liner for /solutions + /learn
};

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

// Minimal markdown -> HTML for our solution page format.
// Supports: #, ##, ### headings, paragraphs, bullet lists (- ), hr (---), bold (**text**).
function renderSolutionMarkdownToHtml(md: string): string {
  const lines = md.replaceAll("\r\n", "\n").split("\n");

  const out: string[] = [];
  let inList = false;
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    const joined = paragraph.join(" ").trim();
    if (joined.length > 0) out.push(`<p>${joined}</p>`);
    paragraph = [];
  };

  const closeList = () => {
    if (!inList) return;
    out.push("</ul>");
    inList = false;
  };

  const inline = (s: string) => {
    const safe = escapeHtml(s);
    return safe.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line === "") {
      flushParagraph();
      closeList();
      continue;
    }

    if (line === "---") {
      flushParagraph();
      closeList();
      out.push("<hr />");
      continue;
    }

    if (line.startsWith("# ")) {
      flushParagraph();
      closeList();
      out.push(`<h1>${inline(line.slice(2))}</h1>`);
      continue;
    }
    if (line.startsWith("## ")) {
      flushParagraph();
      closeList();
      out.push(`<h2>${inline(line.slice(3))}</h2>`);
      continue;
    }
    if (line.startsWith("### ")) {
      flushParagraph();
      closeList();
      out.push(`<h3>${inline(line.slice(4))}</h3>`);
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      if (!inList) {
        out.push("<ul>");
        inList = true;
      }
      out.push(`<li>${inline(line.slice(2))}</li>`);
      continue;
    }

    closeList();
    paragraph.push(inline(line));
  }

  flushParagraph();
  closeList();

  return out.join("\n");
}

export const solutionDocs: SolutionDoc[] = [
  {
    slug: "fix-lost-form-data-after-page-refresh",
    title: "Fix Lost Form Data After Page Refresh",
    summary: "Recover form drafts after refresh or crash with an autosave + restore pattern.",
    contentHtml: renderSolutionMarkdownToHtml(fixAfterRefreshMd),
  },
  {
    slug: "autosave-form-data-localstorage",
    title: "Autosave Form Data with localStorage",
    summary: "A simple autosave strategy using localStorage, with edge cases and safer defaults.",
    contentHtml: renderSolutionMarkdownToHtml(autosaveLocalStorageMd),
  },
  {
    slug: "autosave-form-data-javascript",
    title: "Autosave Form Data with JavaScript (No Framework)",
    summary: "Framework-free draft persistence, ideal for vanilla forms and simple web apps.",
    contentHtml: renderSolutionMarkdownToHtml(autosaveJsMd),
  },
  {
    slug: "preserve-react-form-data-after-page-reload",
    title: "Preserve React Form Data After Page Reload",
    summary: "Keep React form state across reloads without fighting hooks or component state.",
    contentHtml: renderSolutionMarkdownToHtml(preserveReactReloadMd),
  },
  {
    slug: "prevent-form-data-loss-on-navigation",
    title: "Prevent Form Data Loss on Navigation",
    summary: "Stop silent draft loss when users click away, back, or navigate accidentally.",
    contentHtml: renderSolutionMarkdownToHtml(preventNavigationLossMd),
  },
];

export function getSolutionBySlug(slug: string): SolutionDoc | undefined {
  return solutionDocs.find((s) => s.slug === slug);
}
