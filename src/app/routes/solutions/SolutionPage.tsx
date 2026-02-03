import { Link, useParams } from "react-router-dom";
import { getSolutionBySlug } from "../../../content/solutions/solutions";
import { MarkdownFrame } from "../../../components/MarkdownFrame";
import "../../../styles/blog.css";

export function SolutionPage() {
  const { slug } = useParams<{ slug: string }>();
  const solution = slug ? getSolutionBySlug(slug) : undefined;

  if (!solution) {
    return (
      <div className="blogShell">
        <main className="blogMain">
          <div className="blogArticle">
            <p className="blogMuted">This URL doesn’t match any solution slug.</p>
            <p>
              <Link to="/learn">Back to Learn</Link>
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
          <MarkdownFrame>
            <div dangerouslySetInnerHTML={{ __html: solution.contentHtml }} />
          </MarkdownFrame>
        </div>
      </main>
    </div>
  );
}
