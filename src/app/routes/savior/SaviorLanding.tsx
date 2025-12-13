export function SaviorLanding() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm opacity-70">Savior by Zippers</p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          Automatic Form Draft Recovery
        </h1>

        <p className="mt-4 max-w-2xl text-lg opacity-80">
          A tiny, dependency-free autosave engine for HTML forms. It restores what users typed
          after refresh, navigation, tab close, or crashes.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a className="rounded-xl bg-black px-5 py-3 text-white" href="#install">
            Get started
          </a>

          <a
            className="rounded-xl border px-5 py-3"
            href="https://github.com/Pepp38/Savior"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>

        <div id="install" className="mt-12 rounded-2xl border p-5">
          <p className="text-sm opacity-70">Install</p>
          <pre className="mt-2 overflow-x-auto rounded-xl bg-zinc-950 p-4 text-sm text-white">
            <code>npm i @zippers/savior</code>
          </pre>
        </div>
      </section>
    </main>
  );
}
