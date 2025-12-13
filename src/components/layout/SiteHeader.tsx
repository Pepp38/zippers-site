export function SiteHeader() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3 text-sm font-semibold">
          <div
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center rounded-xl font-extrabold"
            style={{
              background:
                'linear-gradient(135deg, rgb(var(--zippers-green)), rgb(var(--zippers-blue)))',
              color: '#032014',
            }}
          >
            Z
          </div>

          <div>
            Savior <span className="opacity-60">by Zippers</span>
          </div>
        </div>

        <nav className="flex gap-4 text-sm opacity-80">
          <a href="#features" className="hover:opacity-100">Features</a>
          <a href="#how-it-works" className="hover:opacity-100">How it works</a>
          <a href="#install" className="hover:opacity-100">Install</a>
          <a href="#faq" className="hover:opacity-100">FAQ</a>
        </nav>
      </div>
    </header>
  );
}
