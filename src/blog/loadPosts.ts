import matter from "gray-matter";
import type { BlogFrontMatter, BlogPost, BlogPostSummary } from "./blogTypes";

type RawGlobModule = Record<string, string>;

function normalizeTags(tags: unknown): string[] {
  if (Array.isArray(tags)) {
    return tags
      .map((t) => String(t).trim())
      .filter(Boolean);
  }

  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }

  return [];
}

function requireString(value: unknown, fieldName: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Blog front matter missing or invalid: ${fieldName}`);
  }
  return value.trim();
}

function requireBoolean(value: unknown, fieldName: string): boolean {
  if (typeof value !== "boolean") {
    throw new Error(`Blog front matter missing or invalid: ${fieldName}`);
  }
  return value;
}

function extractSlugFromPath(filePath: string): string {
  // Example key: "../content/blog/my-post.md"
  const fileName = filePath.split("/").pop() ?? "";
  return fileName.replace(/\.md$/, "");
}

function normalizeFrontMatter(data: Record<string, unknown>): BlogFrontMatter {
  const title = requireString(data.title, "title");
  const date = requireString(data.date, "date");
  const published = requireBoolean(data.published, "published");
  const description = requireString(data.description, "description");

  const tags = normalizeTags(data.tags);

  const cover_image =
    typeof data.cover_image === "string" ? data.cover_image.trim() : undefined;

  const canonical_url =
    typeof data.canonical_url === "string" ? data.canonical_url.trim() : undefined;

  return {
    title,
    date,
    published,
    description,
    tags,
    cover_image,
    canonical_url,
  };
}

function toCoverImageUrl(coverImageRelative?: string): string | undefined {
  if (!coverImageRelative) return undefined;

  // cover_image should be relative like "blog/covers/x.jpg".
  // BASE_URL handles GitHub Pages base path.
  const baseUrl = import.meta.env.BASE_URL;
  const cleaned = coverImageRelative.replace(/^\/+/, "");
  return `${baseUrl}${cleaned}`;
}

export function loadPosts(): BlogPost[] {
  const modules = import.meta.glob<string>("../content/blog/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
  }) as RawGlobModule;

  const posts: BlogPost[] = Object.entries(modules).map(([filePath, raw]) => {
    const slug = extractSlugFromPath(filePath);
    const parsed = matter(raw);

    const frontMatter = normalizeFrontMatter(
      parsed.data as Record<string, unknown>
    );
    const markdown = parsed.content.trim();

    return {
      slug,
      frontMatter,
      markdown,
    };
  });

  // Sort by date desc (YYYY-MM-DD lexical sorting works)
  posts.sort((a, b) => b.frontMatter.date.localeCompare(a.frontMatter.date));

  return posts;
}

export function loadPublishedSummaries(): BlogPostSummary[] {
  const posts = loadPosts();

  return posts
    .filter((p) => p.frontMatter.published)
    .map((p) => ({
      slug: p.slug,
      title: p.frontMatter.title,
      date: p.frontMatter.date,
      description: p.frontMatter.description,
      tags: p.frontMatter.tags ?? [],
      coverImageUrl: toCoverImageUrl(p.frontMatter.cover_image),
      canonicalUrl: p.frontMatter.canonical_url,
    }));
}

export function getPublishedPostBySlug(slug: string): BlogPost | undefined {
  const posts = loadPosts();
  const found = posts.find((p) => p.slug === slug);
  if (!found) return undefined;
  if (!found.frontMatter.published) return undefined;
  return found;
}
