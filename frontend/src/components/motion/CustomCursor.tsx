import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FLAGS } from "@/lib/flags";
import { useReducedMotion, useCalmMode, useIsDesktopCapable } from "@/lib/hooks";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const reducedMotion = useReducedMotion();
  const [calm] = useCalmMode();
  const isDesktop = useIsDesktopCapable();

  const isEnabled = FLAGS.CURSOR && !reducedMotion && !calm && isDesktop;

  useEffect(() => {
    if (!isEnabled) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Fast tracking for center dot, smooth spring for ring
    const xDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });

    const xRing = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
    const yRing = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [data-cursor]");
      if (interactive) {
        setIsHovered(true);
        const cursorAttr = interactive.getAttribute("data-cursor");
        setLabel(cursorAttr || null);
      } else {
        setIsHovered(false);
        setLabel(null);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <>
      {/* Precision center dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent"
      />

      {/* Outer target ring */}
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-[width,height,background-color,border-color] duration-200 ease-out border ${
          isHovered
            ? "w-14 h-14 border-accent bg-accent/15 backdrop-blur-[1px]"
            : "w-8 h-8 border-line-strong bg-transparent"
        }`}
      >
        {label && (
          <span className="font-mono text-[9px] uppercase tracking-widest text-accent font-semibold select-none">
            {label}
          </span>
        )}
      </div>
    </>
  );
}

