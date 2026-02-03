// src/lib/renderMarkdown.ts
import MarkdownIt from "markdown-it";
import matter from "gray-matter";

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
});

export function renderMarkdownToHtml(rawMd: string): {
  frontmatter: Record<string, any>;
  html: string;
} {
  const parsed = matter(rawMd);
  return {
    frontmatter: parsed.data,
    html: md.render(parsed.content),
  };
}
