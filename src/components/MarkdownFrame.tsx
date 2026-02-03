// src/components/MarkdownFrame.tsx
import "../styles/github-markdown.css";

export function MarkdownFrame({ children }: { children: React.ReactNode }) {
  return <article className="markdown-body">{children}</article>;
}
