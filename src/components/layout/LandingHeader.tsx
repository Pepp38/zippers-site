type LandingLink = { label: string; href: string };

type LandingHeaderProps = {
  brandLabel: string;
  links: LandingLink[];
};

export function LandingHeader({ brandLabel, links }: LandingHeaderProps) {
  return (
    <header>
      <div className="wrap">
        <div className="top">
          <div className="logo">{brandLabel}</div>
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
