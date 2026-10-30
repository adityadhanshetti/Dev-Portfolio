import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion, useCalmMode } from "@/lib/hooks";

gsap.registerPlugin(ScrollTrigger);

interface FloatingCardItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  topPercent: number; // Vertical anchor (0-100% of entire page)
  align: "left" | "right";
  offset: string; // Horizontal offset from margin (e.g. "4%", "8%")
  speed: number; // Parallax translation speed (-0.3 to 0.4)
  rotation: number; // Tilt degrees (-8 to 8)
  width: number;
  height: number;
}

const defaultCards: FloatingCardItem[] = [
  {
    id: "card-1",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=700&auto=format&fit=crop",
    title: "Field Artifact 01",
    subtitle: "Canopy fog & moisture study",
    topPercent: 18,
    align: "right",
    offset: "2%",
    speed: 0.35,
    rotation: 5,
    width: 220,
    height: 290,
  },
  {
    id: "card-2",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=700&auto=format&fit=crop",
    title: "Ancient Basalt & Lichen",
    subtitle: "Yakushima, Japan",
    topPercent: 42,
    align: "left",
    offset: "3%",
    speed: -0.25,
    rotation: -4,
    width: 240,
    height: 310,
  },
  {
    id: "card-3",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=700&auto=format&fit=crop",
    title: "Alpine Sanctuary",
    subtitle: "Reflection & clarity",
    topPercent: 68,
    align: "right",
    offset: "3%",
    speed: 0.3,
    rotation: -5,
    width: 230,
    height: 300,
  },
  {
    id: "card-4",
    image: "https://images.unsplash.com/photo-1511497584788-87676104235f?q=80&w=700&auto=format&fit=crop",
    title: "Bioluminescence",
    subtitle: "Night trail exploration",
    topPercent: 88,
    align: "left",
    offset: "4%",
    speed: -0.2,
    rotation: 6,
    width: 210,
    height: 280,
  },
];

/**
 * FloatingAmbientCards
 * Renders atmospheric polaroid/photo cards drifting in the background
 * between sections. Low default opacity that lights up on hover,
 * with multi-speed scroll parallax.
 */
export function FloatingAmbientCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [calm] = useCalmMode();

  const isDisabled = reducedMotion || calm;

  useEffect(() => {
    if (isDisabled || !containerRef.current) return;

    const cards = containerRef.current.querySelectorAll<HTMLElement>("[data-card-speed]");

    const ctx = gsap.context(() => {
      cards.forEach((card) => {
        const speed = parseFloat(card.dataset.cardSpeed || "0.2");
        const isMobile = window.innerWidth < 1024;
        if (isMobile) return; // Keep clean on small mobile viewports

        gsap.fromTo(
          card,
          { yPercent: -speed * 50 },
          {
            yPercent: speed * 50,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isDisabled]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden hidden lg:block"
      aria-hidden="true"
    >
      {defaultCards.map((card) => (
        <div
          key={card.id}
          data-card-speed={card.speed}
          className="absolute pointer-events-auto group transition-all duration-500 ease-out will-change-transform"
          style={{
            top: `${card.topPercent}%`,
            ...(card.align === "left" ? { left: card.offset } : { right: card.offset }),
            width: `${card.width}px`,
            transform: `rotate(${card.rotation}deg)`,
          }}
        >
          {/* Card Frame: Crisp white polaroid on DOVV off-white canvas */}
          <div className="relative border border-black/10 bg-white p-2.5 shadow-lg rounded-xl transition-all duration-500 opacity-40 group-hover:opacity-100 group-hover:scale-105 group-hover:border-[#ed4a1c] group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
            <div
              className="relative overflow-hidden bg-neutral-100 border border-black/5 rounded-lg"
              style={{ height: `${card.height}px` }}
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            </div>

            <div className="pt-2 px-1">
              <span className="font-mono text-[9px] text-[#ed4a1c] uppercase tracking-widest block font-bold">
                {card.title}
              </span>
              <p className="font-body text-[11px] text-[#5b5b5b] truncate mt-0.5 font-medium">
                {card.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

