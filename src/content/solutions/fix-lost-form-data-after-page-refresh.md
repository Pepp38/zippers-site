# Fix Lost Form Data After Page Refresh

**Problem Summary**  
Accidentally refreshing or closing a page wipes out any unsaved form inputs, frustrating users and causing lost work. Each refresh or crash means retyping data or support tickets — a bad user experience.

**Quick Fix Overview**  
For an instant solution, use **Savior**, a tiny, dependency-free JavaScript library that prevents users from losing form input when pages refresh, tabs close, or browsers crash. It hooks into your form and auto-saves each field to `localStorage`. On load it restores the saved values, and on a successful submit it clears the draft. Setup takes just a couple of lines of code.

## Code Example

Install and initialize Savior:
```bash
npm install @zippers/savior
```

Add the `data-savior` attribute to your form:
```html
<form data-savior>
  <input name="email" placeholder="Email" />
  <textarea name="message" placeholder="Message"></textarea>
  <!-- …other fields… -->
</form>
```

Then in your JavaScript entry point:
```js
import Savior from '@zippers/savior';
Savior.init({ selector: 'form[data-savior]' });
```

## What It Covers / What It Doesn’t

**Covers:**  
- Auto-saving all form fields so drafts survive reloads, navigation or browser crashes  
- Handles dynamic form changes and multiple forms on the same page (each form’s draft is isolated)  
- Automatically clears saved data on successful submit  

**Doesn’t cover:**  
- Server/cloud sync or multi-device sharing (it’s fully client-side)  
- File uploads or encryption — only standard input fields  
- One draft per form, browser-only (LocalStorage/SessionStorage)

## Why Not DIY

You could write your own `localStorage` autosave, but it’s easy to miss edge cases. Savior already handles real-world quirks — e.g. corrupted JSON, fields added/removed after init, multiple forms, partial submits, storage limits — so you don’t have to reinvent all that.

## Next Step
For complete docs and examples, see the [Savior GitHub repo](https://github.com/Pepp38/Savior) or the project site ([zippers.dev](https://zippers.dev)).  
Savior is free, open source, and built for production.
