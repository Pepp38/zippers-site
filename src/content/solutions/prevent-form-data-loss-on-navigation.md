
---
title: Prevent Form Data Loss on Navigation
slug: prevent-form-data-loss
type: solution
intent: fix
---

# Prevent Form Data Loss on Navigation

**Problem Summary**  
Your users fill out a long form, then accidentally click a link, close the tab, or reload the page. When they come back — the form is blank. You want to prevent this kind of silent data loss without relying on fragile confirm dialogs.

**Quick Fix Overview**  
Instead of blocking navigation, **Savior** takes a different approach: it autosaves input fields as the user types, using `localStorage`, and restores them automatically when they return. No nags, no modals — just instant draft recovery.

## Code Example

Install Savior:
```bash
npm install @zippers/savior
```

Add the autosave marker to your form:
```html
<form data-savior>
  <input name="subject" placeholder="Subject" />
  <textarea name="content" placeholder="Content..."></textarea>
</form>
```

Init Savior in your JavaScript:
```js
import Savior from '@zippers/savior';

Savior.init({ selector: 'form[data-savior]' });
```

If the user navigates away and returns — even days later — their data is still there.

## What It Covers / What It Doesn’t

- ✅ Drafts survive refresh, navigation, crashes, tab close  
- ✅ Automatically cleared on submit  
- ✅ No alerts or confirmations — recovery is silent  
- ✅ Works across routes in SPAs or multipage apps  

- ❌ Doesn’t prevent the navigation itself  
- ❌ Doesn’t sync across tabs/devices  
- ❌ Doesn’t track server-side save state  

## Why Not Use `onbeforeunload` or Alerts?

You can, but it’s brittle:
- Confirm dialogs are often blocked or ignored by browsers
- They interrupt the user flow
- They don’t help if the user *does* navigate — data is still lost

**Savior solves the core problem** by recovering the data, not trying to stop the action.

## Next Step
Try it in your app: [GitHub](https://github.com/Pepp38/Savior) or [Zippers.dev](https://zippers.dev).  
One line of code = no more lost inputs on accidental navigation.
