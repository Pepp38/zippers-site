import type { ReactNode } from "react";
import "../styles/markdown-body.css";

type MarkdownFrameProps = {
  children: ReactNode;
  className?: string;
};

export function MarkdownFrame({ children, className }: MarkdownFrameProps) {
  const cls = className ? `markdown-body ${className}` : "markdown-body";
  return <article className={cls}>{children}</article>;
}
