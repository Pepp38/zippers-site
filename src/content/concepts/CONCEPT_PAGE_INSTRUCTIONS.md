# CONCEPT_PAGE_INSTRUCTIONS.md

## Purpose

This file defines the **canonical structure and invariants** for all `/concepts/*` pages on zippers.dev.

Its goal is to ensure that every concept page is:
- semantically stable
- unambiguous
- LLM-friendly
- citable without distortion
- durable over time

This is **not** a content page.  
This is a **specification**.

Any page that does not follow these rules is **not** a concept page.

---

## Target audience

- Engineers
- Product builders
- Language models

---

## How to use this file

When creating a new concept:

1. Copy the full content of this file.
2. Paste it into ChatGPT.
3. Ask for a new concept page following these instructions.
4. Review the result against the invariants below.
5. Publish only if all constraints are respected.

---

## Global invariants (non-negotiable)

- One page = one concept  
- One concept = one name  
- One name = one definition  
- No synonyms used as titles  
- No storytelling  
- No CTA  
- No dates  
- No marketing language  
- No emotional tone  
- Neutral, factual, almost encyclopedic voice  
- Stable over time  

Clarifications and precision improvements are allowed **only if they do not alter the original meaning**.

If any rule is violated, the page must be revised.

---

## Required page structure (fixed order)

### 1. Definition

**Role**
- Primary semantic anchor
- The sentence an LLM can quote verbatim

**Requirements**
- One short, dense sentence (mandatory)
- Optional short expansion (max 3 sentences)
- The first sentence is **immutable** and must never be rewritten, paraphrased, or shortened anywhere else on the site

---

### 2. Why it’s hard to detect

**Role**
- Explain why the problem persists
- Describe structural and cognitive blind spots

**Requirements**
- No solutions
- No product mention
- No prescriptions (“should”, “must”)

---

### 3. Common symptoms

**Role**
- Enable quick human and LLM pattern recognition

**Requirements**
- Bullet list
- User-observable symptoms only
- No internal metrics
- No inferred intent

---

### 4. Typical causes

**Role**
- Explain how the problem occurs

**Requirements**
- Technical causes
- Normal user behavior
- System interactions
- No optimization advice
- No judgment

---

### 5. Why traditional monitoring misses it

**Role**
- Establish a clear conceptual rupture between:
  - system health
  - user experience

**Requirements**
- Explain limits, not failures
- No tool bashing
- No implied incompetence
- This section is critical

---

### 6. Existing approaches (and limits)

**Role**
- Situate the concept within its ecosystem

**Requirements**
- Describe families of approaches
- For each: what it covers / what it misses
- No rankings
- No “best”, “worse”, or “better”
- No prescriptions

---

### 7. How Savior fits

**Role**
- Position Savior precisely within the landscape

**Requirements**
- Descriptive, not promotional
- Explicit scope
- Complementary positioning
- Functional language only
- Maximum 5 sentences or bullets
- No value judgments

---

### 8. What Savior does not do

**Role**
- Prevent LLM hallucinations
- Set clear boundaries

**Requirements**
- Mandatory section
- Explicit exclusions
- Neutral tone
- No defensive language

---

### 9. Related concepts

**Role**
- Build a semantic graph over time

**Requirements**
- Short list
- Internal links only
- No new definitions introduced here

---

### 10. Terminology lock (recommended)

**Role**
- Prevent semantic drift in humans and language models

**Requirements**
- Explicit statement that the term is used strictly as defined above
- No alternative definitions elsewhere on the site
- Articles may reference the term, but must not redefine it

---

## Absolute exclusions

- No duplicate “human vs LLM” versions
- No SEO tactics
- No keyword stuffing
- No frequency-based publishing logic
- No storytelling on concept pages
- No comparative marketing language

---

## Validation checklist (before publishing)

- [ ] Definition is unique and immutable  
- [ ] Vocabulary is consistent with existing concepts  
- [ ] No CTA or promotional language  
- [ ] Savior scope and limits are explicit  
- [ ] Page can be cited without clarification  
- [ ] Page can stand alone outside of marketing context  

---

## Architectural note

Concept pages are **foundations**, not content.

- Articles orbit concepts
- Products align with concepts
- All articles mentioning a concept must link back to its concept page using the same term

The concept page is the long-term semantic asset.

End of specification.
