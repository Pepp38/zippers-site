# Autosave Form Data with JavaScript (No Framework Required)

**Problem Summary**  
You want to autosave a user’s input as they type, using plain JavaScript — no frameworks, no build tools. The goal: if the tab crashes or reloads, the form content is still there when they come back.

**Quick Fix Overview**  
Use **Savior**, a minimal JavaScript library that listens to input changes and saves them in `localStorage`. It restores the values automatically on page load, and clears the draft when the user submits the form. No framework, no config — just native autosave.

## Code Example

Install Savior:
```bash
npm install @zippers/savior
```

Apply the `data-savior` attribute to your form:
```html
<form data-savior>
  <input name="title" placeholder="Post title" />
  <textarea name="body" placeholder="Write something..."></textarea>
</form>
```

Initialize Savior in your JavaScript:
```js
import Savior from '@zippers/savior';

Savior.init({ selector: 'form[data-savior]' });
```

## What It Covers / What It Doesn’t

- ✅ Works in plain HTML/JS — no framework needed  
- ✅ Tracks changes to all input fields and saves them live  
- ✅ Restores field values on reload or crash  
- ✅ Clears saved values when form is submitted  

- ❌ Doesn’t persist files or passwords  
- ❌ Doesn’t sync across tabs or devices  
- ❌ Doesn’t encrypt saved data — use for non-sensitive input only  

## Why Not Just Use `localStorage` Yourself?

You can. But you’ll need to wire up:
- input listeners for each field
- field restoration logic on load
- change detection, namespacing, cleanup
- corrupted data edge cases

**Savior handles all of that for you.**

## Next Step
Check out [GitHub](https://github.com/Pepp38/Savior) or [Zippers.dev](https://zippers.dev) for full documentation and examples.  
Savior is small, safe, and built for production use.
