export type BlogFrontMatter = {
  title: string;
  published: boolean;
  description: string;
  tags?: string[]; // normalized into string[]
  cover_image?: string; // recommended relative: "blog/covers/xxx.jpg"
  canonical_url?: string;
  date: string; // YYYY-MM-DD
};

export type BlogPost = {
  slug: string;
  frontMatter: BlogFrontMatter;
  markdown: string;
};

export type BlogPostSummary = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  description: string;
  tags: string[];
  coverImageUrl?: string;
  canonicalUrl?: string;
};
