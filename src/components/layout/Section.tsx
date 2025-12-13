import { ReactNode } from 'react';

type SectionProps = {
  id?: string;
  children: ReactNode;
};

export function Section({ id, children }: SectionProps) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-20">
      {children}
    </section>
  );
}
