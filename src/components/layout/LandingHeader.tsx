type LandingLink = { label: string; href: string };

type LandingHeaderProps = {
  brandLabel: string;
  links: LandingLink[];
};

export function LandingHeader({ brandLabel, links }: LandingHeaderProps) {
  return (
    <header className="landing-nav">
      <div className="wrap">
        <div className="top">
          {/* Brand */}
          <div className="logo">
            <span
              style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
              }}
            >
              {brandLabel}
            </span>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                color: 'var(--muted-2)',
              }}
            >
              by Zippers
            </span>
          </div>

          {/* Nav */}
          <nav>
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
