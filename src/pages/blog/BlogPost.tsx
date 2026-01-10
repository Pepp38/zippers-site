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
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="blogShell">
        <header className="blogHeader">
          <Link className="blogBrandLink" to="/blog">
            <span className="blogBrandMark" aria-hidden>
              {/* Temporary inline brand mark (replace later) */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 7.5C6 6.12 7.12 5 8.5 5H18.5C19.88 5 21 6.12 21 7.5V16.5C21 17.88 19.88 19 18.5 19H8.5C7.12 19 6 17.88 6 16.5V7.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M3 9V15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="blogBrandText">Zippers Blog</span>
          </Link>

          <div className="blogMeta">Not found</div>
        </header>

        <div className="blogDivider" />

        <main className="blogMain">
          <div className="blogArticle">
            <p className="blogMuted">This URL doesn’t match any post slug.</p>
          </div>
        </main>
      </div>
    );
  }

  const dateLong = formatDateLongEnUS(post.dateISO);

  return (
    <div className="blogShell">
      <header className="blogHeader">
        <Link className="blogBrandLink" to="/blog">
          <span className="blogBrandMark" aria-hidden>
            {/* Temporary inline brand mark (replace later) */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 7.5C6 6.12 7.12 5 8.5 5H18.5C19.88 5 21 6.12 21 7.5V16.5C21 17.88 19.88 19 18.5 19H8.5C7.12 19 6 17.88 6 16.5V7.5Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M3 9V15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="blogBrandText">Zippers Blog</span>
        </Link>

        <div className="blogMeta">
          {post.authorName} · {dateLong} · {post.readingTimeText}
        </div>
      </header>

      <div className="blogDivider" />

      <main className="blogMain">
        <div className="blogArticle">
          <div className="blogMicrohook">{post.microhook}</div>
          <h1 className="blogH1">{post.title}</h1>

          <blockquote className="blogQuote">
            <p className="blogQuoteText">{post.quoteText}</p>
            <footer className="blogQuoteAuthor">{post.quoteAuthor}</footer>
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
