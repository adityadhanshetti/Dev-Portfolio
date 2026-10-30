import { useState, useRef, type ReactNode } from "react";

interface HolographicStickerProps {
  children: ReactNode;
  rotation?: number; // e.g. -9 or 7 deg
  className?: string;
  variant?: "flame" | "lime" | "rainbow" | "pink";
  shape?: "pill" | "star";
  badgeText?: string;
}

/**
 * HolographicSticker — Signature DOVV Studio Interactive Sticker.
 * Features:
 * - Dynamic metallic/foil gradient fill.
 * - Interactive mouse-following holographic light shine.
 * - Floating ambient sway with springy hover tilt.
 * - Die-cut border with realistic shadow.
 * - Supports pill and starburst shapes (DOVV 4.9 rating badge).
 */
export function HolographicSticker({
  children,
  rotation = -6,
  className = "",
  variant = "flame",
  shape = "pill",
}: HolographicStickerProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPct = (x / rect.width) * 100;
    const yPct = (y / rect.height) * 100;

    setShinePos({ x: xPct, y: yPct });

    // Subtle 3D tilt calculation (-12deg to +12deg)
    const tiltX = (y / rect.height - 0.5) * -16;
    const tiltY = (x / rect.width - 0.5) * 16;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const foilGradients = {
    flame: "from-[#ed4a1c] via-[#ff7a3d] to-[#ff4f7a]",
    lime: "from-[#c6f432] via-[#a8f05a] to-[#7ff0b0]",
    rainbow: "from-[#ed4a1c] via-[#c6f432] to-[#ff7ac6]",
    pink: "from-[#ff3d8b] via-[#ff6ba9] to-[#ff9ec6]",
  };

  const textColors = {
    flame: "text-white",
    lime: "text-[#05080c]",
    rainbow: "text-white",
    pink: "text-white",
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block cursor-grab active:cursor-grabbing select-none transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{
        transform: `rotate(${rotation}deg) perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${
          isHovered ? 1.08 : 1
        })`,
      }}
    >
      {shape === "star" ? (
        /* Starburst Badge (DOVV 4.9 rating badge) */
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.14)]">
          {/* Star SVG with border & gradient */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="limeStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c6f432" />
                <stop offset="60%" stopColor="#b4f028" />
                <stop offset="100%" stopColor="#8ff050" />
              </linearGradient>
            </defs>
            <polygon
              points="50,2 61,15 78,9 82,26 98,31 92,48 100,64 86,74 86,91 70,92 61,100 50,92 39,100 30,92 14,91 14,74 0,64 8,48 2,31 18,26 22,9 39,15"
              fill="url(#limeStarGrad)"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </svg>
          <div
            className={`relative z-10 flex flex-col items-center justify-center text-center font-display ${textColors[variant]}`}
          >
            {children}
          </div>
        </div>
      ) : (
        /* Standard Pill Sticker */
        <div
          className={`relative px-4 py-2 sm:px-6 sm:py-2.5 rounded-full border-2 border-white shadow-[0_14px_30px_rgba(0,0,0,0.12)] overflow-hidden bg-gradient-to-r ${foilGradients[variant]}`}
        >
          {/* Holographic light reflection sheen */}
          <div
            className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-300 mix-blend-overlay"
            style={{
              background: `radial-gradient(circle 90px at ${shinePos.x}% ${shinePos.y}%, rgba(255,255,255,0.9), transparent 70%)`,
            }}
          />

          {/* Content */}
          <div
            className={`relative z-10 flex items-center gap-2 font-display text-xs sm:text-sm font-black uppercase tracking-wider ${textColors[variant]}`}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

