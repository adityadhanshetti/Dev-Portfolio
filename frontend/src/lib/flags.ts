/**
 * Feature flags — each can be toggled without touching other code.
 * Set to false to disable; code must handle both states.
 */
export const FLAGS = {
  SMOOTH_SCROLL: true,
  PARALLAX: true,
  WEBGL_BG: true,
  CURSOR: true,
  PRELOADER: true,
  PAGE_TRANSITIONS: true,
  MAGNET: true,
} as const;

