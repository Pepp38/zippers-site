import type { ReactNode } from 'react';

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-6xl px-6 py-20 ${className ?? ''}`.trim()}
    >
      {children}
    </section>
  );
}
