import { Link } from "react-router-dom";
import { conceptDocs } from "../../../content/concepts/concepts";
import "../../../styles/blog.css";

export function ConceptIndex() {
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
            <h1>Concepts</h1>
            <p className="blogMuted">
              Evergreen mental models that explain the failure patterns behind modern web forms.
            </p>

            <hr />

            <ul>
              {conceptDocs.map((c) => (
                <li key={c.slug}>
                  <Link to={`/concepts/${c.slug}`}>{c.title}</Link>
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
