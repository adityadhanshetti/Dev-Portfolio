import { useState, useEffect, useCallback } from "react";

// ──────────────────────────────────────────────
// Reduced Motion
// ──────────────────────────────────────────────

/** Returns true if the user prefers reduced motion */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

// ──────────────────────────────────────────────
// Touch Detection
// ──────────────────────────────────────────────

/** Returns true on touch-only devices */
export function useIsTouch(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  return isTouch;
}

// ──────────────────────────────────────────────
// Desktop Capability
// ──────────────────────────────────────────────

/** Returns true if device is likely desktop-capable for heavy effects */
export function useIsDesktopCapable(): boolean {
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    setCapable(
      window.innerWidth >= 1024 &&
        !("ontouchstart" in window) &&
        (navigator.hardwareConcurrency ?? 0) >= 4
    );
  }, []);

  return capable;
}

// ──────────────────────────────────────────────
// Calm Mode (persisted in localStorage)
// ──────────────────────────────────────────────

const CALM_KEY = "portfolio-calm-mode";

function readCalm(): boolean {
  try {
    return localStorage.getItem(CALM_KEY) === "true";
  } catch {
    return false;
  }
}

/** Calm mode toggle — persisted in localStorage. Disables heavy effects. */
export function useCalmMode(): [boolean, () => void] {
  const [calm, setCalm] = useState(readCalm);

  const toggle = useCallback(() => {
    setCalm((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(CALM_KEY, String(next));
      } catch {
        // localStorage unavailable — silently ignore
      }
      return next;
    });
  }, []);

  return [calm, toggle];
}

// ──────────────────────────────────────────────
// Active Chapter (IntersectionObserver)
// ──────────────────────────────────────────────

/** Tracks which chapter is currently in the viewport */
export function useActiveChapter(): string {
  const [active, setActive] = useState("01");

  useEffect(() => {
    const sections = document.querySelectorAll("[data-chapter]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const chapter = (entry.target as HTMLElement).dataset.chapter;
            if (chapter) setActive(chapter);
          }
        }
      },
      { threshold: 0.3 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return active;
}

// ──────────────────────────────────────────────
// Local Time
// ──────────────────────────────────────────────

/** Returns a live-updating local time string in the user's timezone */
export function useLocalTime(timezone = "Asia/Kolkata"): string {
  const [time, setTime] = useState(() => formatTime(timezone));

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(timezone)), 1000);
    return () => clearInterval(id);
  }, [timezone]);

  return time;
}

function formatTime(tz: string): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: tz,
    hour12: false,
  }).format(new Date());
}

