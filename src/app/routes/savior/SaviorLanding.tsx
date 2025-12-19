import { LandingHeader } from "../../../components/layout/LandingHeader";
import { LandingFooter } from "../../../components/layout/LandingFooter";

import { useEffect } from 'react';
import './saviorLanding.css';

export function SaviorLanding() {
  useEffect(() => {
    // Demo-only implementation to illustrate the promise.
    // This is not the actual Savior library.

    const STORAGE_KEY = 'demo:savior:form:draft';

    const formEl = document.getElementById('demoForm') as HTMLFormElement | null;
    const statusLineEl = document.getElementById('statusLine') as HTMLParagraphElement | null;
    const storagePreviewEl = document.getElementById('storagePreview') as HTMLDivElement | null;

    if (!formEl || !statusLineEl || !storagePreviewEl) return;


    // Narrowing for TypeScript
    const statusLine = statusLineEl;
    const storagePreview = storagePreviewEl;

    function readDraft(): Record<string, string> {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return {};
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object') return {};
        return parsed as Record<string, string>;
      } catch {
        return {};
      }
    }

    function writeDraft(draft: Record<string, string>) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    }

    function setStatus(text: string) {
      statusLine.innerHTML = `Status: <strong>${text}</strong>`;
    }

    function refreshPreview() {
      const draft = readDraft();
      storagePreview.textContent = JSON.stringify(draft, null, 2);
    }

    function restoreDraftIntoForm() {
      const draft = readDraft();
      const textEl = document.getElementById('demoText') as HTMLTextAreaElement | null;
      const emailEl = document.getElementById('demoEmail') as HTMLInputElement | null;
      const passwordEl = document.getElementById('demoPassword') as HTMLInputElement | null;

      if (!textEl || !emailEl || !passwordEl) return;

      textEl.value = draft.message ?? '';
      emailEl.value = draft.email ?? '';

      // Password is intentionally not restored.
      passwordEl.value = '';

      setStatus('restored from storage');
      refreshPreview();
    }

    let saveTimerId = window.setTimeout(() => {}, 0);

    function scheduleSave() {
      window.clearTimeout(saveTimerId);

      saveTimerId = window.setTimeout(() => {
        const textEl = document.getElementById('demoText') as HTMLTextAreaElement | null;
        const emailEl = document.getElementById('demoEmail') as HTMLInputElement | null;
        const passwordEl = document.getElementById('demoPassword') as HTMLInputElement | null;

        if (!textEl || !emailEl || !passwordEl) return;

        // Exclude password fields by design (explicit no-op)
        passwordEl.value = passwordEl.value;

        writeDraft({
          message: textEl.value,
          email: emailEl.value,
        });

        setStatus('saved (password ignored)');
        refreshPreview();
      }, 350);
    }

    function clearDraft() {
      localStorage.removeItem(STORAGE_KEY);
      setStatus('draft cleared');
      refreshPreview();
    }

    // Init
    restoreDraftIntoForm();

    const onInput = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Never save passwords.
      if (target.getAttribute('type') === 'password') {
        setStatus('password input ignored');
        return;
      }

      scheduleSave();
    };

    const btnRestore = document.getElementById('btnRestore') as HTMLButtonElement | null;
    const btnSimulateReload = document.getElementById('btnSimulateReload') as HTMLButtonElement | null;
    const btnClear = document.getElementById('btnClear') as HTMLButtonElement | null;

    formEl.addEventListener('input', onInput);
    btnRestore?.addEventListener('click', restoreDraftIntoForm);
    btnSimulateReload?.addEventListener('click', () => {
      setStatus('simulating reload');
      restoreDraftIntoForm();
    });
    btnClear?.addEventListener('click', () => {
      // Mimic submit behavior: clear draft.
      clearDraft();
    });

    refreshPreview();

    return () => {
      window.clearTimeout(saveTimerId);
      formEl.removeEventListener('input', onInput);
      btnRestore?.removeEventListener('click', restoreDraftIntoForm);
      // note: anonymous fn cannot be removed reliably; keep it simple by not removing or refactor if needed
      // For now, OK because landing isn't repeatedly mounted/unmounted in normal use.
    };
  }, []);

  return (
    <>
      <LandingHeader
  brandLabel="SAVIOR"
  links={[
    { label: "Try", href: "#try" },
    { label: "By design", href: "#by-design" },
    { label: "Coverage", href: "#coverage" },
    { label: "Install", href: "#install" },
  ]}
/>

<header>
  <div className="wrap">
    <div className="hero">
      <h1>
        Stop losing <span>user input</span>.
      </h1>
      <p className="lead">
        You already know the bug. A refresh, a crash, a tab closed too fast, and everything is gone. Savior silently saves form input and restores it when
        things break. No backend. No dependencies. Drop it in and forget about it.
      </p>

      <div className="actions">
        <a className="primary" href="#install">
          Install
        </a>
        <a className="secondary" href="#">
          View on GitHub
        </a>
      </div>

      <div className="trust">
        <span>Dependency-free</span>
        <span>Local-first</span>
        <span>Works with any form</span>
      </div>
    </div>
  </div>
</header>


      <main>
        <section id="try">
          <div className="wrap">
            <p className="kicker">Try it</p>
            <h2 className="section-title">Lose input. Reload. Get it back.</h2>
            <p className="section-sub">
              Type something, then refresh the page. Your text comes back. Password fields are ignored by design.
            </p>

            <div className="grid">
              <div className="card">
                <form id="demoForm" autoComplete="off">
                  <label htmlFor="demoText">Message</label>
                  <textarea id="demoText" name="message" placeholder="Write a few lines, then hit Refresh..." />

                  <label htmlFor="demoEmail">Email</label>
                  <input id="demoEmail" name="email" type="email" placeholder="name@domain.com" />

                  <label htmlFor="demoPassword">Password (not saved)</label>
                  <input id="demoPassword" name="password" type="password" placeholder="This field will not be stored" />

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
                  This demo uses the same idea: debounced saves to browser storage, scoped per form, with password fields excluded. A senior dev can verify
                  everything in DevTools.
                </p>

                <div className="code" aria-label="Storage preview">
                  <span className="dim">storage key</span>
                  <div>demo:savior:form:draft</div>
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
                  These are the defaults people expect. You can still override behavior when you need it.
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
            <p className="section-sub">Lightweight, honest scope. Enough to build trust without turning the landing into a test report.</p>

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
                  If a field is sensitive, you should be able to exclude it. Password is excluded by default.
                </p>
              </div>

              <div className="card">
                <details open>
                  <summary style={{ cursor: 'pointer', fontWeight: 650, color: 'var(--text)' }}>Tested behaviors (high level)</summary>
                  <div className="hint" style={{ marginTop: '0.8rem' }}>
                    The point is not “100% coverage”. The point is: the failure modes you care about are explicitly tested.
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
                  Want the exact list of automated + manual scenarios. Link it in docs or GitHub under <strong>Tests</strong>.
                </p>
                <div className="row">
                  <a className="btn" href="#">
                    Open tests
                  </a>
                  <a className="btn" href="#">
                    Manual suite
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
            <p className="section-sub">Install the package, then attach Savior to a form. That is it.</p>

            <div className="grid">
              <div className="card">
                <div className="code" aria-label="Install command">
                  <div>npm i @zippers/savior</div>
                </div>

                <div className="code" aria-label="Usage snippet" style={{ marginTop: '1rem' }}>
                  <div>
                    <span className="dim">// JS</span>
                  </div>
                  <div>import &#123; Savior &#125; from '@zippers/savior'</div>
                  <div>&nbsp;</div>
                  <div>const formEl = document.querySelector('form')</div>
                  <div>const savior = new Savior(&#123; form: formEl &#125;)</div>
                  <div>savior.init()</div>
                </div>

                <p className="hint" style={{ marginTop: '1rem' }}>
                  Works with any form, any framework. No markup changes required.
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

                <p className="hint" style={{ marginTop: '1.2rem' }}>
                  Want edge cases, multi-form, drivers, or customization. Head to docs.
                </p>
                <div className="row">
                  <a className="btn" href="#">
                    Open docs
                  </a>
                  <a className="btn" href="#">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter text="© Savior. Local-first draft recovery for forms." />

    </>
  );
}
