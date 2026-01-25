import silentDataLossMd from "./silent-data-loss.md?raw";

export type ConceptDoc = {
  slug: string;
  title: string;
  contentHtml: string; // Body only
};

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

// Minimal markdown -> HTML for our concept page format.
// Supports: #, ##, ### headings, paragraphs, bullet lists (- ), hr (---), bold (**text**).
function renderConceptMarkdownToHtml(md: string): string {
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
    // bold: **text**
    return safe.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    // blank line
    if (line === "") {
      flushParagraph();
      closeList();
      continue;
    }

    // horizontal rule
    if (line === "---") {
      flushParagraph();
      closeList();
      out.push("<hr />");
      continue;
    }

    // headings
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

    // bullets
    if (line.startsWith("- ")) {
      flushParagraph();
      if (!inList) {
        out.push("<ul>");
        inList = true;
      }
      out.push(`<li>${inline(line.slice(2))}</li>`);
      continue;
    }

    // normal text line
    closeList();
    paragraph.push(inline(line));
  }

  flushParagraph();
  closeList();

  return out.join("\n");
}

export const conceptDocs: ConceptDoc[] = [
  {
    slug: "silent-data-loss",
    title: "Silent Data Loss",
    contentHtml: renderConceptMarkdownToHtml(silentDataLossMd),
  },
];

export function getConceptBySlug(slug: string): ConceptDoc | undefined {
  return conceptDocs.find((c) => c.slug === slug);
}
