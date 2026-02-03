# Preserve React Form Data After Page Reload

**Problem Summary**  
You’ve got a form in a React app. The user fills it out, but then accidentally reloads the tab or navigates away — and everything’s gone. Re-typing, support tickets, and frustration follow.

**Quick Fix Overview**  
Use **Savior**, a form draft recovery utility that works perfectly inside React apps — without being tied to React. It autosaves any form (including controlled/uncontrolled ones), persists input state using `localStorage`, and restores fields after reloads or crashes. No provider, no hook, no context.

## Code Example

Install Savior:
```bash
npm install @zippers/savior
```

Update your form markup:
```jsx
<form data-savior>
  <input name="name" placeholder="Name" />
  <textarea name="bio" placeholder="Bio"></textarea>
</form>
```

Initialize once at app startup:
```js
import Savior from '@zippers/savior';

Savior.init({ selector: 'form[data-savior]' });
```

It works seamlessly inside React, Next.js, Vite, etc.

## What It Covers / What It Doesn’t

- ✅ Preserves field data across reloads or crashes  
- ✅ Clears on form submit  
- ✅ Doesn’t interfere with your React state or hooks  
- ✅ Works with React Router, SPAs, SSR  

- ❌ Doesn’t save non-input elements (file inputs, custom widgets)  
- ❌ Doesn’t track derived state (e.g. computed validation)  
- ❌ Doesn’t sync across devices or tabs  

## Why Not Just Use useEffect + localStorage?

You could. But you’d need to:
- manually hook into each input’s `onChange`
- write restore logic in `useEffect`
- debounce storage writes
- manage draft cleanup on submit

**Savior handles all that.** You focus on the form logic — not the recovery boilerplate.

## Next Step
See examples on [GitHub](https://github.com/Pepp38/Savior) or read the docs on [Zippers.dev](https://zippers.dev).  
Savior integrates in seconds — even in large React apps.
