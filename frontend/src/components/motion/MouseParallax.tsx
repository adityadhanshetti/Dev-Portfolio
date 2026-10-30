import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { FLAGS } from "@/lib/flags";
import { useReducedMotion, useCalmMode, useIsDesktopCapable } from "@/lib/hooks";
import { cn } from "@/lib/utils";

interface MouseParallaxProps {
  children: ReactNode;
  depth?: number; // Maximum pixel displacement (e.g. 20 - 40)
  className?: string;
}

export function MouseParallax({
  children,
  depth = 25,
  className,
}: MouseParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [calm] = useCalmMode();
  const isDesktop = useIsDesktopCapable();

  const isDisabled = !FLAGS.PARALLAX || reducedMotion || calm || !isDesktop;

  useEffect(() => {
    const el = containerRef.current;
    if (!el || isDisabled) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xOffset = (e.clientX / innerWidth - 0.5) * depth;
      const yOffset = (e.clientY / innerHeight - 0.5) * depth;
      xTo(xOffset);
      yTo(yOffset);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [depth, isDisabled]);

  return (
    <div ref={containerRef} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}

