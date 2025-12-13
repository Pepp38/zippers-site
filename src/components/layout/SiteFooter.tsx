export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm opacity-70">
        <p>© {new Date().getFullYear()} Zippers</p>
        <p className="mt-1">Savior is built under the Zippers ecosystem.</p>
      </div>
    </footer>
  );
}
