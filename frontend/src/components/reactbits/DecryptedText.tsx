import { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "@/lib/hooks";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: "view" | "hover" | "mount";
  onComplete?: () => void;
}

export function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = true,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><,./-=",
  className = "",
  parentClassName = "",
  encryptedClassName = "text-accent opacity-70",
  animateOn = "mount",
  onComplete,
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let currentIteration = 0;

    const getNextChar = (originalChar: string) => {
      if (originalChar === " ") return " ";
      if (useOriginalCharsOnly) {
        const chars = Array.from(text).filter((c) => c !== " ");
        return chars[Math.floor(Math.random() * chars.length)];
      }
      return characters[Math.floor(Math.random() * characters.length)];
    };

    if (reducedMotion) {
      setDisplayText(text);
      onComplete?.();
      return;
    }

    if (animateOn === "hover" && !isHovering) {
      setDisplayText(text);
      return;
    }

    setIsScrambling(true);

    interval = setInterval(() => {
      setRevealedIndices((prev) => {
        if (sequential) {
          if (prev.size >= text.length) {
            clearInterval(interval);
            setIsScrambling(false);
            onComplete?.();
            return prev;
          }
          const next = new Set(prev);
          if (revealDirection === "end") {
            next.add(text.length - 1 - prev.size);
          } else {
            next.add(prev.size);
          }
          return next;
        } else {
          currentIteration++;
          if (currentIteration >= maxIterations) {
            clearInterval(interval);
            setIsScrambling(false);
            onComplete?.();
            return new Set(Array.from({ length: text.length }, (_, i) => i));
          }
          return prev;
        }
      });

      setDisplayText((current) =>
        Array.from(text)
          .map((char, i) => {
            if (char === " ") return " ";
            if (revealedIndices.has(i)) return text[i];
            return getNextChar(char);
          })
          .join("")
      );
    }, speed);

    return () => clearInterval(interval);
  }, [animateOn, isHovering, text, speed, maxIterations, sequential, revealDirection, characters, useOriginalCharsOnly, reducedMotion]);

  return (
    <span
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap ${parentClassName}`}
      onMouseEnter={() => animateOn === "hover" && setIsHovering(true)}
      onMouseLeave={() => animateOn === "hover" && setIsHovering(false)}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {Array.from(displayText).map((char, index) => {
          const isRevealed = revealedIndices.has(index) || !isScrambling;
          return (
            <span
              key={index}
              className={isRevealed ? className : encryptedClassName}
            >
              {char}
            </span>
          );
        })}
      </span>
    </span>
  );
}

