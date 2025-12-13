export const saviorContent = {
  hero: {
    title: 'Automatic Form Draft Recovery',
    subtitle:
      'A tiny, dependency-free autosave engine for HTML forms. It restores what users typed after refresh, navigation, tab close, or crashes.',
    badges: ['No backend', 'Dependency-free', 'Local-first', 'Works with any form'],
    ctaPrimary: { label: 'Get started', href: '#install' },
    ctaSecondary: { label: 'GitHub', href: 'https://github.com/Pepp38/Savior' },
  },

  problem: {
    title: 'Built for the moments when things break',
    bullets: ['Accidental refresh', 'Closed tab', 'Browser crash', 'Unintended navigation'],
  },

  features: {
    title: 'Features',
    items: [
      'Debounced autosave',
      'Crash-safe restore',
      'Pluggable storage drivers',
      'Zero backend, zero account',
      'Simple API',
      'Small footprint',
    ],
  },

  howItWorks: {
    title: 'How it works',
    steps: [
      { title: 'Observe form inputs', body: 'Savior listens to changes across form fields.' },
      { title: 'Persist drafts (debounced)', body: 'Drafts are saved with a configurable debounce delay.' },
      { title: 'Restore on load', body: 'When users return, the latest draft is restored.' },
    ],
  },

  install: {
    title: 'Install',
    command: 'npm i @zippers/savior',
    snippetTitle: 'Minimal usage',
    snippet: `import Savior from '@zippers/savior';

Savior.init({
  selector: 'form[data-savior]',
});`,
  },

  demo: {
    title: 'Demo',
    note: 'Install it, type in a form, refresh the page. The draft should come back. No backend.',
    assetPath: '',
    placeholderText: '',
  },

  reliability: {
    title: 'Reliability',
    bullets: [
      'Designed to fail gracefully when storage is unavailable or full',
      'Corrupted JSON protection',
      'Automated tests plus manual crash scenarios',
    ],
    links: [{ label: 'Testing in the repo', href: 'https://github.com/Pepp38/Savior#testing' }],
  },

  links: {
    title: 'Docs & Links',
    items: [
      { label: 'GitHub repository', href: 'https://github.com/Pepp38/Savior' },
      { label: 'NPM package', href: 'https://www.npmjs.com/package/@zippers/savior' },
      { label: 'Documentation', href: 'https://github.com/Pepp38/Savior#readme' },
      { label: 'Issues', href: 'https://github.com/Pepp38/Savior/issues' },
      { label: 'Discussions', href: 'https://github.com/Pepp38/Savior/discussions' },
    ],
  },

  faq: {
    title: 'FAQ',
    items: [
      { q: 'Does it require a backend?', a: 'No. Savior is local-first and stores drafts in web storage by default.' },
      { q: 'Can I use sessionStorage?', a: 'Yes. Savior supports pluggable drivers, including sessionStorage.' },
      { q: 'Does it work with frameworks?', a: 'Yes. It is framework-agnostic as long as you target standard HTML forms.' },
      { q: 'How do I avoid saving sensitive fields?', a: 'Exclude fields (example: password) or filter by name/type based on your setup.' },
      { q: 'What about multiple forms?', a: 'Savior can handle multiple forms as long as your selector targets them properly.' },
    ],
  },
};
