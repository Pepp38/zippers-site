import { Link, useParams } from "react-router-dom";
import { getPublishedPostBySlug } from "../../blog/loadPosts";
import "../../styles/blog.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function BlogPost() {
  const { slug } = useParams();
  const post = slug ? getPublishedPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="blogShell blogPostPage">
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

  const coverImageUrl = post.frontMatter.cover_image
    ? `${import.meta.env.BASE_URL}${post.frontMatter.cover_image.replace(/^\/+/, "")}`
    : undefined;

  return (
    <div className="blogShell blogPostPage">
      <div className="blogContainer">
        <div className="blogTop">
          <Link className="blogHomeLink" to="/blog">← Back to Blog</Link>
          <span className="blogBadge">{post.frontMatter.date}</span>
        </div>

        <h1 className="blogH1">{post.frontMatter.title}</h1>
        <div className="blogRule" />

        {coverImageUrl ? (
          <img
            className="blogCover"
            src={coverImageUrl}
            alt={post.frontMatter.title}
            loading="lazy"
          />
        ) : null}
        
        <article className="blogArticle">
          <div className="blogProse">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.markdown}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
}
