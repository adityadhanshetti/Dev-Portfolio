import { useEffect, useState, useRef } from "react";
import { HolographicSticker } from "@/components/dovv/HolographicSticker";
import VariableProximity from "@/components/reactbits/VariableProximity";
import { Aurora } from "@/components/reactbits/Aurora";
import { usePreloader } from "@/lib/preloader-context";

/**
 * Hero — DOVV Studio Official Light Aesthetic.
 * Featuring React Bits VariableProximity for interactive proximity typography!
 */
export function Hero() {
  const heroHeadlineRef = useRef<HTMLDivElement>(null);
  const { phase } = usePreloader();
  const [isRevealed, setIsRevealed] = useState(() => phase === "revealing" || phase === "done");

  useEffect(() => {
    if (phase === "revealing" || phase === "done") {
      setIsRevealed(true);
    }
    const timer = setTimeout(() => setIsRevealed(true), 4500);
    return () => clearTimeout(timer);
  }, [phase]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[96vh] flex flex-col justify-between pt-32 pb-12 overflow-hidden bg-[#f5f5f5]">
      {/* React Bits Aurora — Fluid Kinetic Ambient Light Wave Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-90">
        <Aurora
          colorStops={["#ed4a1c", "#ff8a4c", "#c6f432", "#ed4a1c"]}
          amplitude={1.2}
          blend={0.85}
          speed={0.7}
          height={0.5}
          glow={0.8}
          brightness={1.2}
          opacity={0.85}
          mouseInteraction={true}
        />
      </div>

      {/* Subtle feather fade strictly at the bottom border to blend with the marquee */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-24 z-0 bg-gradient-to-t from-[#f5f5f5] to-transparent" />

      {/* Main Center Content */}
      <div className="relative z-10 mx-auto max-w-6xl w-full px-4 sm:px-8 flex flex-col items-center text-center my-auto">
        {/* 1. Official DOVV Status Pill */}
        <div
          className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border border-black/10 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] mb-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#16c847] shadow-[0_0_8px_#16c847]" />
          <span className="font-mono text-xs text-[#05080c] font-medium">Hire Me</span>
          <span className="text-black/15">|</span>
          <button
            onClick={() => scrollTo("contact")}
            className="font-mono text-xs text-[#5b5b5b] hover:text-[#05080c] cursor-pointer flex items-center gap-1 font-medium"
          >
            Get In Touch
          </button>
        </div>

        {/* 2. DOVV Studio VariableProximity Headline with Overlapping Holographic Stickers */}
        <div ref={heroHeadlineRef} className="relative w-full max-w-5xl my-4 flex flex-col items-center">
          {/* Floating Sticker 1 (Top Left — Framer Expert Pill Overlapping 'WE') */}
          <div
            className={`hidden sm:block absolute -top-8 left-4 md:left-12 lg:left-16 z-20 transition-all duration-1000 delay-300 ease-[cubic-bezier(0.2,0.9,0.3,1.2)] ${
              isRevealed ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-50 -translate-y-8"
            }`}
          >
            {/* <HolographicSticker rotation={-9} variant="flame">
              Framer expert
            </HolographicSticker> */}
          </div>

          {/* Floating Sticker 2 (Bottom Left — 4.9 Starburst Badge Overlapping 'THAT') */}
          <div
            className={`hidden sm:block absolute -bottom-10 left-2 md:left-10 lg:left-14 z-20 transition-all duration-1000 delay-400 ease-[cubic-bezier(0.2,0.9,0.3,1.2)] ${
              isRevealed ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-50 translate-y-8"
            }`}
          >
            {/* <HolographicSticker rotation={-3} variant="lime" shape="star">
              <span className="text-base font-black leading-none">4.9</span>
              <span className="text-[10px] tracking-tight leading-none mt-0.5">★★★★★</span>
            </HolographicSticker> */}
          </div>

          {/* Floating Sticker 3 (Bottom Right — Pink Pill Overlapping 'PEOPLE') */}
          <div
            className={`hidden sm:block absolute -bottom-6 right-4 md:right-12 lg:right-16 z-20 transition-all duration-1000 delay-500 ease-[cubic-bezier(0.2,0.9,0.3,1.2)] ${
              isRevealed ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-50 translate-y-8"
            }`}
          >
            {/* <HolographicSticker rotation={8} variant="pink">
              Made in Argentina
            </HolographicSticker> */}
          </div>

          {/* Line 1: WE BUILD SITES */}
          <h1
            className={`font-display text-[clamp(2.8rem,7.8vw,6.8rem)] font-black uppercase tracking-normal leading-[0.92] text-center select-none transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <VariableProximity
              label="Aditya D."
              className="cursor-pointer"
              fromFontVariationSettings="'wght' 950, 'opsz' 40"
              toFontVariationSettings="'wght' 350, 'opsz' 14"
              containerRef={heroHeadlineRef}
              radius={180}
              falloff="gaussian"
              smoothing={0.2}
              fromColor="#05080c"
              toColor="#ed4a1c"
            />
          </h1>

          {/* Line 2: THAT MOVE PEOPLE */}
          <h2
            className={`font-display text-[clamp(2.8rem,7.8vw,6.8rem)] font-black uppercase tracking-tight leading-[0.92] text-center select-none mt-1 sm:mt-2 transition-all duration-1000 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <VariableProximity
              label="I Build, I scale"
              className="cursor-pointer"
              fromFontVariationSettings="'wght' 950, 'opsz' 40"
              toFontVariationSettings="'wght' 350, 'opsz' 14"
              containerRef={heroHeadlineRef}
              radius={180}
              falloff="gaussian"
              smoothing={0.2}
              fromColor="#05080c"
              toColor="#ed4a1c"
            />
          </h2>
        </div>

        {/* 3. DOVV Studio Subtext */}
        <div className="overflow-hidden mt-6 max-w-2xl">
          <p
            className={`font-body text-sm sm:text-base md:text-lg text-[#5b5b5b] leading-relaxed transition-all duration-1000 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            An Engineer specializing in Backend Engineering,
            Scalable APIs, System Design, and GenAI. Technical Lead @Sentinel Layer Pvt. Ltd & SDE Intern @AppOrbits.
          </p>
        </div>

        {/* 4. DOVV Studio Action Buttons */}
        <div
          className={`flex items-center gap-4 mt-8 flex-wrap justify-center transition-all duration-1000 delay-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isRevealed ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <button
            onClick={() => scrollTo("contact")}
            className="px-7 py-3 rounded-full bg-[#05080c] hover:bg-[#ed4a1c] text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-[0_8px_24px_rgba(0,0,0,0.18)] hover:scale-105 active:scale-95"
          >
            Start a project
          </button>

          <button
            onClick={() => scrollTo("work")}
            className="px-7 py-3 rounded-full border border-black/15 bg-white hover:bg-black/5 text-[#05080c] font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
          >
            See our work
          </button>
        </div>
      </div>
    </section>
  );
}
