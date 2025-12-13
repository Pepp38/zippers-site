import { saviorContent } from '../../../content/savior';

export function SaviorLanding() {
  const { hero, install } = saviorContent;

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm opacity-70">Savior by Zippers</p>

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
            className="rounded-xl bg-black px-5 py-3 text-white"
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

        <div id="install" className="mt-12 rounded-2xl border p-5">
          <p className="text-sm opacity-70">{install.title}</p>
          <pre className="mt-2 overflow-x-auto rounded-xl bg-zinc-950 p-4 text-sm text-white">
            <code>{install.command}</code>
          </pre>
        </div>
      </section>
    </main>
  );
}
