import { useReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className = "",
}: ShinyTextProps) {
  const reducedMotion = useReducedMotion();

  if (disabled || reducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent bg-gradient-to-r from-text-muted via-accent to-text-muted bg-[length:200%_auto] animate-shimmer",
        className
      )}
      style={{
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </span>
  );
}

