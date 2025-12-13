export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-10 text-sm opacity-70 sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} Savior. Built under the Zippers ecosystem.</p>

        <div className="flex gap-4">
          <a className="hover:opacity-100" href="https://github.com/Pepp38/Savior" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="hover:opacity-100" href="https://www.npmjs.com/package/@zippers/savior" target="_blank" rel="noreferrer">
            NPM
          </a>
        </div>
      </div>
    </footer>
  );
}
