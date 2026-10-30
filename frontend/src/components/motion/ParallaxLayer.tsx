import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FLAGS } from "@/lib/flags";
import { useReducedMotion, useCalmMode } from "@/lib/hooks";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  /**
   * Parallax speed factor:
   *  -0.15 (far background / slow reverse drift)
   *   0.1  (mid layer / subtle forward drift)
   *   0.25–0.4 (near foreground / faster drift)
   */
  speed?: number;
  children: ReactNode;
  className?: string;
  dataParallax?: number;
}

export function ParallaxLayer({
  speed = 0.2,
  children,
  className,
  dataParallax,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [calm] = useCalmMode();

  const effectiveSpeed = dataParallax !== undefined ? dataParallax : speed;
  const isDisabled = !FLAGS.PARALLAX || reducedMotion || calm;

  useEffect(() => {
    const el = ref.current;
    if (!el || isDisabled) return;

    const isMobile = window.innerWidth < 768;
    const adjustedSpeed = isMobile ? effectiveSpeed * 0.4 : effectiveSpeed;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -adjustedSpeed * 40 },
        {
          yPercent: adjustedSpeed * 40,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement || el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [effectiveSpeed, isDisabled]);

  return (
    <div
      ref={ref}
      data-parallax={effectiveSpeed}
      className={cn("will-change-transform", className)}
    >
      {children}
    </div>
  );
}

