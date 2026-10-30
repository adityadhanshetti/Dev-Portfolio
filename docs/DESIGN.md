# DESIGN.md — Portfolio Design System (v2)

> Source of truth for look, feel and structure. Motion lives in `ANIMATION.md`; the interactive personality page lives in `PERSONALITY.md`. If code and these files disagree, the files win. Change the file first, then the code.

---

## 1. Concept: "Quiet signal, loud details"

A dark, editorial, readable portfolio that behaves like a **session**, not a brochure. It borrows the tone of Aditya's own product (Sentinel Layer): it quietly *reads* you, scores you, and rewards curiosity.

**The two-layer rule (the most important rule in this file):**
- **Layer 1, the readable layer:** big type, short sentences, every chapter understandable in 5 seconds with all effects off.
- **Layer 2, the delight layer:** parallax, React Bits effects, cursor play, the interactive `/me` page. Layer 2 can fail, be disabled or be skipped, and the site is still complete.

This is how we get "award-winning" without becoming unreadable.

### What the research says

| Source | Take |
|---|---|
| **Pacôme Pertant** (Awwwards SOTD, Portfolio of the Month) | "Clean at times, experimental at others." Spiral↔list view toggle, mouse trail, footer scroll transition, audio cues, GSAP ScrollTrigger + SplitText + Three.js |
| **Huy Phan Vol.2** (SOTD Oct 14) | Two colours + one accent, loading sequence, project gallery, case-study pages, GSAP + Three.js |
| **Maria Vasilyeva** (SOTD Oct 9) | Concept-led (music/rhythm), preloader, page transition, scroll-driven about page, annotations |
| **Signal-A Studio** (SOTD Oct 18) | Black/white restraint, cursor replacement, hover scramble, grid accordion |
| **twks** (SOTD Oct 7) | Swiss grid, live studio status, confident statements |
| **Bruno Simon** | Gamified portfolio; proof that a personality-first experience is memorable |
| **Brittany Chiang / similar clean one-pagers** | Proof that readable beats flashy when content is strong |
| **Railway, Versine** | Dark depth, section eyebrows, numbered steps, stats |
| **Ochi** | Intended bold-type reference. *Unverified: the site blocked my fetch. Add your own notes.* |

Takeaway: the winners commit to **one concept**, keep the palette tiny, and put the weirdness in interaction and structure, not in clutter.

---

## 2. Principles

1. **One concept: the session.** Handshake in, chapters, contact out. Everything references it.
2. **Readable first, delightful second** (two-layer rule).
3. **Type is the hero.** Imagery and effects support it.
4. **One accent colour**, ≤ 5% of any screen.
5. **Depth, not decoration.** Parallax and layers must create hierarchy, never noise.
6. **One showpiece per viewport.** Never two attention-grabbers at once.
7. **Fast beats fancy.** Effects degrade gracefully by device.
8. **Everyone gets in.** Keyboard, screen reader, reduced motion, touch, and a **Calm mode** toggle.
9. **Personality is specific.** Real details, real opinions, real humour; no generic "passionate developer".

---

## 3. Structure: chapters, not sections

Not the usual Hero → Projects → About → Contact. The page is a numbered session log with a persistent chapter index (desktop: fixed left rail; mobile: top progress bar + menu).

| # | Chapter | What it is |
|---|---|---|
| 00 | **Handshake** | Preloader as a login handshake: `verifying session… trust 0.97`. ≤ 1.2s, skippable, once per session |
| 01 | **Statement** | Giant headline + one-line role + status. Layered parallax hero with ONE React Bits background |
| 02 | **Case files** | Work as numbered files. **Sentinel Layer** gets a full pinned, oversized treatment; others as a stacking card list. Each opens a case-study page |
| 03 | **How I think** | 3 beliefs / working principles on a layered parallax scene; words fill in as you scroll |
| 04 | **Signal log** | A dated timeline of what I've shipped/learned (real dates only), short horizontal pinned scroll on desktop, vertical list on mobile |
| 05 | **/me — Control Room** | Teaser card leading to the interactive personality page (see `PERSONALITY.md`) |
| 06 | **Sign-off** | Contact as a tiny terminal: email, links, local time, `⌘K` command palette hint |

Persistent UI: chapter rail, live local time + availability dot, **Calm mode** toggle (disables heavy effects, keeps layout), command palette (`⌘K` / `Ctrl+K`).

**Flagship:** Sentinel Layer (live SaaS security product with real clients). Lead with the problem and outcome, then architecture, then visuals. Confirm what's public before publishing numbers.

Case-study page template: hero media, meta row (role, year, stack, links), problem, approach, key decisions, outcome with real numbers, next case file.

---

## 4. Colour

Dark-first. CSS variables only; never hardcode hex in components.

```css
:root {
  --bg:            #0B0B0F;
  --surface-1:     #121217;
  --surface-2:     #1A1A21;
  --line:          rgba(237, 235, 228, 0.10);
  --line-strong:   rgba(237, 235, 228, 0.22);

  --text:          #EDEBE4;
  --text-muted:    #8F8E98;
  --text-faint:    #5C5B64;

  --accent:        #B6FF4A;   /* signal lime */
  --accent-ink:    #0B0B0F;
  --accent-glow:   rgba(182, 255, 74, 0.18);

  --haze-violet:   rgba(110, 91, 255, 0.14);  /* hero / sign-off atmosphere only */
}

:root[data-theme="light"] {
  --bg: #F4F2EC; --surface-1: #EDEAE2; --surface-2: #E4E1D8;
  --line: rgba(11,11,15,.12); --line-strong: rgba(11,11,15,.28);
  --text: #0E0E12; --text-muted: #5F5E66; --text-faint: #8F8E98;
  --accent: #1D6B00; --accent-ink: #F4F2EC; --accent-glow: rgba(29,107,0,.14);
  --haze-violet: rgba(110,91,255,.10);
}
```

Any React Bits component must be **re-themed to these variables** (pass colours as props from tokens). No default rainbow gradients.

---

## 5. Typography

| Role | Font |
|---|---|
| Display | **Bricolage Grotesque** (variable) |
| Body | **Geist** or **Inter Tight** |
| Mono / labels | **Geist Mono** or **JetBrains Mono** |
| Accent serif (optional, max one word per headline) | **Instrument Serif** italic |

```css
--fs-hero:  clamp(3.25rem, 9vw + 1rem, 10rem);   /* lh .92, -0.04em */
--fs-h1:    clamp(2.5rem, 5vw + 1rem, 6rem);
--fs-h2:    clamp(1.75rem, 2.5vw + 1rem, 3.25rem);
--fs-h3:    clamp(1.25rem, 1vw + 1rem, 1.75rem);
--fs-body:  clamp(1rem, 0.3vw + 0.95rem, 1.125rem); /* lh 1.6 */
--fs-label: 0.75rem; /* mono, uppercase, +0.08em */
```

Paragraph max width 62ch. Every chapter opens with a mono eyebrow: `02 / CASE FILES`.

---

## 6. Layout and spacing

- 12-column grid, 24px gutters (16px mobile), max width 1440px; hero and pinned scenes may bleed.
- Spacing scale (4px base): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192. Section padding `clamp(96px, 14vw, 192px)`.
- Hairlines instead of boxes. Radius: 4 (chips, inputs), 12 (cards), 999 (pills).
- Breakpoints: 480 / 768 / 1024 / 1440.
- Chapter rail 56px wide on ≥ 1024px.

---

## 7. Components

- **Button:** primary = accent fill, pill, clip-path wipe on hover; secondary = 1px border. Hit area ≥ 44px. (Magnet effect allowed, desktop only.)
- **Link:** underline grows from left (300ms).
- **Chip:** mono, 1px border, 4px radius.
- **Case-file row/card:** index number, title (display), tags (mono), year. Hover/focus reveals preview; touch = tap through.
- **Status pill:** pulsing dot + `Available for select work` or live local time. Static dot under reduced motion.
- **Chapter rail:** numbers 00–06, active chapter filled, click = smooth scroll, keyboard focusable.
- **Command palette:** `⌘K`; navigate to chapters, copy email, toggle Calm mode, open `/me`, run easter eggs.
- **Calm mode toggle:** persisted in `localStorage` (try/catch). Disables smooth scroll, parallax, WebGL, cursor effects and scrubbed text; keeps simple fades.
- **Terminal block (sign-off):** mono, blinking caret (static under reduced motion), real `mailto:` link, copy button.

---

## 8. Imagery and media

- Stills 16:10 + short muted looped video (≤ 2MB, `playsinline`, lazy, pause off-screen).
- `next/image`, AVIF/WebP, dimensions set, blur placeholder.
- Portrait in monochrome/duotone to fit the palette.
- Parallax images are rendered oversized (scale ≈ 1.15–1.2) inside `overflow: hidden` frames so no gaps appear.
- Alt text on all meaningful images.

---

## 9. Voice

Direct, specific, a little dry. Say what you built and what changed. Hero line is a claim, not a job title (pattern: *"I build security software that quietly protects real users."*). Real numbers only; never invent metrics, clients or testimonials.

---

## 10. Accessibility (non-negotiable)

- WCAG 2.2 AA; visible 2px accent focus ring; skip link; correct heading order and landmarks.
- Smooth scroll must not break keyboard nav, anchors or find-in-page.
- Animated/split text keeps real text in the DOM (`aria-label` on parent, spans `aria-hidden`).
- Every interactive toy on `/me` has a keyboard path and a text alternative.
- `prefers-reduced-motion` and Calm mode are first-class (see `ANIMATION.md`).
- No colour-only meaning; touch targets ≥ 44px; works at 200% zoom.

---

## 11. Performance budgets

| Metric | Target |
|---|---|
| Lighthouse mobile Performance | ≥ 90 |
| LCP | ≤ 2.0s (LCP element = text or ≤ 100KB image, never the WebGL canvas) |
| CLS | ≤ 0.05 |
| INP | ≤ 200ms |
| First-load JS (home) | ≤ 170KB gzip. WebGL/3D chunks load **after** LCP via dynamic import and do not count toward this, but are capped at 250KB gzip total |
| Active WebGL canvases | **1 per route max** |
| React Bits components site-wide | **≤ 8**, each justified in `CHANGELOG.md` |
| Fonts | ≤ 3 families, subset |

If an effect pushes mobile Lighthouse under 90, it falls back to a static version **on mobile only** before it is removed on desktop.

---

## 12. Responsive behaviour

- Designed for mobile, not squeezed: stacked case files, vertical signal log, top progress bar instead of rail.
- Disabled on touch: custom cursor, magnetic buttons, hover previews, mouse parallax, mouse-trail effects. Parallax speeds are cut to ~40% (or off) on small screens.
- Pinned horizontal scenes become vertical lists below 1024px.

---

## 13. Don'ts

- No generic particle backgrounds; no default React Bits look left un-themed.
- No second accent colour.
- No scroll-jacking that traps users or hides content behind long pinned scenes (max 3 pinned scenes site-wide).
- No auto-playing audio (an opt-in sound toggle is allowed in Phase 8).
- No fake data, lorem ipsum or fake testimonials.
- No layout shift from fonts, images, preloader or pinned sections.
- No real visitor fingerprinting or tracking on `/me`; the "trust score" is a client-side toy and must say so.

---

## 14. "Looks right" test

Squint: one focal point per screen, two colours plus one accent, hierarchy from type size alone. Then turn on Calm mode: the site must still look intentional and finished.