import { cn } from "@/lib/utils";
import { ShinyText } from "@/components/reactbits/ShinyText";

interface StatusPillProps {
  text?: string;
  className?: string;
}

/**
 * StatusPill — Editorial status lockup.
 * No rounded cylinders, no pulsing ping dots.
 * Clean rectangular hairline badge with steady status marker.
 */
export function StatusPill({
  text = "Available for select work",
  className,
}: StatusPillProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5",
        "px-3 py-1",
        "border border-white/15 bg-white/[0.03] backdrop-blur-sm",
        "font-mono text-label text-text-muted",
        className
      )}
    >
      {/* Steady square status marker */}
      <span className="w-1.5 h-1.5 bg-cyan-400 shrink-0" />
      <ShinyText text={text} speed={4} />
    </div>
  );
}
