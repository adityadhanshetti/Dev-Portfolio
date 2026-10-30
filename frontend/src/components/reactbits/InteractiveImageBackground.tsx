import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion, useCalmMode } from "@/lib/hooks";

interface InteractiveImageBackgroundProps {
  src: string;
  alt?: string;
  className?: string;
  isRevealed?: boolean;
}

/**
 * InteractiveImageBackground — React Bits Inspired Full-Screen Hover Canvas.
 *
 * Features:
 * 1. Cursor Spotlight: A luminous radial beam follows mouse coordinates to illuminate foliage.
 * 2. 3D Spatial Parallax: Image shifts smoothly in counter-direction to cursor movements.
 * 3. Specular Glare: Soft lighting sheen responsive to hover angles.
 * 4. Scale & Depth Breathing: Gentle scale-up and contrast breathing under interaction.
 * 5. AAA Contrast Vignette: Deep gradient scrim ensures typography remains razor sharp.
 */
export function InteractiveImageBackground({
  src,
  alt = "Atmospheric Nature Background",
  className = "",
  isRevealed = true,
}: InteractiveImageBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const reducedMotion = useReducedMotion();
  const [calm] = useCalmMode();
  const isDisabled = reducedMotion || calm;

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    const spotlight = spotlightRef.current;
    if (!container || !img || isDisabled) return;

    // Smooth GSAP physics for mouse parallax displacement
    const xTo = gsap.quickTo(img, "x", { duration: 0.9, ease: "power2.out" });
    const yTo = gsap.quickTo(img, "y", { duration: 0.9, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xPercent = (e.clientX / innerWidth) * 100;
      const yPercent = (e.clientY / innerHeight) * 100;

      setMousePos({ x: xPercent, y: yPercent });

      // Calculate subtle parallax offset (-25px to +25px)
      const xOffset = ((e.clientX / innerWidth) - 0.5) * -32;
      const yOffset = ((e.clientY / innerHeight) - 0.5) * -32;

      xTo(xOffset);
      yTo(yOffset);

      if (spotlight) {
        gsap.to(spotlight, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.35,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDisabled]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-auto ${className}`}
      aria-hidden="true"
    >
      {/* 1. Full-Screen Image with Smooth Parallax & Scale */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`absolute inset-[-4%] w-[108%] h-[108%] object-cover object-center will-change-transform transition-[filter,transform] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isRevealed ? "scale-105 opacity-100 blur-0" : "scale-115 opacity-0 blur-md"
        } ${isHovered ? "brightness-[0.92] contrast-[1.08]" : "brightness-[0.78] contrast-[1.04]"}`}
      />

      {/* 2. React Bits Interactive Spotlight Beam (follows cursor) */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full transition-opacity duration-500 ease-out z-10"
        style={{
          background: `radial-gradient(circle, rgba(34, 211, 238, 0.18) 0%, rgba(99, 102, 241, 0.08) 40%, transparent 70%)`,
          opacity: isHovered && !isDisabled ? 1 : 0.3,
        }}
      />

      {/* 3. React Bits Dynamic Glare Streak */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-700"
        style={{
          background: `linear-gradient(${mousePos.x * 3.6}deg, rgba(255,255,255,0.04) 0%, transparent 45%, rgba(34,211,238,0.06) 100%)`,
          opacity: isHovered ? 0.9 : 0.4,
        }}
      />

      {/* 4. Cinematic Vignette & Editorial Scrim (Ensures text contrast) */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-[#030712]/80" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,7,18,0.75)_85%)]" />
    </div>
  );
}

