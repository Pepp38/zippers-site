import { saviorContent } from '../../../content/savior';
import { TrySaviorDemo } from "../../../components/savior/TrySaviorDemo";
import { SiteHeader } from '../../../components/layout/SiteHeader';
import { SiteFooter } from '../../../components/layout/SiteFooter';
import { Section } from '../../../components/layout/Section';

const SHOW_TRY_SAVIOR = false;

export function SaviorLanding() {
  const { hero, problem, features, howItWorks, install, demo, reliability, links, faq } = saviorContent;

  return (
    <div className="app-shell">
      <div className="card-shell">
      <SiteHeader />
      <div className="card-shell-inner">
        <main>
        <Section id="top">
          

          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            {hero.title}
          </h1>

          <p className="mt-4 max-w-2xl text-lg opacity-80">
            {hero.subtitle}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {hero.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border px-3 py-1 text-sm opacity-80"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
            className="btn-primary rounded-xl px-5 py-3 font-semibold"
            href={hero.ctaPrimary.href}
          >
            {hero.ctaPrimary.label}
          </a>

            <a
              className="rounded-xl border px-5 py-3"
              href={hero.ctaSecondary.href}
              target="_blank"
              rel="noreferrer"
            >
              {hero.ctaSecondary.label}
            </a>
          </div>
        </Section>

        <Section className="section-tint">
          <h2 className="text-2xl font-semibold">{problem.title}</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {problem.bullets.map((item) => (
              <li key={item} className="rounded-2xl border px-4 py-3 opacity-90">
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="features">
          <h2 className="text-2xl font-semibold">{features.title}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {features.items.map((item) => (
              <li key={item} className="rounded-2xl border px-4 py-3 opacity-90">
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="how-it-works" className="section-tint">
        <TrySaviorDemo />

          <h2 className="text-2xl font-semibold">{howItWorks.title}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {howItWorks.steps.map((step) => (
              <div key={step.title} className="rounded-2xl border p-5">
                <p className="text-sm opacity-60">Step</p>
                <h3 className="mt-2 font-semibold">{step.title}</h3>
                <p className="mt-2 opacity-80">{step.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="install">
          <h2 className="text-2xl font-semibold">{install.title}</h2>

          <pre className="mt-4 overflow-x-auto rounded-2xl bg-zinc-950 p-4 text-sm text-white">
            <code>{install.command}</code>
          </pre>

          <h3 className="mt-8 font-semibold">{install.snippetTitle}</h3>
          <pre className="mt-3 overflow-x-auto rounded-2xl bg-zinc-950 p-4 text-sm text-white">
            <code>{install.snippet}</code>
          </pre>
        </Section>

        {SHOW_TRY_SAVIOR && (
          <Section className="section-tint">
            <h2 className="text-2xl font-semibold">{demo.title}</h2>
            <p className="mt-3 max-w-2xl opacity-80">{demo.note}</p>

            <div className="mt-6 rounded-2xl border p-5">
              <TrySaviorDemo />
            </div>
          </Section>
        )}

        <Section>
          <h2 className="text-2xl font-semibold">{reliability.title}</h2>

          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {reliability.bullets.map((item) => (
              <li key={item} className="rounded-2xl border px-4 py-3 opacity-90">
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            {reliability.links.map((link) => (
              <a
                key={link.href}
                className="rounded-xl border px-5 py-3 text-sm hover:opacity-100 opacity-90"
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </Section>

        <Section className="section-tint">
          <h2 className="text-2xl font-semibold">{links.title}</h2>

          <ul className="mt-4 space-y-3">
            {links.items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 underline-offset-4 hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="faq">
          <h2 className="text-2xl font-semibold">{faq.title}</h2>

          <div className="mt-6 grid gap-4">
            {faq.items.map((item) => (
              <details key={item.q} className="rounded-2xl border p-5">
                <summary className="cursor-pointer font-semibold">
                  {item.q}
                </summary>
                <p className="mt-3 opacity-80">{item.a}</p>
              </details>
            ))}
          </div>
        </Section>
      </main>
        <SiteFooter />
      </div>
      </div>
    </div>
  );
}
