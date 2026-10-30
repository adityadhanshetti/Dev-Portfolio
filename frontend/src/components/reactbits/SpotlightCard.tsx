import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { useReducedMotion, useCalmMode } from "@/lib/hooks";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(182, 255, 74, 0.08)",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const reducedMotion = useReducedMotion();
  const [calm] = useCalmMode();
  const isEffectDisabled = reducedMotion || calm;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isEffectDisabled) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isEffectDisabled && setOpacity(1)}
      onMouseLeave={() => !isEffectDisabled && setOpacity(0)}
      className={cn(
        "relative overflow-hidden rounded-md border border-line bg-surface-1 transition-colors",
        className
      )}
    >
      {/* Dynamic spotlight overlay */}
      {!isEffectDisabled && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 40%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

