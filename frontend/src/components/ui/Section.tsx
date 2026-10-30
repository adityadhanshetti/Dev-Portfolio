import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  chapter: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
  fullBleed?: boolean;
}

/**
 * Section wrapper — provides consistent padding, max-width,
 * chapter data attribute (for rail tracking), and eyebrow label.
 */
export function Section({
  id,
  chapter,
  eyebrow,
  children,
  className,
  fullBleed = false,
}: SectionProps) {
  return (
    <section
      id={id}
      data-chapter={chapter}
      className={cn(
        "relative",
        !fullBleed && "mx-auto max-w-[var(--grid-max-width)] px-[var(--grid-gutter)]",
        className
      )}
      style={{ paddingBlock: "var(--section-padding)" }}
    >
      {eyebrow && (
        <div className="eyebrow mb-8 md:mb-12">
          <span>{eyebrow}</span>
          <hr className="hairline mt-4" />
        </div>
      )}
      {children}
    </section>
  );
}

