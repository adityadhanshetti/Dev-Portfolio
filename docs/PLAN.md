# PLAN.md — Portfolio Build Plan (Fool-proof Edition)

Companion to `DESIGN.md`. Every phase has **deliverables**, **exit gate** (must pass before moving on) and **rollback** (what to do if it goes wrong). Do not start a phase until the previous gate passes.

**Estimated total:** 3-4 weeks part-time. Ship a good v1 at the end of Phase 6; Phases 7-8 are upgrades.

---

## Decisions locked up front

| Decision | Choice | Why |
|---|---|---|
| Framework | **React.js with JavaScript** | Great perf defaults, easy Vercel deploy, familiar React |
| Styling | **Tailwind CSS** + CSS variables from DESIGN.md | Tokens in one place |
| Motion | **GSAP** (ScrollTrigger, SplitText) + **Lenis**; Motion for tiny UI states | Industry standard for award-style sites |
| 3D | **Optional**, feature-flagged, Phase 8 only | Biggest perf and time risk |
| Content | Typed data files (`/content/*.ts`) or MDX for case studies | No CMS until it hurts |
| Hosting | **Vercel** (frontend, already in your stack) | Preview deploys per branch |
| Analytics | Vercel Analytics (privacy-friendly) | Zero config |

---

## Phase 0: Content and scope (before any code)

**Why first:** most portfolios stall because content isn't ready, not because code is hard.

Deliverables
- [ ] One-sentence positioning (who you are, what you build, for whom)
- [ ] Hero statement (3 candidates, pick 1)
- [ ] 3-5 projects chosen. **Sentinel Layer is flagship.** For each: problem, your role, stack, outcome with real numbers, 1 hero image/video, link if public
- [ ] Short bio (≤120 words), portrait photo
- [ ] Contact email, GitHub, LinkedIn, X/other
- [ ] Decide which numbers you are allowed to show publicly (clients, user counts). Check NDAs and client permission for Sentinel Layer details.

**Exit gate:** a `content/` checklist where every field is filled or explicitly marked placeholder.
**Rollback:** none needed; cut projects to 3 if content is thin. 3 great beats 6 average.

---

## Phase 1: Foundation

Deliverables
- [ ] Repo, Next.js + TS + Tailwind, ESLint, Prettier, strict TS
- [ ] `DESIGN.md` tokens mapped into `globals.css` and `tailwind.config`
- [ ] Fonts via `next/font` (Bricolage Grotesque, Geist/Inter Tight, Geist Mono)
- [ ] Layout shell: nav, footer, skip link, theme attribute, metadata
- [ ] Vercel project connected; main = production, PRs = previews
- [ ] CI: lint + typecheck + build on every push

**Exit gate:** empty shell deploys to a Vercel URL; Lighthouse ≥ 98 on it; no console errors.
**Rollback:** if Tailwind/token wiring gets messy, fall back to plain CSS variables + CSS Modules. Don't fight the tooling.

---

## Phase 2: Static design (no animation yet)

Build every section as a **static, responsive, accessible** page first. Animation is layered on later; this is what makes the site safe.

Deliverables
- [ ] Hero, Work list, How I work (1-2-3), Stats, Stack, About, Closing CTA, Footer
- [ ] Case-study page template with 1 real case study (Sentinel Layer)
- [ ] Reusable components: Button, Link, Chip, StatusPill, Section (with eyebrow), ProjectRow
- [ ] Mobile layouts at 375px, tablet 768px, desktop 1440px, ultra-wide 1920px

**Exit gate:** page is fully usable and good-looking with JS animation turned off; passes axe with 0 critical issues; keyboard-navigable.
**Rollback:** if a section isn't working visually, simplify it. Reduce to type + hairlines; DESIGN.md principle 2.

---

## Phase 3: Motion foundation

Deliverables
- [ ] `lib/motion.ts` with ease/duration/stagger tokens
- [ ] Lenis provider with proper cleanup, anchor-link support, `prefers-reduced-motion` off-switch
- [ ] GSAP registered once; `useGSAP`-style hook with context cleanup (no leaks on route change)
- [ ] `useReducedMotion` + `useIsTouch` + `useIsDesktopCapable` hooks
- [ ] ScrollTrigger refresh strategy after fonts/images load

**Exit gate:** smooth scroll works; navigating between routes doesn't duplicate triggers; reduced-motion mode disables everything specified in DESIGN.md §7a.
**Rollback:** if Lenis causes scroll bugs (anchors, find-in-page, iOS), disable it and keep native scroll. GSAP animations still work without it.

---

## Phase 4: Signature animations

Implement **one at a time**, in this order, committing after each (so any can be reverted alone):

1. Hero headline line-mask reveal
2. Scroll-linked text fill on the About statement
3. Section eyebrow hairline draws and reveal-on-scroll (shared utility)
4. Project row hover: sibling dim + cursor-following preview + text scramble
5. Custom cursor (desktop only)
6. Stats count-up; marquee
7. Magnetic buttons
8. Preloader
9. Page transitions

**Exit gate for each:** 60fps in Chrome Performance panel on a mid-tier laptop; no layout shift; reduced-motion version verified; works after route change and back button.
**Rollback:** `git revert` that single commit. Items 5, 7, 8, 9 are *nice-to-have*; cut them first if the budget is blown.

---

## Phase 5: Performance, accessibility and SEO hardening

Deliverables
- [ ] Hit budgets in DESIGN.md §11 (Lighthouse mobile ≥ 90, LCP ≤ 2s, CLS ≤ 0.05, INP ≤ 200ms)
- [ ] Dynamic import below-the-fold animation code; verify first-load JS ≤ 170KB gzip
- [ ] Images: AVIF/WebP, sizes attributes, blur placeholders; videos lazy + pause off-screen
- [ ] A11y pass: keyboard-only run-through, screen-reader run-through (VoiceOver or NVDA), 200% zoom, colour contrast audit
- [ ] SEO: title/description per page, OG images (generated), `sitemap.xml`, `robots.txt`, JSON-LD `Person`, canonical URLs
- [ ] Error pages: custom 404 and 500 that match the design
- [ ] Favicon set, theme-color meta

**Exit gate:** all budgets green on a Vercel **production** build (not dev), tested on a real mid-range Android phone and an iPhone if possible.
**Rollback:** remove the heaviest effect (usually grain overlay, preview images or video) before touching content.

---

## Phase 6: Contact, polish and launch

Deliverables
- [ ] Contact form (or a clean `mailto:` + copy-email button): validation, honeypot, rate limit, success and error states, no secrets in client code
- [ ] Final copy edit (read it aloud; delete every adjective you can)
- [ ] Cross-browser: Chrome, Safari (macOS + iOS), Firefox, Edge
- [ ] Custom domain, HTTPS, www redirect, DNS verified
- [ ] Analytics on; Search Console submitted
- [ ] Share preview tested (WhatsApp, LinkedIn, X)

**Exit gate (LAUNCH CHECKLIST):**
- [ ] No console errors/warnings in production
- [ ] All links work (run a link checker)
- [ ] Forms deliver an email to you (send a real test)
- [ ] Lighthouse (mobile) ≥ 90 all four categories
- [ ] Looks right at 375 / 768 / 1024 / 1440 / 1920
- [ ] Reduced-motion mode verified
- [ ] Someone who isn't you has tried it on their phone

**Rollback:** Vercel instant rollback to the previous deployment.

---

## Phase 7: Upgrades (post-launch)

- [ ] Light theme + toggle (tokens already defined)
- [ ] Additional case studies
- [ ] Writing/notes section (MDX)
- [ ] Live details: local time in nav, "now building" line

## Phase 8: Optional 3D / WebGL hero

Only after v1 is live and fast. Feature-flag it, lazy-load it, cap DPR, provide a static fallback, and keep it only if mobile Lighthouse stays ≥ 90. If not, delete it without guilt.

---

## Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Animations hurt performance on mid/low devices | High | High | Transform/opacity only; budgets enforced in Phase 5; cut cursor/magnetic/preloader first |
| Scroll-hijack bugs (Lenis + ScrollTrigger + anchors) | Medium | High | Phase 3 isolated; kill switch to native scroll |
| GSAP triggers leak on route changes | Medium | Medium | Context-scoped animations, `revert()` on unmount, test back/forward |
| Fonts cause layout shift | Medium | Medium | `next/font`, size-adjust, preload display font |
| Content not ready → stalls project | High | High | Phase 0 gate; ship with 3 projects |
| Over-designing, never shipping | High | High | Static first (Phase 2); Phase 6 is launch, everything else is optional |
| Client/NDA conflict on Sentinel Layer details | Medium | High | Confirm what's public in Phase 0; use generalised metrics if needed |
| Accessibility regressions from animated text | Medium | Medium | SplitText with aria-label on parent; axe in CI |
| Contact form abuse/spam | Medium | Low | Honeypot, rate limit, server validation |
| Safari/iOS quirks (100vh, scroll, video autoplay) | Medium | Medium | Use `dvh`, `playsinline muted`, test on real device |
| 3D hero tanks mobile performance | High | Medium | Phase 8 only, flagged, fallback image |

---

## Working rules (so nothing breaks silently)

1. **One phase at a time.** Gate passes before the next phase begins.
2. **Small commits, one concern each.** Every signature animation is its own commit.
3. **Feature flags** for risky items (3D, cursor, preloader, page transitions).
4. **Test on production builds**, not dev mode, for performance.
5. **Never block on nice-to-haves.** If an animation fights you for more than ~2 hours, cut it or simplify.
6. **`DESIGN.md` is the contract.** Deviations get written back into it.
7. **Keep a `CHANGELOG.md`** of decisions and cuts, so future-you knows why.

---

## Suggested folder structure

```
/app
  layout.tsx, page.tsx, not-found.tsx
  /work/[slug]/page.tsx
  /api/contact/route.ts
/components
  /ui        (Button, Link, Chip, StatusPill, Section)
  /sections  (Hero, WorkList, Process, Stats, Stack, About, CTA, Footer)
  /motion    (SmoothScroll, Cursor, Preloader, PageTransition, SplitReveal)
/content     (projects.ts, profile.ts, copy.ts)
/lib         (motion.ts, hooks.ts, seo.ts)
/styles      (globals.css, tokens.css)
/public      (fonts if self-hosted, og, media)
DESIGN.md  PLAN.md  CHANGELOG.md
```
