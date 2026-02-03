import { Link } from "react-router-dom";
import { solutionDocs } from "../../../content/solutions/solutions";
import "../../../styles/blog.css";

export function SolutionsIndex() {
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
          <div className="blogContent">
            <h1>Solutions</h1>
            <p className="blogMuted">
              Pages built around symptoms developers search for. Short, practical, and focused.
            </p>

            <hr />

            <ul>
              {solutionDocs.map((s) => (
                <li key={s.slug}>
                  <Link to={`/solutions/${s.slug}`}>{s.title}</Link>
                  <div className="blogMuted">{s.summary}</div>
                </li>
              ))}
            </ul>

            <hr />

            <p>
              <Link to="/learn">Back to Learn</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
