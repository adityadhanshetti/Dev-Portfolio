import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FLAGS } from "@/lib/flags";
import { useReducedMotion, useCalmMode } from "@/lib/hooks";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: ReactNode;
}

/**
 * Provides smooth scrolling via Lenis, synced with GSAP ScrollTrigger.
 * Respects reduced motion, Calm mode, and the SMOOTH_SCROLL feature flag.
 * Kill switch: set FLAGS.SMOOTH_SCROLL = false to revert to native scroll.
 */
export function SmoothScrollProvider({ children }: Props) {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = useReducedMotion();
  const [calm] = useCalmMode();

  const shouldDisable = !FLAGS.SMOOTH_SCROLL || reducedMotion || calm;

  useEffect(() => {
    if (shouldDisable) {
      // Ensure ScrollTrigger still works without Lenis
      ScrollTrigger.defaults({ scroller: undefined });
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Sync Lenis ↔ ScrollTrigger (from ANIMATION.md §2)
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after fonts and images load
    const refreshOnLoad = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      refreshOnLoad();
    } else {
      window.addEventListener("load", refreshOnLoad);
    }

    return () => {
      window.removeEventListener("load", refreshOnLoad);
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [shouldDisable]);

  return <>{children}</>;
}

