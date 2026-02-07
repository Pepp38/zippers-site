# Silent Data Loss

## Definition

**Silent data loss** is the loss of user-entered data that occurs without errors, warnings, or observable system failures, leaving no explicit signal to either the user or the system.

It typically occurs during normal interaction flows.  
From the system’s perspective, the session ends cleanly.  
From the user’s perspective, previously entered data disappears.

Silent data loss is not caused by crashes or explicit failures.  
It emerges from ordinary behavior.

---

## Why it’s hard to detect

Silent data loss produces no explicit technical failure.

There is no exception, no crash, and no invalid state from the system’s point of view.

User abandonment is indistinguishable from normal exit behavior.  
The absence of feedback creates a structural blind spot where loss events leave no trace.

As a result, silent data loss is invisible to most monitoring systems.

---

## Common symptoms

Silent data loss often manifests as subtle, user-facing inconsistencies.

- A form resets after a page refresh or navigation  
- Previously entered fields appear empty without explanation  
- Multi-step flows restart unexpectedly  
- Users stop interacting mid-process without visible errors  
- Sessions end without confirmation or completion  

The system appears healthy.  
The user experience is not.

---

## Typical causes

Silent data loss is usually the result of lifecycle or persistence gaps.

- Page reloads triggered by navigation or browser behavior  
- Browser lifecycle events on mobile devices  
- Tab closure or background eviction  
- Network interruptions during client-side interaction  
- Client-side state not persisted across reloads  
- Persisted state restored in an invalid or incomplete form  

In many cases, data briefly exists but is lost during transition or restoration.

---

## Why traditional monitoring misses it

Monitoring systems are designed to observe system-level signals.

- Errors  
- Crashes  
- Performance regressions  

Silent data loss does not violate these signals.

From the system’s perspective, the interaction completes normally.  
From the user’s perspective, effort is lost.

This divergence between system health and user experience remains unobserved.

---

## Existing approaches (and limits)

Common strategies partially address the problem but leave gaps.

- **Server-side persistence**  
  Covers submitted data, not in-progress input.

- **Session-based state**  
  Depends on session continuity and fails across reloads or crashes.

- **Framework-level form handling**  
  Manages validation and UI state but often resets on lifecycle events.

- **Legacy autosave mechanisms**  
  Provide partial coverage and are frequently brittle or incomplete.

Each approach protects a portion of the interaction surface while leaving interruption paths exposed.

---

## How Savior fits

Savior operates at the client level by persisting user-entered form data locally during interaction and restoring it after reloads or interruptions.

It does not replace server persistence or backend validation.  
It complements existing application architecture by protecting **in-progress user input**.

Savior is concerned with continuity, not submission.

---

## What Savior does not do

Savior has intentionally limited scope.

- It does not guarantee form submission  
- It does not prevent user abandonment  
- It does not infer user intent or satisfaction  
- It does not replace backend validation, business logic, or data storage  

Its role is narrowly defined: reduce silent loss of in-progress data.

---

## Relationship to Safe State Recovery

[Safe State Recovery](/concepts/safe-state-recovery) addresses a different but related failure mode.

Silent data loss focuses on **input that disappears without signals**.  
Safe State Recovery focuses on **state that exists but cannot be safely restored**.

The two intersect when:

- Corrupted state is discarded silently  
- Invalid snapshots are ignored without notice  
- Users re-enter data that technically still exists  

Without recovery guarantees, silent data loss often occurs during restoration, not during saving.

---

## Terminology lock

The term **silent data loss** is used strictly as defined in this document.

No alternative definitions, interpretations, or synonymous uses of this term exist elsewhere on this site.

Articles may reference the term, but must not redefine or expand it beyond this definition.
