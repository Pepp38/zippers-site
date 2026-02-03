import { renderMarkdownToHtml } from "../../lib/renderMarkdown";

import fixAfterRefreshMd from "./fix-lost-form-data-after-page-refresh.md?raw";
import autosaveLocalStorageMd from "./autosave-form-data-localstorage.md?raw";
import autosaveJsMd from "./autosave-form-data-javascript.md?raw";
import preserveReactReloadMd from "./preserve-react-form-data-after-page-reload.md?raw";
import preventNavigationLossMd from "./prevent-form-data-loss-on-navigation.md?raw";

/* --------------------------------------------------
   Types
-------------------------------------------------- */

export type SolutionDoc = {
  slug: string;
  title: string;
  summary: string;      // 1-liner for /solutions + /learn
  contentHtml: string;  // Rendered markdown body only
};

/* --------------------------------------------------
   Render markdown sources
-------------------------------------------------- */

const fixAfterRefresh = renderMarkdownToHtml(fixAfterRefreshMd);
const autosaveLocalStorage = renderMarkdownToHtml(autosaveLocalStorageMd);
const autosaveJs = renderMarkdownToHtml(autosaveJsMd);
const preserveReactReload = renderMarkdownToHtml(preserveReactReloadMd);
const preventNavigationLoss = renderMarkdownToHtml(preventNavigationLossMd);

/* --------------------------------------------------
   Solutions registry
-------------------------------------------------- */

export const solutionDocs: SolutionDoc[] = [
  {
    slug: "fix-lost-form-data-after-page-refresh",
    title: "Fix Lost Form Data After Page Refresh",
    summary:
      "Recover form drafts after refresh or crash with an autosave + restore pattern.",
    contentHtml: fixAfterRefresh.html,
  },
  {
    slug: "autosave-form-data-localstorage",
    title: "Autosave Form Data with localStorage",
    summary:
      "A simple autosave strategy using localStorage, with edge cases and safer defaults.",
    contentHtml: autosaveLocalStorage.html,
  },
  {
    slug: "autosave-form-data-javascript",
    title: "Autosave Form Data with JavaScript (No Framework)",
    summary:
      "Framework-free draft persistence, ideal for vanilla forms and simple web apps.",
    contentHtml: autosaveJs.html,
  },
  {
    slug: "preserve-react-form-data-after-page-reload",
    title: "Preserve React Form Data After Page Reload",
    summary:
      "Keep React form state across reloads without fighting hooks or component state.",
    contentHtml: preserveReactReload.html,
  },
  {
    slug: "prevent-form-data-loss-on-navigation",
    title: "Prevent Form Data Loss on Navigation",
    summary:
      "Stop silent draft loss when users click away, back, or navigate accidentally.",
    contentHtml: preventNavigationLoss.html,
  },
];

/* --------------------------------------------------
   Selectors
-------------------------------------------------- */

export function getSolutionBySlug(slug: string): SolutionDoc | undefined {
  return solutionDocs.find((s) => s.slug === slug);
}

export function getAllSolutions(): SolutionDoc[] {
  return solutionDocs;
}
