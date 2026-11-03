import { useEffect, useState, useRef, useCallback } from "react";
import { usePreloader } from "@/lib/preloader-context";
import { BlurText, type WordItem } from "@/components/reactbits/BlurText";
import { gsap } from "gsap";

const QUOTE_LINES: WordItem[][] = [
  [{ text: "IT'S" }, { text: "ALWAYS" }],
  [{ text: "50-50", isSpecial: true }, { text: "CHANCE" }],
  [{ text: "IF" }, { text: "YOU" }, { text: "TRY." }],
];

// Cascading curtain layers matching the menu sidebar's palette & multi-slide mechanic
const CURTAIN_COLORS = [
  "#141518", // Deep slate charcoal
  "#1e1e22", // Signature menu sidebar graphite
  "#ed4a1c", // DOVV studio signature flame orange
];

/**
 * Preloader — Minimalist Editorial Quote Transition.
 *
 * Sequence:
 * 1. Deep cinematic blank canvas pause (550ms).
 * 2. Butter-smooth masked typography reveal:
 *    Line 1: IT'S ALWAYS
 *    Line 2: 50-50 CHANCE (50-50 in pure solid DOVV flame #ed4a1c)
 *    Line 3: IF YOU TRY.
 * 3. Generous hold pause (1.4s) to let the quote resonate.
 * 4. Multi-layered staggered curtain slide-up exit (matching the StaggeredMenu sidebar):
 *    - Main preloader panel (#05080c) slides up first.
 *    - Followed by cascading pre-layers (#141518, #1e1e22, #ed4a1c) sliding up sequentially.
 *    - Synchronous handoff to the Hero landing reveal as the final curtains lift!
 */
export function Preloader() {
  const { phase, startReveal, finishPreloader } = usePreloader();
  const [isExiting, setIsExiting] = useState(false);
  const [showSkipHint, setShowSkipHint] = useState(false);
  const [lineActive, setLineActive] = useState(false);
  const dismissedRef = useRef(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const mainPanelRef = useRef<HTMLDivElement | null>(null);
  const preLayerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const handleDismiss = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;

    // 1. Text begins soft upward float dissolve
    setIsExiting(true);

    // 2. Multi-layered staggered slide-up exit (same as menu sidebar pre-layers)
    setTimeout(() => {
      const mainPanel = mainPanelRef.current;
      const layers = preLayerRefs.current.filter(Boolean) as HTMLDivElement[];

      if (!mainPanel) {
        startReveal();
        finishPreloader();
        return;
      }

      // Kill any previous animation
      timelineRef.current?.kill();

      const tl = gsap.timeline({
        onComplete: () => {
          finishPreloader();
        },
      });

      // All layers stacked: main panel (top) -> prelayer 0 -> prelayer 1 -> prelayer 2
      const allSlidePanels = [mainPanel, ...layers];

      // Staggered upward slide (duration: 0.88s, stagger: 0.09s, power4.inOut)
      allSlidePanels.forEach((panel, i) => {
        tl.to(
          panel,
          {
            yPercent: -100,
            duration: 0.88,
            ease: "power4.inOut",
          },
          i * 0.09
        );
      });

      // Synchronously awaken Hero landing reveal as the curtains start clearing
      tl.call(
        () => {
          startReveal();
        },
        [],
        0.32
      );

      timelineRef.current = tl;
    }, 240);

    // Bulletproof safety watchdog: ensures preloader always unmounts even if GSAP stalls
    setTimeout(() => {
      startReveal();
      finishPreloader();
    }, 2400);
  }, [startReveal, finishPreloader]);

  useEffect(() => {
    if (phase === "done") return;

    // Expand center baseline hairline during quote delivery
    const lineTimer = setTimeout(() => {
      setLineActive(true);
    }, 850);

    // Subtle skip hint fade-in after 2.0s
    const hintTimer = setTimeout(() => {
      setShowSkipHint(true);
    }, 2000);

    // Master watchdog: automatically progresses if user is idle for 6 seconds
    const watchdogTimer = setTimeout(() => {
      handleDismiss();
    }, 6000);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.code === "Escape" || e.key === " ") {
        handleDismiss();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimeout(lineTimer);
      clearTimeout(hintTimer);
      clearTimeout(watchdogTimer);
      window.removeEventListener("keydown", onKeyDown);
      // NOTE: Do not kill timelineRef here, otherwise updating phase to 'revealing' aborts the exit!
    };
  }, [phase, handleDismiss]);

  // Clean up GSAP timeline strictly when the component unmounts from DOM
  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      ref={containerRef}
      aria-label="Portfolio Loading Sequence"
      className="fixed inset-0 z-[10000] select-none pointer-events-auto overflow-hidden cursor-pointer"
      onClick={handleDismiss}
    >
      {/* 
        A. Staggered Pre-layers (Colors slide up in cascade behind the main screen)
        Order of stacking:
        - CURTAIN_COLORS[2] (#ed4a1c): z-index 10001 (revealed last before website)
        - CURTAIN_COLORS[1] (#1e1e22): z-index 10002
        - CURTAIN_COLORS[0] (#141518): z-index 10003
        - Main Panel (#05080c): z-index 10004 (revealed first, starts sliding at t=0)
      */}
      {CURTAIN_COLORS.map((color, idx) => {
        const stackZIndex = 10001 + (CURTAIN_COLORS.length - 1 - idx);
        return (
          <div
            key={color + idx}
            ref={(el) => {
              preLayerRefs.current[idx] = el;
            }}
            className="absolute inset-0 h-full w-full pointer-events-none will-change-transform"
            style={{
              backgroundColor: color,
              zIndex: stackZIndex,
              transform: "translate3d(0, 0%, 0)",
            }}
          />
        );
      })}

      {/* B. Main Preloader Panel (Quote + Ambient Glow + Hairline) */}
      <aside
        ref={mainPanelRef}
        className="absolute inset-0 h-full w-full bg-[#05080c] text-white flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden will-change-transform"
        style={{
          zIndex: 10001 + CURTAIN_COLORS.length,
          transform: "translate3d(0, 0%, 0)",
        }}
      >
        {/* Subtle deep ambient center luminescence */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[480px] bg-gradient-to-tr from-[#ed4a1c]/12 via-[#c6f432]/6 to-transparent blur-[160px] opacity-70" />

        {/* Main Quote Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 flex flex-col items-center">
          <BlurText
            lines={QUOTE_LINES}
            initialDelay={550}
            staggerDelay={220}
            className="font-display text-[clamp(2.5rem,7.2vw,5.8rem)] font-bold tracking-tight uppercase leading-[0.94] text-center"
            onAnimationComplete={handleDismiss}
            isExiting={isExiting}
          />

          {/* Elegant editorial baseline hairline */}
          <div className="w-24 sm:w-36 h-px mt-8 overflow-hidden bg-white/10 relative">
            <div
              className={`h-full bg-gradient-to-r from-transparent via-[#ed4a1c] to-transparent transition-transform duration-1000 ease-out ${
                lineActive && !isExiting ? "scale-x-100 opacity-80" : "scale-x-0 opacity-0"
              }`}
            />
          </div>
        </div>

        {/* Subtle minimalist skip hint at bottom */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.22em] uppercase text-white/30 transition-opacity duration-700 pointer-events-none ${
            showSkipHint && !isExiting ? "opacity-100" : "opacity-0"
          }`}
        >
          [ click or esc to skip ]
        </div>
      </aside>
    </div>
  );
}
