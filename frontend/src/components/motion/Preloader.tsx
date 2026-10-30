import { useEffect, useState, useRef } from "react";
import { usePreloader } from "@/lib/preloader-context";
import { FILM_REEL_IMAGES } from "@/content/media";

// Curated high-contrast film-reel images (Studio Olimpo style nature & architectural texture strobe)
const filmReelImages = FILM_REEL_IMAGES;

const telemetryPhases = [
  "LOADING ASSETS",
  "PREPARING IMAGES",
  "HELLO & WELCOME",
  "SETTING UP THE EXPERIENCE",
  "READY // ENJOY",
];

/**
 * Preloader — Exact Studio Olimpo x Iceberg Doc Award-Winning Fusion.
 *
 * Studio Olimpo:
 * - Minimalist top & bottom HUD (Aditya Dhanshetti on left, crisp numeric 0->100 counter on right).
 * - Aspect-ratio portrait visual aperture in dead center.
 * - Rapid film-reel strobe of curated high-res nature/architecture photographs cycling in sync with percentage.
 *
 * Iceberg Doc:
 * - Kinetic stacked typography rolling upward through an overflow mask.
 * - Expanding aperture clip-path & curtain lift on 100% completion.
 * - Synchronous handoff to the landing page Hero reveal!
 * - Zero pulsing dots, zero rounded cylinders. Pure sharp editorial luxury.
 */
export function Preloader() {
  const { phase, progress, setProgress, startReveal, finishPreloader } = usePreloader();
  const [imageIndex, setImageIndex] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isWiping, setIsWiping] = useState(false);
  const [isApertureExpanded, setIsApertureExpanded] = useState(false);
  const dismissedRef = useRef(false);

  // Pre-load images into browser memory to eliminate flash during rapid strobe
  useEffect(() => {
    filmReelImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const handleDismiss = () => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;

    // 1. Expand the aperture (Iceberg Doc aperture bloom)
    setIsApertureExpanded(true);
    setProgress(100);
    setImageIndex(filmReelImages.length - 1);
    setPhaseIndex(telemetryPhases.length - 1);

    setTimeout(() => {
      // 2. Wipe curtain upward (Studio Olimpo / Iceberg curtain release)
      setIsWiping(true);
      startReveal(); // Synchronously triggers Hero landing reveal!

      // 3. Clean unmount
      setTimeout(() => {
        finishPreloader();
      }, 950);
    }, 280);
  };

  useEffect(() => {
    if (phase === "done") return;

    let animId: number;
    const startTime = performance.now();
    const duration = 2000; // 2.0s cinematic film-reel cadence

    const tick = (now: number) => {
      if (dismissedRef.current) return;

      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);

      // Smooth progression with slight acceleration
      const calculatedPct = Math.min(100, Math.floor(t * 100));
      setProgress(calculatedPct);

      // Studio Olimpo: rapid image strobe driven by progress
      const nextImgIdx = Math.min(
        filmReelImages.length - 1,
        Math.floor((calculatedPct / 100) * filmReelImages.length)
      );
      setImageIndex(nextImgIdx);

      // Phase status updates
      const nextPhaseIdx = Math.min(
        telemetryPhases.length - 1,
        Math.floor((calculatedPct / 100) * telemetryPhases.length)
      );
      setPhaseIndex(nextPhaseIdx);

      if (t < 1) {
        animId = requestAnimationFrame(tick);
      } else {
        handleDismiss();
      }
    };

    animId = requestAnimationFrame(tick);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.code === "Escape") {
        handleDismiss();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <aside
      aria-label="Portfolio Loading Sequence"
      className={`fixed inset-0 z-[10000] select-none bg-[#f5f5f5] text-[#05080c] flex flex-col justify-between p-6 sm:p-12 overflow-hidden transition-transform duration-900 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isWiping ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* ═══ 1. TOP HEADER HUD (Studio Olimpo style) ═══ */}
      <header className="relative z-20 flex items-center justify-between border-b border-black/8 pb-5">
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#05080c] font-medium">
            Aditya Dhanshetti
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#5b5b5b]">
            PORTFOLIO // 2026
          </span>
        </div>

        {/* Studio Olimpo Minimalist Numeric Counter */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={handleDismiss}
            className="cursor-pointer font-mono text-[10px] uppercase tracking-widest text-[#5b5b5b] hover:text-[#05080c] border-b border-black/20 hover:border-black transition-colors"
          >
            [SKIP ESC]
          </button>

          <div className="font-mono text-xl sm:text-2xl text-[#05080c] font-normal tracking-tight min-w-[3.5ch] text-right">
            <span>{progress}</span>
            <span className="text-[#ed4a1c] text-xs ml-0.5">%</span>
          </div>
        </div>
      </header>

      {/* ═══ 2. CENTER APERTURE WITH FILM-REEL STROBE (Studio Olimpo + Iceberg Doc) ═══ */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center w-full">
        {/* Studio Olimpo Aspect-Ratio Frame */}
        <div
          className={`relative w-64 sm:w-80 md:w-96 aspect-[3/4] max-h-[46vh] border border-black/10 bg-white shadow-2xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            isApertureExpanded ? "scale-[2.4] opacity-40 blur-sm" : "scale-100 opacity-100"
          }`}
        >
          {/* Active Film-Reel Image */}
          <img
            key={imageIndex}
            src={filmReelImages[imageIndex]}
            alt="Editorial Texture Frame"
            className="w-full h-full object-cover select-none animate-in fade-in duration-75"
          />

          {/* Minimal frame corner brackets */}
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/60 pointer-events-none" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/60 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/60 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/60 pointer-events-none" />

          {/* Micro frame watermark */}
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between font-mono text-[9px] text-white/80 uppercase tracking-widest mix-blend-difference pointer-events-none font-semibold">
            <span>FRAME 0{imageIndex + 1} // 08</span>
            <span>NATURE // MATRIX</span>
          </div>
        </div>

        {/* ═══ 3. ICEBERG DOC KINETIC STACKED ROLLING TYPOGRAPHY ═══ */}
        <div className="mt-8 text-center overflow-hidden max-w-2xl px-4">
          <div className="relative h-9 sm:h-12 overflow-hidden">
            {/* Line 1 */}
            <div
              className={`font-display text-2xl sm:text-4xl text-[#05080c] font-black tracking-tight uppercase leading-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                progress < 35
                  ? "translate-y-0 opacity-100"
                  : progress < 70
                  ? "-translate-y-full opacity-0"
                  : "-translate-y-[200%] opacity-0"
              }`}
            >
              Aditya Dhanshetti
            </div>

            {/* Line 2 */}
            <div
              className={`font-display text-2xl sm:text-4xl text-[#ed4a1c] font-black tracking-tight uppercase leading-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                progress < 35
                  ? "translate-y-full opacity-0"
                  : progress < 70
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-full opacity-0"
              }`}
            >
              Systems Architect
            </div>

            {/* Line 3 */}
            <div
              className={`font-display text-2xl sm:text-4xl text-[#05080c] font-black tracking-tight uppercase leading-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                progress >= 70
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              }`}
            >
              Security Engineer
            </div>
          </div>

          <p className="font-mono text-[10px] text-[#5b5b5b] tracking-widest uppercase mt-2 font-medium">
            FULL-STACK & SECURITY ENGINEER
          </p>
        </div>
      </div>

      {/* ═══ 4. BOTTOM HUD & PROGRESS HAIRLINE ═══ */}
      <footer className="relative z-20 border-t border-black/8 pt-5">
        {/* Fine Progress Track (hairline) */}
        <div className="h-[2px] w-full bg-black/10 overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-[#ed4a1c] via-[#ff7a3d] to-[#05080c] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between font-mono text-[10px] text-[#5b5b5b] tracking-wider">
          <span className="text-[#ed4a1c] uppercase font-semibold">
            [ {telemetryPhases[phaseIndex]} ]
          </span>
          <span className="text-[#05080c] uppercase font-medium">
            {progress >= 100 ? "PORTAL READY" : "LOADING..."}
          </span>
        </div>
      </footer>
    </aside>
  );
}
