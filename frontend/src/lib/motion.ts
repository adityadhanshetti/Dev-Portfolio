/**
 * Motion tokens — from ANIMATION.md §2.
 * Used by GSAP animations site-wide.
 */
export const ease = {
  out: "power3.out",
  inOut: "power3.inOut",
  expo: "expo.out",
} as const;

export const dur = {
  fast: 0.2,
  base: 0.5,
  slow: 0.9,
  hero: 1.2,
} as const;

export const stagger = {
  chars: 0.015,
  words: 0.06,
  lines: 0.1,
} as const;

