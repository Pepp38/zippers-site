import { Link } from "react-router-dom";
import { loadPublishedSummaries } from "../../blog/loadPosts";
import "../../styles/blog.css";

function formatDate(dateISO: string): string {
  // keep it simple: YYYY-MM-DD
  return dateISO;
}

export function BlogIndex() {
  const posts = loadPublishedSummaries();

  return (
    <div className="blogShell">
      <div className="blogContainer">
        <div className="blogTop">
          <Link className="blogHomeLink" to="/">← Back to Zippers</Link>
          <span className="blogBadge">Blog</span>
        </div>

        <h1 className="blogH1">Blog</h1>
        <div className="blogRule" />

        <ul className="blogList">
          {posts.map((p) => (
            <li key={p.slug} className="blogListItem">
              <Link className="blogCardLink" to={`/blog/${p.slug}`}>
                <div className="blogPostTitle">{p.title}</div>
                <div className="blogPostMeta">
                  <span>{formatDate(p.date)}</span>
                </div>
                <p className="blogExcerpt">{p.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
