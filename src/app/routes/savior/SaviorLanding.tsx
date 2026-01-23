import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { LandingFooter } from '../../../components/layout/LandingFooter';
import { LandingHeader } from '../../../components/layout/LandingHeader';
import { saviorContent } from '../../../content/savior';
import './saviorLanding.css';

const DEMO_STORAGE_KEY = 'demo:savior:form:draft';

type DraftPayload = {
  message?: string;
  email?: string;
};

function safeReadDraft(): DraftPayload {
  try {
    const raw = localStorage.getItem(DEMO_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return {};
    return parsed as DraftPayload;
  } catch {
    return {};
  }
}

function safeWriteDraft(payload: DraftPayload): void {
  try {
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Demo only: ignore storage write errors.
  }
}

function safeClearDraft(): void {
  try {
    localStorage.removeItem(DEMO_STORAGE_KEY);
  } catch {
    // Demo only: ignore storage errors.
  }
}

function isPasswordTarget(target: HTMLElement): boolean {
  return target.getAttribute('type') === 'password';
}

export function SaviorLanding() {
  useEffect(() => {
    document.body.classList.add('savior-landing');

    const formEl = document.getElementById('demoForm');
    const statusLineEl = document.getElementById('statusLine');
    const storagePreviewEl = document.getElementById('storagePreview');

    if (!(formEl instanceof HTMLFormElement)) {
      return () => document.body.classList.remove('savior-landing');
    }
    if (!(statusLineEl instanceof HTMLParagraphElement)) {
      return () => document.body.classList.remove('savior-landing');
    }
    if (!(storagePreviewEl instanceof HTMLDivElement)) {
      return () => document.body.classList.remove('savior-landing');
    }

    const textEl = document.getElementById('demoText');
    const emailEl = document.getElementById('demoEmail');
    const passwordEl = document.getElementById('demoPassword');

    if (!(textEl instanceof HTMLTextAreaElement)) {
      return () => document.body.classList.remove('savior-landing');
    }
    if (!(emailEl instanceof HTMLInputElement)) {
      return () => document.body.classList.remove('savior-landing');
    }
    if (!(passwordEl instanceof HTMLInputElement)) {
      return () => document.body.classList.remove('savior-landing');
    }

    const btnRestoreEl = document.getElementById('btnRestore');
    const btnSimulateReloadEl = document.getElementById('btnSimulateReload');
    const btnClearEl = document.getElementById('btnClear');

    const btnRestore = btnRestoreEl instanceof HTMLButtonElement ? btnRestoreEl : null;
    const btnSimulateReload =
      btnSimulateReloadEl instanceof HTMLButtonElement ? btnSimulateReloadEl : null;
    const btnClear = btnClearEl instanceof HTMLButtonElement ? btnClearEl : null;

    let saveTimerId: number | null = null;

    const setStatus = (text: string) => {
      statusLineEl.innerHTML = `Status: <strong>${text}</strong>`;
    };

    const refreshPreview = () => {
      const draft = safeReadDraft();
      storagePreviewEl.textContent = JSON.stringify(draft, null, 2);
    };

    const restoreDraftIntoForm = () => {
      const draft = safeReadDraft();

      textEl.value = draft.message ?? '';
      emailEl.value = draft.email ?? '';

      // Password is intentionally never stored or restored.
      passwordEl.value = '';

      setStatus('restored from storage');
      refreshPreview();
    };

    const scheduleSave = () => {
      if (saveTimerId !== null) window.clearTimeout(saveTimerId);

      saveTimerId = window.setTimeout(() => {
        safeWriteDraft({
          message: textEl.value,
          email: emailEl.value,
        });

        setStatus('saved (password ignored)');
        refreshPreview();
      }, 350);
    };

    const clearDraft = () => {
      safeClearDraft();
      setStatus('draft cleared');
      refreshPreview();
    };

    const onInput = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (isPasswordTarget(target)) {
        setStatus('password input ignored');
        return;
      }

      scheduleSave();
    };

    const onSimulateReload = () => {
      setStatus('simulating reload');
      restoreDraftIntoForm();
    };

    // Init
    restoreDraftIntoForm();
    refreshPreview();

    // Wire events
    formEl.addEventListener('input', onInput);
    btnRestore?.addEventListener('click', restoreDraftIntoForm);
    btnSimulateReload?.addEventListener('click', onSimulateReload);
    btnClear?.addEventListener('click', clearDraft);

    return () => {
      document.body.classList.remove('savior-landing');

      if (saveTimerId !== null) window.clearTimeout(saveTimerId);

      formEl.removeEventListener('input', onInput);
      btnRestore?.removeEventListener('click', restoreDraftIntoForm);
      btnSimulateReload?.removeEventListener('click', onSimulateReload);
      btnClear?.removeEventListener('click', clearDraft);
    };
  }, []);

  useEffect(() => {
    const navHeader = document.querySelector('body.savior-landing header.landing-nav');
    const hero = document.getElementById('savior-hero');

    if (!(navHeader instanceof HTMLElement)) return;
    if (!(hero instanceof HTMLElement)) return;

    const onScroll = () => {
      const heroBottom = hero.getBoundingClientRect().bottom;
      navHeader.classList.toggle('is-sticky', heroBottom <= 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const githubUrl = saviorContent.hero.ctaSecondary.href;

  const docsUrl =
    saviorContent.links.items.find((i) => i.label === 'Documentation')?.href ??
    saviorContent.links.items.find((i) => i.label === 'GitHub repository')?.href ??
    githubUrl;

  const testsUrl =
    saviorContent.reliability.links.find((l) => l.label === 'Testing in the repo')?.href ??
    `${githubUrl}#testing`;

  return (
    <>
      <LandingHeader
        brandLabel="SAVIOR"
        links={[
          { label: 'Try', href: '#try' },
          { label: 'By design', href: '#by-design' },
          { label: 'Coverage', href: '#coverage' },
          { label: 'Install', href: '#install' },
          { label: 'SafeState Recovery', href: '/products/safestate-recovery' },
          { label: 'Blog', href: '/blog' },
        ]}
      />

<header className="savior-hero" id="savior-hero">
  <div className="wrap">
    <div className="hero">
      <h1>
        Stop losing <span>user input</span> to common failures.
      </h1>

      <p className="lead">
        You already know the bug. A refresh, a crash, a tab closed too fast, and everything is gone.
        Savior saves form input locally and restores it after common interruptions — without a backend
        and without dependencies. Drop it in. Know what gets saved, and what is intentionally ignored.
      </p>

      <div className="hero-meta">
        <div className="savior-badges">
          <span className="savior-badge savior-badge--core">
            Savior Core <span className="savior-badge__muted">free · open source (MIT)</span>
          </span>

          <span className="savior-badge savior-badge--pro">
            SafeState Recovery <span className="savior-badge__muted">paid · optional</span>
          </span>

          <span className="savior-badge savior-badge--neutral">
            Use either, or both
          </span>
        </div>
      </div>


      <div className="actions">
        <a className="primary" href={saviorContent.hero.ctaPrimary.href}>
          {saviorContent.hero.ctaPrimary.label}
        </a>

        <a
          className="secondary"
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          {saviorContent.hero.ctaSecondary.label}
        </a>
      </div>

      <div className="trust">
        <span>Open-source core (MIT)</span>
        <span>Optional paid recovery</span>
        <span>Local-first</span>
        <span>No backend</span>
      </div>
    </div>
  </div>
</header>

      <main>
        <section id="try">
          <div className="wrap">
            <p className="kicker">Try it</p>
            <h2 className="section-title">Type. Reload. Restore your draft.</h2>
            <p className="section-sub">
              Type something, then refresh the page. Your draft is restored. Password fields are
              ignored by design.
            </p>

            <div className="grid">
              <div className="card">
                <form id="demoForm" autoComplete="off">
                  <label htmlFor="demoText">Message</label>
                  <textarea
                    id="demoText"
                    name="message"
                    placeholder="Write a few lines, then hit Refresh..."
                  />

                  <label htmlFor="demoEmail">Email</label>
                  <input id="demoEmail" name="email" type="email" placeholder="name@domain.com" />

                  <label htmlFor="demoPassword">Password (not saved)</label>
                  <input
                    id="demoPassword"
                    name="password"
                    type="password"
                    placeholder="This field will not be stored"
                  />

                  <div className="row">
                    <button className="btn primary" type="button" id="btnRestore">
                      Restore draft
                    </button>
                    <button className="btn" type="button" id="btnSimulateReload">
                      Simulate reload
                    </button>
                    <button className="btn danger" type="button" id="btnClear">
                      Clear draft
                    </button>
                  </div>

                  <p className="hint" id="statusLine">
                    Status: <strong>waiting</strong>
                  </p>
                </form>
              </div>

              <div className="card">
                <div className="list">
                  <div className="pill ok">Textarea saved</div>
                  <div className="pill ok">Text and email saved</div>
                  <div className="pill no">Password ignored</div>
                </div>

                <p className="hint" style={{ marginTop: '1.2rem' }}>
                  This demo is intentionally minimal: it illustrates the storage pattern (debounced
                  writes, per-form scoping, safe exclusions). For production behavior and edge-case
                  handling, see the repo and tests.
                </p>

                <div className="row">
                  <a className="btn" href={testsUrl} target="_blank" rel="noreferrer">
                    Open tests
                  </a>
                  <a className="btn" href={githubUrl} target="_blank" rel="noreferrer">
                    Open repo
                  </a>
                </div>

                <div className="code" aria-label="Storage preview">
                  <span className="dim">storage key</span>
                  <div>{DEMO_STORAGE_KEY}</div>
                  <br />
                  <span className="dim">saved json</span>
                  <div id="storagePreview">{'{}'}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="by-design">
          <div className="wrap">
            <p className="kicker">By design</p>
            <h2 className="section-title">Sensible defaults, not surprises.</h2>
            <p className="section-sub">A few decisions that remove risk and reduce support tickets.</p>

            <div className="grid">
              <div className="card">
                <div className="list">
                  <div className="pill ok">No backend. Everything stays in the browser.</div>
                  <div className="pill ok">Password fields are never saved.</div>
                  <div className="pill ok">Storage is scoped per form.</div>
                  <div className="pill ok">Submit clears the draft.</div>
                </div>

                <p className="hint" style={{ marginTop: '1.2rem' }}>
                  Savior Core is intentionally best-effort. It optimizes for low-friction
                  persistence, not guaranteed recovery under every failure mode.
                </p>
              </div>

              <div className="card">
                <p className="hint" style={{ margin: '0 0 0.8rem 0' }}>
                  The goal is boring reliability.
                </p>
                <div className="code">
                  <span className="dim">principle</span>
                  <div>protect users from accidental loss</div>
                  <br />
                  <span className="dim">result</span>
                  <div>fewer tickets, fewer angry emails</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="coverage">
          <div className="wrap">
            <p className="kicker">Coverage</p>
            <h2 className="section-title">What gets saved. What is tested.</h2>
            <p className="section-sub">
              Lightweight, explicit scope. Enough to build trust without turning the landing into a
              test report.
            </p>

            <div className="grid">
              <div className="card">
                <p className="hint" style={{ margin: '0 0 0.9rem 0' }}>
                  <strong>Covered field types</strong>
                </p>

                <div className="list">
                  <div className="pill ok">text</div>
                  <div className="pill ok">textarea</div>
                  <div className="pill ok">email</div>
                  <div className="pill ok">select</div>
                  <div className="pill ok">checkbox / radio</div>
                  <div className="pill ok">number</div>
                  <div className="pill no">password (ignored)</div>
                </div>

                <p className="hint" style={{ marginTop: '1.2rem' }}>
                  If a field is sensitive, you should be able to exclude it. Password is excluded by
                  default.
                </p>
              </div>

              <div className="card">
                <details open>
                  <summary
                    style={{ cursor: 'pointer', fontWeight: 650, color: 'var(--text)' }}
                  >
                    Tested behaviors (high level)
                  </summary>

                  <div className="hint" style={{ marginTop: '0.8rem' }}>
                    The point is not “100% coverage”. The point is: the failure modes you care about
                    are explicitly tested.
                  </div>

                  <div className="list" style={{ marginTop: '1rem' }}>
                    <div className="pill ok">restore on load</div>
                    <div className="pill ok">refresh / navigation resilience</div>
                    <div className="pill ok">corrupted storage JSON</div>
                    <div className="pill ok">driver failure handling</div>
                    <div className="pill ok">submit clears draft</div>
                    <div className="pill ok">password excluded</div>
                  </div>
                </details>

                <p className="hint" style={{ marginTop: '1.2rem' }}>
                  Want the exact list of automated and manual scenarios? See <strong>Tests</strong>{' '}
                  in the repo.
                </p>

                <div className="row">
                  <a className="btn" href={testsUrl} target="_blank" rel="noreferrer">
                    Open tests
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="install">
          <div className="wrap">
            <p className="kicker">Install</p>
            <h2 className="section-title">Drop it in.</h2>
            <p className="section-sub">
              Install the package, attach Savior to a form, and you’re done.
            </p>

            <div className="grid">
              <div className="card">
                <div className="stack">
                  <div className="code" aria-label="Install command">
                    <div>{saviorContent.install.command}</div>
                  </div>

                  <div className="code" aria-label="Usage snippet">
                    <div>
                      <span className="dim">// JS</span>
                    </div>
                    <div>import Savior from '@zippers/savior'</div>
                    <div>&nbsp;</div>
                    <div>const result = Savior.init(&#123; selector: 'form[data-savior]' &#125;);</div>
                    <div>if (!result.ok) &#123;</div>
                    <div>&nbsp;&nbsp;console.warn('Savior init failed:', result.reason);</div>
                    <div>&#125;</div>
                  </div>
                </div>

                <p className="hint" style={{ marginTop: '1rem' }}>
                  Works with any form, any framework. Minimal markup required.
                </p>
              </div>

              <div className="card">
                <p className="hint" style={{ margin: '0 0 1rem 0' }}>
                  What you get:
                </p>

                <div className="list">
                  <div className="pill ok">Debounced autosave</div>
                  <div className="pill ok">Draft restore on load</div>
                  <div className="pill ok">Safe exclusions</div>
                </div>

                <p className="hint" style={{ marginTop: '1rem' }}>
                  Open-source (MIT). Free to use.
                </p>

                <p className="hint" style={{ marginTop: '1.2rem' }}>
                  Want edge cases, multi-form, drivers, or customization? Head to docs.
                </p>

                <div className="row">
                  <a className="btn" href={docsUrl} target="_blank" rel="noreferrer">
                    Open docs
                  </a>
                  <a className="btn" href={githubUrl} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="safestate">
          <div className="wrap">
            <p className="kicker">SafeState Recovery</p>
            <h2 className="section-title">Controlled recovery for failure scenarios.</h2>
            <p className="section-sub">
              SafeState Recovery adds a stricter, deterministic recovery layer for incidents, edge
              cases, and corrupted storage.
            </p>

            <div className="row">
              <Link className="btn" to="/products/safestate-recovery">
                See SafeState Recovery
              </Link>
            </div>
          </div>
        </section>

        <LandingFooter text="© Savior Core. Local-first autosave for HTML forms." />
      </main>
    </>
  );
}
