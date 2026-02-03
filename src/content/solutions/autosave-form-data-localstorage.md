# Autosave Form Data with localStorage (Without a Framework)

**Problem Summary**  
You want to autosave form input in real time — so if the user closes or reloads the page, their draft is still there. Maybe you’ve done it before with `localStorage`, or you’ve been asked to “make sure we don’t lose anything” again.

**Quick Fix Overview**  
Use **Savior**, a lightweight JavaScript library that saves form fields to `localStorage` as the user types — and restores them automatically if the page is reloaded or the browser crashes. It clears saved data once the form is submitted, and requires no framework or setup. Drop it in, and it just works.

## Code Example

Install Savior:
```bash
npm install @zippers/savior
```

Mark your form with `data-savior`:
```html
<form data-savior>
  <input name="name" placeholder="Full Name" />
  <textarea name="notes" placeholder="Your notes..."></textarea>
</form>
```

Initialize Savior in your JS:
```js
import Savior from '@zippers/savior';

Savior.init({ selector: 'form[data-savior]' });
```

It saves every change into localStorage, keyed per form.

## What It Covers / What It Doesn’t

- ✅ Automatically saves input fields as the user types  
- ✅ Restores values after refresh, crash, tab close  
- ✅ Clears data when form is submitted  
- ✅ Works with multiple forms per page  

- ❌ No sync across tabs or devices (purely local)  
- ❌ Doesn’t persist file inputs or passwords  
- ❌ Doesn’t encrypt — use only for non-sensitive data  

## Why Not Just Use localStorage Yourself?

You can. But you’ll need to handle:
- change listeners on every input
- restore logic on page load
- corrupted values
- dynamic fields (e.g. added by JS)
- field removals, submit clears, storage collisions

**Savior handles all that.** In less than 2 kB, zero dependencies.

## Next Step
Read the full usage guide on [GitHub](https://github.com/Pepp38/Savior) or [Zippers.dev](https://zippers.dev).  
Savior is free, open source, and made for production.
