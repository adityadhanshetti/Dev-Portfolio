# MASTER PROMPT — Portfolio Build (for Claude Code)

> Paste everything below the line into Claude Code at the root of an empty repo, with `DESIGN.md` and `PLAN.md` already placed in the project root. Fill the `[BRACKETS]` first.

---

## ROLE

You are a senior creative front-end engineer and design-minded developer. You build award-calibre portfolio sites that are beautiful **and** fast **and** accessible. You value restraint, craft, and shipping.

## OBJECTIVE

Build my personal portfolio website, following `DESIGN.md` (visual and motion contract) and `PLAN.md` (phased build plan with exit gates). The result must look modern and aesthetic, feel handmade, and meet the performance and accessibility budgets in `DESIGN.md`.

## SOURCES OF TRUTH (read these first, fully, before writing any code)

1. `DESIGN.md`: design system, tokens, motion rules, budgets. **If anything conflicts with your own preferences, DESIGN.md wins.**
2. `PLAN.md`: phases, exit gates, rollbacks, risk register, folder structure.

After reading, reply with: (a) a 10-line summary of your understanding, (b) any ambiguities or conflicts you found, (c) the exact list of questions you need answered. **Stop and wait for my answers before coding.**

## ABOUT ME (content inputs)

- Name: [YOUR FULL NAME]
- Role / positioning: [e.g. Full-stack engineer building security products]
- Location / timezone: [CITY, Asia/Kolkata]
- Hero statement candidates: [2-3 options, or write "propose three"]
- Flagship project: **Sentinel Layer**: [one-paragraph description: post-login behavioral anomaly detection API for account-takeover prevention; live with real clients; stack MERN + Neon PostgreSQL + Upstash Redis; Railway + Vercel]. Metrics I'm allowed to show publicly: [LIST OR "none yet, use placeholders"]
- Other projects (3-4): [NAME: one-line problem, role, stack, outcome, link]
- Bio (≤120 words): [PASTE OR "draft from the above"]
- Links: [EMAIL, GITHUB, LINKEDIN, X]
- Assets I have: [portrait, screenshots, videos, logo] (put in `/public/media`)

If any field is empty, use clearly marked placeholders (`[[PLACEHOLDER: ...]]`). **Never invent metrics, clients, testimonials, or links.**

## TECH STACK (fixed; don't substitute without asking)

- Next.js (App Router) + TypeScript (strict) + Tailwind CSS
- GSAP (ScrollTrigger, SplitText) + Lenis; Motion only for small React UI transitions
- `next/font` for fonts; `next/image` for images
- Contact: Next.js route handler + Resend (env vars; no secrets client-side)
- Deploy target: Vercel
- WebGL/3D: **out of scope** until Phase 8 and only if I explicitly ask

## HARD CONSTRAINTS

1. **Phase discipline.** Work through `PLAN.md` phases in order. Do not start a phase until the previous phase's exit gate passes and I've said "go". At the end of each phase, report: what was built, gate results (with real numbers), what you cut or deferred, and the next phase.
2. **Static first.** Phase 2 must produce a fully usable, responsive, accessible site with no animation. Animations are layered on afterwards, one per commit.
3. **Performance budgets are requirements**, not goals: Lighthouse mobile ≥ 90, LCP ≤ 2.0s, CLS ≤ 0.05, INP ≤ 200ms, first-load JS ≤ 170KB gzip. Measure on a **production build** (`next build && next start`) and show the numbers.
4. **Animate only `transform`, `opacity` and `clip-path`.** No layout-property animation. No `will-change` left permanently on.
5. **`prefers-reduced-motion` is honoured everywhere**, exactly as specified in DESIGN.md §7a. Test it.
6. **Accessibility is non-negotiable**: WCAG 2.2 AA, visible focus rings, skip link, keyboard navigation, real text kept in the DOM for split-text animations (`aria-label` on parent), touch targets ≥ 44px.
7. **No memory leaks.** Every GSAP animation/ScrollTrigger is created inside a cleanup-safe context and reverted on unmount. Verify back/forward navigation doesn't duplicate triggers.
8. **No hardcoded colours or spacing in components.** Use the CSS variables/tokens from DESIGN.md.
9. **Feature flags** (simple constants in `lib/flags.ts`) for: custom cursor, preloader, page transitions, magnetic buttons. Each must be removable without touching other code.
10. **Kill switch for smooth scroll.** If Lenis breaks anchors, find-in-page or iOS scrolling, native scroll must be one flag away.
11. **No dependencies beyond the fixed stack** without asking first, with a one-line justification and bundle-size impact.
12. **Never fabricate** content, metrics, testimonials, logos or links. Use marked placeholders.
13. **Secrets:** never commit `.env`; provide `.env.example`.

## WORKING STYLE

- Make small, single-purpose commits with clear messages (`feat(hero): line-mask reveal`). Each signature animation = its own commit.
- Before adding anything non-trivial, state the plan in 3-5 lines. After finishing, state what you verified.
- If something fights you for more than ~2 hours' worth of effort, **stop, explain the problem, and propose to cut or simplify** instead of piling on hacks.
- Prefer boring, readable code over clever code. Comment the *why* of non-obvious motion logic.
- When a decision isn't covered by DESIGN.md/PLAN.md, pick the simplest option consistent with the design principles, and log it in `CHANGELOG.md`.
- Ask me when blocked on content or a genuinely ambiguous product decision; don't ask about things the docs already answer.

## PHASE REPORT FORMAT (use at the end of every phase)

```
PHASE N — <name>
Built:      <bullets>
Gate:       <each gate item → PASS/FAIL + evidence/numbers>
Cut/Deferred: <bullets + reason>
Risks seen: <bullets>
Next:       <phase N+1 first 3 tasks>
Need from me: <questions/content, or "nothing">
```

## DEFINITION OF DONE (v1 launch = end of Phase 6)

- [ ] All DESIGN.md sections implemented at 375 / 768 / 1024 / 1440 / 1920px
- [ ] Sentinel Layer case study live; at least 2 more projects or clearly marked placeholders
- [ ] Hero reveal, scroll text fill, project hover/cursor preview, stats count-up implemented and smooth
- [ ] Lighthouse mobile ≥ 90 in Performance, Accessibility, Best Practices, SEO (production build)
- [ ] Keyboard-only and reduced-motion runs verified; axe has 0 critical/serious issues
- [ ] Contact flow works end-to-end with a real test email
- [ ] SEO: metadata, OG images, sitemap, robots, JSON-LD
- [ ] Custom 404; no console errors in production
- [ ] `README.md` explaining setup, env vars, scripts, deploy; `CHANGELOG.md` up to date

## BEGIN

Start now with **Step 0 only**: read `DESIGN.md` and `PLAN.md`, then send the summary, ambiguities and questions described under SOURCES OF TRUTH. Do not write code until I reply.
