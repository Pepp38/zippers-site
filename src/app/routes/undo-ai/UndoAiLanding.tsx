import { useEffect } from "react";
import { LandingHeader } from "../../../components/layout/LandingHeader";
import { LandingFooter } from "../../../components/layout/LandingFooter";
import "./undoAiLanding.css";

export function UndoAiLanding() {
  useEffect(() => {
    document.body.classList.add("undoai-landing");

    const navHeader = document.querySelector("body.undoai-landing header.landing-nav");
    const hero = document.getElementById("undoai-hero");

    if (!(navHeader instanceof HTMLElement)) return;
    if (!(hero instanceof HTMLElement)) return;

    const onScroll = () => {
      const heroBottom = hero.getBoundingClientRect().bottom;
      navHeader.classList.toggle("is-sticky", heroBottom <= 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      document.body.classList.remove("undoai-landing");
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <LandingHeader
        brandLabel="UNDO-AI"
        links={[
          { label: "How", href: "#how" },
          { label: "Not", href: "#not" },
          { label: "Early access", href: "#cta" },
          { label: "Savior", href: "/savior" },
          { label: "Blog", href: "/blog" },
        ]}
      />

      <header className="undoai-hero" id="undoai-hero">
        <div className="wrap">
          <div className="hero-grid">
            <div className="hero">
              <div className="kicker">
                <span className="pill pill--new">New</span>
                <span className="kicker-text">A safety tool for the post-AI world</span>
              </div>

              <h1>
                Undo any <span>AI action</span> in one click.
              </h1>

              <p className="lead">
                AI now has write access. Mistakes can be fast, massive, and sometimes irreversible.
                Undo-AI wraps an AI action with a snapshot and a deterministic undo.
              </p>

              <div className="actions">
                <a className="primary" href="#cta">
                  Join early access
                </a>
                <a className="secondary" href="#how">
                  See how it works
                </a>
              </div>

              <div className="trust">
                <span>Non-AI. Deterministic by design.</span>
                <span>Vendor-agnostic.</span>
                <span>Local-first defaults.</span>
              </div>
            </div>

            <div className="hero-card">
              <div className="card">
                <div className="card-head">
                  <div className="card-title">The red button</div>
                  <div className="card-sub">Snapshot • Apply • Restore</div>
                </div>

                <div className="card-block">
                  <div className="card-block-title">AI action</div>
                  <div className="card-block-text">
                    “Rewrite the release notes and update the pricing copy.”
                  </div>
                </div>

                <div className="steps">
                  <div className="step">
                    <div className="step-dot">✓</div>
                    <div>
                      <div className="step-title">Snapshot before apply</div>
                      <div className="step-text">Capture the relevant state you choose.</div>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-dot">✓</div>
                    <div>
                      <div className="step-title">Apply AI changes</div>
                      <div className="step-text">Your code applies the result, as usual.</div>
                    </div>
                  </div>
                  <div className="step">
                    <div className="step-dot">✓</div>
                    <div>
                      <div className="step-title">Undo deterministically</div>
                      <div className="step-text">Restore to the exact snapshot state.</div>
                    </div>
                  </div>
                </div>

                <div className="divider" />

                <div className="guard">
                  <div className="guard-title">Irreversibility Guards</div>
                  <div className="guard-text">
                    Declare actions that can’t be undone (emails, webhooks, remote mutations) and add
                    deliberate friction.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="section" aria-label="Problem">
        <div className="wrap">
          <div className="cards-3">
            <div className="mini-card">
              <div className="mini-title">The risk changed</div>
              <div className="mini-text">
                Agents and copilots can now write, mutate, and trigger chains of actions.
              </div>
            </div>
            <div className="mini-card">
              <div className="mini-title">Ctrl+Z is local</div>
              <div className="mini-text">
                Focus-dependent, volatile, blind to side effects and distributed actions.
              </div>
            </div>
            <div className="mini-card mini-card--highlight">
              <div className="mini-title">Undo should be explicit</div>
              <div className="mini-text">
                If an action is wrapped, it becomes reversible by design, with guards for the rest.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="how" aria-label="How it works">
        <div className="wrap">
          <div className="section-head">
            <h2>How it works</h2>
            <p>Three primitives. No magic.</p>
          </div>

          <div className="cards-3">
            <div className="mini-card">
              <div className="mini-title">Snapshot</div>
              <div className="mini-text">
                Capture the relevant state right before applying AI changes. Scope is your choice.
              </div>
            </div>
            <div className="mini-card">
              <div className="mini-title">Apply</div>
              <div className="mini-text">
                Run your normal apply code. Undo-AI doesn’t inspect content or model outputs.
              </div>
            </div>
            <div className="mini-card">
              <div className="mini-title">Restore</div>
              <div className="mini-text">
                Restore deterministically to the snapshot. Persist snapshots via Savior if you want
                crash-safe behavior.
              </div>
            </div>
          </div>

          <div className="callout">
            <div>
              <div className="callout-title">Persistence is intentionally not part of Undo-AI</div>
              <div className="callout-text">
                For crash-safe persistence, plug in Savior Core or SafeState Recovery. Undo-AI stays
                sharp.
              </div>
            </div>
            <div className="callout-actions">
              <a className="secondary" href="/concepts/undo-ai">
                Read the concept
              </a>
              <a className="primary" href="#cta">
                Get updates
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="not" aria-label="What it is not">
        <div className="wrap">
          <div className="section-head">
            <h2>What it is not</h2>
            <p>Clear limits build trust.</p>
          </div>

          <div className="cards-2">
            {[
              "Not an AI model, not tied to OpenAI, Anthropic, or anyone else",
              "Not a SaaS platform. No accounts required",
              "Not a probabilistic detector (no style guessing)",
              "Not a giant framework. Small, composable primitives",
            ].map((t) => (
              <div className="mini-card" key={t}>
                <div className="mini-title">✓</div>
                <div className="mini-text">{t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-cta" id="cta" aria-label="Early access">
        <div className="wrap">
          <div className="cta-card">
            <div className="cta-left">
              <h3>Early access</h3>
              <p>
                We validate demand before building heavy. If you want Undo-AI in your stack, leave a
                signal.
              </p>
              <div className="cta-pills">
                <span className="pill">One-time purchase</span>
                <span className="pill">GitHub invite delivery</span>
                <span className="pill">No DRM</span>
              </div>
            </div>

            <div className="cta-right">
              <div className="cta-form-title">Leave your email</div>
              <div className="cta-form-sub">We only contact you for Undo-AI milestones.</div>

              <div className="cta-form">
                <input type="email" placeholder="you@company.com" />
                <button type="button" className="cta-btn">
                  Notify me
                </button>
              </div>

              <div className="cta-tip">Tip: include a one-liner about your use case.</div>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter text="Undo-AI is a Zippers tool. Local-first by default. Safety over hype." />
    </>
  );
}
