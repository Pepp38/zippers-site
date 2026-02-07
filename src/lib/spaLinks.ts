import type { NavigateFunction } from "react-router-dom";

export function handleSpaLinkClick(
  e: React.MouseEvent<HTMLElement>,
  navigate: NavigateFunction
): void {
  // Only left-clicks, no modifier keys (let browser do normal behavior)
  if (e.defaultPrevented) return;
  if (e.button !== 0) return;
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;

  const target = e.target as HTMLElement | null;
  const anchor = target?.closest("a") as HTMLAnchorElement | null;
  if (!anchor) return;

  const href = anchor.getAttribute("href");
  if (!href) return;

  // respect explicit target/download
  const targetAttr = anchor.getAttribute("target");
  if (targetAttr && targetAttr !== "_self") return;
  if (anchor.hasAttribute("download")) return;

  // internal navigation only
  if (href.startsWith("/")) {
    e.preventDefault();
    navigate(href);
  }
}
