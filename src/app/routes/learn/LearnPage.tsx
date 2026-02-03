import { Link } from "react-router-dom";
import "../../../styles/blog.css";
import { solutionDocs } from "../../../content/solutions/solutions";
import { conceptDocs } from "../../../content/concepts/concepts";

type HubCard = {
  title: string;
  description: string;
  href: string;
  items: { title: string; href: string }[];
};

export function LearnPage() {
  const latestSolutions = solutionDocs.slice(0, 3).map((s) => ({
    title: s.title,
    href: `/solutions/${s.slug}`,
  }));

  const latestConcepts = conceptDocs.slice(0, 3).map((c) => ({
    title: c.title,
    href: `/concepts/${c.slug}`,
  }));

  // Blog: on pointe vers les 3 posts déjà publiés.
  // Tu pourras remplacer ça par un registry plus tard.
  const latestBlog = [
    { title: "Why Savior exists", href: "/blog/why-savior-exists" },
    { title: "Building reliability tools in public", href: "/blog/building-in-public" },
    { title: "What modern UX silently breaks", href: "/blog/ux-silent-failures" },
  ];

  const cards: HubCard[] = [
    {
      title: "Solutions",
      description: "Fix symptoms fast. Practical pages for real-world failures.",
      href: "/solutions",
      items: latestSolutions,
    },
    {
      title: "Concepts",
      description: "Evergreen mental models behind silent failures and draft loss.",
      href: "/concepts",
      items: latestConcepts,
    },
    {
      title: "Blog",
      description: "Field notes. What I’m building, learning, and shipping.",
      href: "/blog",
      items: latestBlog,
    },
  ];

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
            <h1>Learn</h1>
            <p className="blogMuted">
              One hub. Three paths. Choose how you want to approach reliability.
            </p>

            <hr />

            <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
              {cards.map((c) => (
                <div key={c.title} style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: 14 }}>
                  <h2 style={{ marginTop: 0 }}>
                    <Link to={c.href}>{c.title}</Link>
                  </h2>
                  <p className="blogMuted">{c.description}</p>
                  <ul>
                    {c.items.map((i) => (
                      <li key={i.href}>
                        <Link to={i.href}>{i.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <hr />

            <p className="blogMuted">
              Tip: if you land here from search, jump straight into Solutions.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
