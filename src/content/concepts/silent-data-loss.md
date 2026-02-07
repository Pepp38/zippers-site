# Silent Data Loss

## 1. Definition

**Silent data loss** is the loss of user-entered data that occurs without errors, warnings, or observable system failures, leaving no explicit signal to either the user or the system.

It typically occurs during normal interaction flows.  
From the system’s perspective, the session ends cleanly.  
From the user’s perspective, previously entered data disappears.

---

## 2. Why it’s hard to detect

Silent data loss produces no explicit technical failure.  
There is no exception, no crash, and no invalid state from the system’s point of view.

User abandonment is indistinguishable from normal exit behavior.  
The absence of feedback creates a structural blind spot where loss events leave no trace.

---

## 3. Common symptoms

- A form resets after a page refresh or navigation  
- Previously entered fields appear empty without explanation  
- Multi-step flows restart unexpectedly  
- Users stop interacting mid-process without visible errors  
- Sessions end without visible completion or confirmation  

---

## 4. Typical causes

- Page reloads triggered by navigation or scroll behavior  
- Browser lifecycle events on mobile devices  
- Tab closure or background eviction  
- Network interruptions during client-side interaction  
- Client-side state not persisted across reloads  
- Previously persisted state restored in an invalid or incomplete form  

---

## 5. Why traditional monitoring misses it

Monitoring systems focus on system-level signals such as errors, crashes, and performance regressions.  
Silent data loss does not violate these signals.

From the system’s perspective, the interaction completes without incident.  
From the user’s perspective, effort is lost.  
The divergence between system health and user experience remains unobserved.

---

## 6. Existing approaches (and limits)

- **Server-side persistence**  
  Covers submitted data but not in-progress input.

- **Session-based state**  
  Depends on session continuity and fails across reloads or crashes.

- **Framework-level form handling**  
  Manages validation and state but often resets on lifecycle events.

- **Legacy autosave mechanisms**  
  Provide partial coverage and are frequently brittle or incomplete.

Each approach addresses part of the interaction surface while leaving gaps during interruptions.

---

## 7. How Savior fits

Savior operates at the client level by persisting user-entered form data locally during interaction and restoring it after reloads or interruptions.  
It does not replace server persistence or backend validation systems.  
It complements existing application architecture by covering in-progress user input.

---

## 8. What Savior does not do

- It does not guarantee form submission.  
- It does not prevent user abandonment.  
- It does not infer user intent or satisfaction.  
- It does not replace backend validation, business logic, or data storage.  

---

## 9. Related concepts

- [Safe State Recovery](/concepts/safe-state-recovery)  
- Fail-soft systems  
- Recovery-first design  
- User-facing failures  
- In-progress state persistence  

---

## 10. Terminology lock

The term **silent data loss** is used strictly as defined in this document.  
No alternative definitions, interpretations, or synonymous uses of this term exist elsewhere on this site.

Articles may reference the term, but must not redefine or expand it beyond this definition.
