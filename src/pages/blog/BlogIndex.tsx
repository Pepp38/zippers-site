import { Link } from "react-router-dom";
import { getAllPostsSorted } from "../../blog/posts";
import "../../styles/blog.css";

function formatDate(dateISO: string): string {
  const dt = new Date(`${dateISO}T00:00:00`);
  return dt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BlogIndex() {
  const posts = getAllPostsSorted();

  return (
    <div className="blogShell">
      <header className="blogHeader">
        <div className="blogIndexTop">
          <Link className="blogIndexBack" to="/">
            ← Back to Zippers
          </Link>
        </div>

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

        <div className="blogMeta">A quiet library of long-form notes.</div>
      </header>

      <div className="blogDivider" />

      <main className="blogMain">
        <div className="blogLibrary">
          <ul className="blogLibraryList">
            {posts.map((p) => (
              <li key={p.slug} className="blogLibraryItem">
                <div className="blogLibraryRow">
                  <div className="blogLibraryLeft">
                    <div className="blogLibraryTitle">{p.title}</div>
                    <div className="blogLibraryMeta">{formatDate(p.dateISO)}</div>
                    <p className="blogLibraryExcerpt">{p.excerpt}</p>
                  </div>
                  <div className="blogLibraryRight">
                    <Link className="blogLibraryRead" to={`/blog/${p.slug}`}>
                      Read
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
