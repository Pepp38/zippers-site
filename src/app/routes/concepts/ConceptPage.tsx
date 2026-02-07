import { Link, useParams, useNavigate } from "react-router-dom";
import { getConceptBySlug } from "../../../content/concepts/concepts";
import "../../../styles/blog.css";

export function ConceptPage() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const concept = slug ? getConceptBySlug(slug) : undefined;

  if (!concept) {
    return (
      <div className="blogShell">
        <main className="blogMain">
          <div className="blogArticle">
            <p className="blogMuted">This URL doesn’t match any concept slug.</p>
            <p>
              <Link to="/">Back to home</Link>
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="blogShell">
      <header className="blogHeader">
        <Link className="blogBrandLink" to="/" aria-label="Zippers">
          <span className="blogLogoBadge">Zippers</span>
        </Link>
      </header>

      <div className="blogDivider" />

      <main className="blogMain">
        <div className="blogArticle">
          <article
            className="blogContent"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              const anchor = target.closest("a") as HTMLAnchorElement | null;
              if (!anchor) return;

              const href = anchor.getAttribute("href");
              if (!href) return;

              // internal SPA navigation
              if (href.startsWith("/")) {
                e.preventDefault();
                navigate(href);
              }
            }}
            dangerouslySetInnerHTML={{ __html: concept.contentHtml }}
          />
        </div>
      </main>
    </div>
  );
}
