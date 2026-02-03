import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
});

/**
 * Render markdown to HTML.
 * - Removes YAML frontmatter if present
 * - Browser-safe (no Node APIs)
 */
export function renderMarkdownToHtml(source: string): {
  html: string;
} {
  const withoutFrontmatter = source.replace(
    /^---[\s\S]*?---\s*/m,
    ""
  );

  const html = md.render(withoutFrontmatter);

  return { html };
}
