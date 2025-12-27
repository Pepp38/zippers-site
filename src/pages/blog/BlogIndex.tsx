import { Link } from "react-router-dom";
import { getAllPostsSorted } from "../../blog/posts";
import "../../styles/blog.css";

function formatDate(dateISO: string): string {
  // keep it simple: YYYY-MM-DD
  return dateISO;
}

export function BlogIndex() {
  const posts = getAllPostsSorted();

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
                  <span>{formatDate(p.dateISO)}</span>
                </div>
                <p className="blogExcerpt">{p.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
