import silentDataLossMd from "./silent-data-loss.md?raw";
import safeStateRecoveryMd from "./safe-state-recovery.md?raw";
import { renderMarkdownToHtml } from "../../lib/renderMarkdown";

export type ConceptDoc = {
  slug: string;
  title: string;
  contentHtml: string; // Body only
};

export const conceptDocs: ConceptDoc[] = [
  {
    slug: "silent-data-loss",
    title: "Silent Data Loss",
    contentHtml: renderMarkdownToHtml(silentDataLossMd).html,
  },
  {
    slug: "safe-state-recovery",
    title: "Safe State Recovery",
    contentHtml: renderMarkdownToHtml(safeStateRecoveryMd).html,
  },
];

export function getConceptBySlug(slug: string): ConceptDoc | undefined {
  return conceptDocs.find((c) => c.slug === slug);
}
