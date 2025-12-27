import { Link, useParams } from "react-router-dom";
import { getPostBySlug } from "../../blog/posts";
import "../../styles/blog.css";

export function BlogPost() {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="blogShell">
        <div className="blogContainer">
          <div className="blogTop">
            <Link className="blogHomeLink" to="/blog">← Back to Blog</Link>
            <span className="blogBadge">Not found</span>
          </div>
          <h1 className="blogH1">Post not found</h1>
          <div className="blogRule" />
          <p className="blogMuted">This URL doesn’t match any post slug.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blogShell">
      <div className="blogContainer">
        <div className="blogTop">
          <Link className="blogHomeLink" to="/blog">← Back to Blog</Link>
          <span className="blogBadge">{post.dateISO}</span>
        </div>

        <h1 className="blogH1">{post.title}</h1>
        <div className="blogRule" />

        <article
          className="blogArticle"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>
    </div>
  );
}
