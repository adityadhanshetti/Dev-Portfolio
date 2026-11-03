import { useEffect, useState, useMemo, useRef } from "react";

export interface WordItem {
  text: string;
  isSpecial?: boolean;
}

interface BlurTextProps {
  lines: WordItem[][];
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
  onAnimationComplete?: () => void;
  isExiting?: boolean;
}

/**
 * BlurText — Ultra-Smooth Kinetic Masked Reveal.
 *
 * Smooth GPU-composited vertical rise with progressive blur-to-sharp focus.
 * Optimized with backface-visibility and hardware-accelerated transforms.
 */
export function BlurText({
  lines,
  staggerDelay = 220,
  initialDelay = 550,
  className = "",
  onAnimationComplete,
  isExiting = false,
}: BlurTextProps) {
  const allWords = useMemo(() => lines.flat(), [lines]);
  const [revealedCount, setRevealedCount] = useState(0);
  const onCompleteRef = useRef(onAnimationComplete);
  onCompleteRef.current = onAnimationComplete;

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    allWords.forEach((_, globalIndex) => {
      const timeout = setTimeout(() => {
        setRevealedCount((prev) => Math.max(prev, globalIndex + 1));
        if (globalIndex === allWords.length - 1) {
          const completionTimeout = setTimeout(() => {
            onCompleteRef.current?.();
          }, 1400);
          timeouts.push(completionTimeout);
        }
      }, initialDelay + globalIndex * staggerDelay);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [allWords.length, staggerDelay, initialDelay]);

  let wordCounter = 0;

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {lines.map((lineWords, lineIdx) => (
        <div
          key={`line-${lineIdx}`}
          className="flex flex-wrap items-center justify-center gap-x-[0.28em] my-[-0.04em]"
        >
          {lineWords.map((wordObj) => {
            const currentIdx = wordCounter++;
            const isRevealed = currentIdx < revealedCount;

            return (
              <span
                key={`${wordObj.text}-${currentIdx}`}
                className="inline-block overflow-hidden py-1.5 px-1"
                style={{ verticalAlign: "bottom" }}
              >
                <span
                  className={`inline-block transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
                    isExiting ? "transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]" : ""
                  } ${
                    wordObj.isSpecial
                      ? "text-[#ed4a1c]"
                      : "text-white/95"
                  }`}
                  style={{
                    transformOrigin: "50% 100%",
                    transform: isExiting
                      ? "translate3d(0, -32px, 0)"
                      : isRevealed
                      ? "translate3d(0, 0%, 0)"
                      : "translate3d(0, 105%, 0)",
                    filter: isExiting
                      ? "blur(10px)"
                      : isRevealed
                      ? "blur(0px)"
                      : "blur(12px)",
                    opacity: isExiting ? 0 : isRevealed ? 1 : 0,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  {wordObj.text}
                </span>
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
