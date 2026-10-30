# ANIMATION.md — Motion, Parallax and React Bits

> Companion to `DESIGN.md`. This file owns everything that moves. If it conflicts with a library demo, this file wins.

**Note on React Bits:** the docs site (reactbits.dev) blocked my fetch, so the component names below come from the library's public GitHub description (four categories: text animations, animations, components, backgrounds; 110+ components; shadcn and jsrepo CLI; JS/TS × CSS/Tailwind variants) plus my knowledge of the catalogue. **Before installing anything, open the component's page on reactbits.dev, confirm it exists, check its dependencies (GSAP, Motion, ogl, three) and copy the exact CLI command.**

---

## 1. Motion principles

1. **Depth over decoration.** Motion shows layers, hierarchy and state.
2. **One showpiece per viewport.**
3. **Scroll drives story, cursor drives play.** Scroll = parallax, reveals, pinned scenes. Cursor = hover, magnet, trail, `/me` toys.
4. **Everything has a fallback:** static image, plain fade or nothing.
5. **Budgeted:** ≤ 8 React Bits components, 1 WebGL canvas per route, ≤ 3 pinned scenes.

---

## 2. Stack and wiring

| Tool | Role |
|---|---|
| **GSAP** + ScrollTrigger + SplitText | Scroll-linked and sequenced animation |
| **Lenis** | Smooth scroll, kill-switch flag |
| **Motion** (Framer Motion) | Small React UI state transitions only |
| **React Bits** | Copied into `/components/reactbits/*` via CLI (we own the code), re-themed to tokens |
| **ogl / three** | Only if a chosen React Bits background needs it; lazy-loaded |

Wiring rules:
```ts
// Lenis ↔ ScrollTrigger sync (once, in a client provider)
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```
- Register GSAP plugins once. Create animations inside a cleanup-safe context (`useGSAP` or `gsap.context`) and revert on unmount.
- Call `ScrollTrigger.refresh()` after fonts and images load.
- Flags in `lib/flags.ts`: `SMOOTH_SCROLL, PARALLAX, WEBGL_BG, CURSOR, PRELOADER, PAGE_TRANSITIONS, MAGNET`. Each removable without touching other code.

### Tokens
```ts
export const ease = { out: "power3.out", inOut: "power3.inOut", expo: "expo.out" };
export const dur  = { fast: 0.2, base: 0.5, slow: 0.9, hero: 1.2 };
export const stagger = { chars: 0.015, words: 0.06, lines: 0.1 };
```

---

## 3. Parallax system

### 3.1 Depth layers (scroll parallax)

| Layer | Example | `data-parallax` speed | Notes |
|---|---|---|---|
| Far background | haze / WebGL bg / large faint numerals | `-0.15` | Moves slowest, feels distant |
| Mid | oversized outline type, decorative lines | `0.1` | |
| Content plane | headings, text, cards | `0` | Never parallax body text |
| Near foreground | accent shapes, floating chips, cropped media | `0.25 – 0.4` | Moves fastest |

### 3.2 Implementation pattern
```ts
// Scroll parallax: any element with data-parallax="0.2"
gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
  const speed = parseFloat(el.dataset.parallax ?? "0.2");
  gsap.fromTo(el,
    { yPercent: -speed * 50 },
    { yPercent:  speed * 50, ease: "none",
      scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
});

// Mouse parallax (hero only, desktop only)
const xTo = gsap.quickTo(layer, "x", { duration: 0.6, ease: "power3.out" });
const yTo = gsap.quickTo(layer, "y", { duration: 0.6, ease: "power3.out" });
// on pointermove: xTo((e.clientX/innerWidth - .5) * depth); yTo((e.clientY/innerHeight - .5) * depth)
```

### 3.3 Rules
- `transform` only. Parent frame `overflow: hidden`; media scaled 1.15–1.2 so no gaps show.
- Max 4 parallax layers visible at once. Never parallax paragraphs.
- Small screens: speeds × 0.4 or off. Calm mode / reduced motion: off.
- Don't nest scrubbed triggers inside pinned scenes unless tested.
- Pinned scenes (max 3): Case file #1 (Sentinel Layer), Signal log (desktop only), optional How I think. Always provide `end` that finishes within ~2 viewport heights, never trap the user.

---

## 4. React Bits shortlist (mapped to chapters)

Pick from these; **do not add more without logging why**. Re-theme each with tokens.

| Chapter | Component (React Bits) | Use | Cost | Mobile / fallback |
|---|---|---|---|---|
| 00 Handshake | **Decrypted Text** or **Count Up** | `verifying session… trust 0.97` | Low | Plain text fade |
| 01 Statement | **Split Text** (or Blur Text) | Headline line reveal | Low (GSAP) | Fade-up |
| 01 Statement | **ONE** background: **Silk**, **Aurora**, **Dither** or **Light Rays** | Atmosphere behind hero, tinted `--haze-violet` + accent | **High (WebGL)** | Static gradient image on mobile / Calm |
| 01 Statement | **Shiny Text** | Availability status line | Low | Static |
| 02 Case files | **Scroll Stack** or **Flowing Menu** | Stacking cards / hover-marquee list of projects | Medium | Simple stacked list |
| 02 Case files | **Glare Hover** or **Tilt Card** | Media card hover | Low | None on touch |
| 02, 06 | **Magnet** | CTA buttons | Low | Off on touch |
| 03 How I think | **Scroll Reveal** | Words fill from faint → full as you scroll | Low | Static text |
| 04 Signal log | **Logo Loop** (stack marquee) | Tools strip | Low | Pause when reduced motion |
| 04 | **Count Up** | Real stats only | Low | Final number |
| 05 /me teaser | **Spotlight Card** | Teaser tile | Low | Static |
| 06 Sign-off | **Text Type** / **Shuffle** | Terminal typing line | Low | Static text |
| Global | **Target Cursor** (or Blob Cursor) | Cursor over case files only | Medium | Off on touch / Calm |

`/me` page components are listed in `PERSONALITY.md` (Magic Bento, Click Spark, Pixel Trail / Image Trail, Dot Grid, Variable Proximity, Dock, Profile Card). They count toward the **≤ 8** budget only if used on the home route; `/me` has its own budget of ≤ 6 with 1 canvas.

**Avoid:** Splash Cursor (heavy fluid sim), Ballpit, Hyperspeed, Galaxy and similar showpiece backgrounds. They scream "demo" and hurt mobile.

---

## 5. Chapter choreography

| Chapter | Sequence |
|---|---|
| **00 Handshake** | Mono counter + decrypting text, thin progress line, curtain lifts upward; hero begins as the curtain clears. Skippable (click / key). Total ≤ 1.2s. Skip on repeat visit. |
| **01 Statement** | Headline lines mask-reveal (stagger 0.1) → role line fades → status pill → scroll cue. Background layers drift on scroll (`-0.15`), foreground chips on mouse parallax. |
| **02 Case files** | Index numbers slide in; Sentinel Layer pins while its meta lines swap and a media layer parallaxes; other files stack. Hover: siblings dim, cursor shows `VIEW`, title scrambles once (400ms). |
| **03 How I think** | Three beliefs on a layered scene; words fill with scroll (scrub); outline numerals drift at `0.1`. |
| **04 Signal log** | Horizontal pinned scrub on desktop (dated entries pass through a fixed "scan line"); vertical list on mobile. |
| **05 /me teaser** | Spotlight follows cursor; tile tilts slightly; click triggers page transition. |
| **06 Sign-off** | Typed terminal lines, magnet CTA, footer reveal: page slides up to uncover the sign-off (Pacôme-style footer scroll transition). |
| **Page transitions** | Curtain wipe with accent edge, 600ms, between home ↔ case files ↔ `/me`. |

---

## 6. Performance and safety

- Dynamic-import every React Bits component below the fold; WebGL ones with `ssr: false`, only after first paint / idle.
- WebGL gating: enable only if desktop, `navigator.hardwareConcurrency >= 4`, no reduced motion, not Calm mode, document visible. Cap DPR at 1.5. Pause when off-screen (IntersectionObserver) and when tab hidden.
- Animate only `transform`, `opacity`, `clip-path`. `will-change` only during animation.
- Test on production builds and a real mid-range phone.
- Memory-leak check: navigate home → case file → `/me` → back; no duplicated triggers or canvases (verify in DevTools).

## 7. Reduced motion and Calm mode

`prefers-reduced-motion: reduce` **or** Calm mode toggled on:
- Off: smooth scroll, all parallax, WebGL, custom cursor, magnet, scrubbed text, marquees, scramble, preloader animation (show a static 0.3s fade).
- Kept: simple 150ms opacity fades so state changes are visible; all content and navigation.
- `/me` toys swap to static equivalents (see `PERSONALITY.md`).

## 8. Kill order if performance slips
1. WebGL background → static image
2. Mouse trail / cursor effects
3. Pinned Signal log → vertical list
4. Magnet, tilt, glare
5. Preloader / page transitions

Never cut the readable layer.