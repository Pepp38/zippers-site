import { Link, useParams } from "react-router-dom";
import { getPostBySlug } from "../../blog/posts";
import { BlogSignature } from "./BlogSignature";
import "../../styles/blog.css";
import { MarkdownFrame } from "../../components/MarkdownFrame";

function formatDateLongEnUS(dateISO: string): string {
  const dt = new Date(`${dateISO}T00:00:00`);
  return dt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  const blogLogoSrc = `${import.meta.env.BASE_URL}zippers-blog-logo.png`;

  // -------------------------
  // Not found / invalid slug
  // -------------------------
  if (!post) {
    return (
      <div className="blogShell">
        <header className="blogHeader">
          <Link className="blogBrandLink" to="/blog" aria-label="Zippers Blog">
            <img src={blogLogoSrc} alt="Zippers Blog" className="blogLogo" />
          </Link>
        </header>


        <div className="blogDivider" />

        <main className="blogMain">
          <div className="blogArticle">
            <p className="blogMuted">
              This URL doesn’t match any post slug.
            </p>
          </div>
        </main>
      </div>
    );
  }

  // -------------------------
  // Normal article rendering
  // -------------------------
  const dateLong = formatDateLongEnUS(post.dateISO);

  return (
    <div className="blogShell">
      <header className="blogHeader">
        <Link
          className="blogBrandLink"
          to="/blog"
          aria-label="Zippers Blog"
        >
          <span className="blogLogoBadge">
            <img
              src={blogLogoSrc}
              alt="Zippers Blog"
              className="blogLogo"
            />
          </span>
        </Link>

      </header>

      <div className="blogDivider" />

      <main className="blogMain">
        <div className="blogArticle">
          <div className="blogMicrohook">{post.microhook}</div>

          <h1 className="blogH1">{post.title}</h1>

          <div className="blogMetaInline">
            <span className="blogAuthor">{post.author.name}</span>
            <span aria-hidden="true">·</span>
            <span>{dateLong}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readingTimeText}</span>
          </div>

          <blockquote className="blogQuote">
            <p className="blogQuoteText">{post.quoteText}</p>
            <footer className="blogQuoteAuthor">
              {post.quoteAuthor}
            </footer>
          </blockquote>

          <MarkdownFrame className="blogContent">
            <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          </MarkdownFrame>
          <BlogSignature />

        </div>
      </main>
    </div>
  );
}
