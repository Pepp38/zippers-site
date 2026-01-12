import { Link, useParams } from "react-router-dom";
import { getPostBySlug } from "../../blog/posts";
import "../../styles/blog.css";

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
          <Link
            className="blogBrandLink"
            to="/blog"
            aria-label="Zippers Blog"
          >
            <img
              src={blogLogoSrc}
              alt="Zippers Blog"
              className="blogLogo"
            />
          </Link>

          <div className="blogMeta">Not found</div>
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
          <img
            src={blogLogoSrc}
            alt="Zippers Blog"
            className="blogLogo"
          />
        </Link>

        <div className="blogMeta">
          {post.author.name} · {dateLong} · {post.readingTimeText}
        </div>
      </header>

      <div className="blogDivider" />

      <main className="blogMain">
        <div className="blogArticle">
          <div className="blogMicrohook">{post.microhook}</div>

          <h1 className="blogH1">{post.title}</h1>

          <blockquote className="blogQuote">
            <p className="blogQuoteText">{post.quoteText}</p>
            <footer className="blogQuoteAuthor">
              {post.quoteAuthor}
            </footer>
          </blockquote>

          <article
            className="blogContent"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </div>
      </main>
    </div>
  );
}
