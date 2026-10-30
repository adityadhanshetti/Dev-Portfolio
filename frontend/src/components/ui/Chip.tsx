import { cn } from "@/lib/utils";

interface ChipProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Chip — DESIGN.md §7
 * Mono font, 1px border, 4px radius.
 */
export function Chip({ children, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center",
        "px-3 py-1",
        "font-mono text-label",
        "text-text-muted",
        "border border-line-strong",
        "rounded-sm",
        className
      )}
    >
      {children}
    </span>
  );
}

