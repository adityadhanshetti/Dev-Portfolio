import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary";

type ButtonAsButton = {
  as?: "button";
  variant?: Variant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsAnchor = {
  as: "a";
  variant?: Variant;
  href: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

/**
 * Button component — DESIGN.md §7
 * Primary: accent fill, pill shape, clip-path wipe on hover (Phase 4).
 * Secondary: 1px border.
 * Hit area ≥ 44px.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", className, children, ...rest } = props;

  const classes = cn(
    // Base
    "relative inline-flex items-center justify-center",
    "font-mono text-label uppercase tracking-[0.08em]",
    "min-h-[44px] px-6 py-3",
    "rounded-none",
    "transition-colors duration-200",
    "cursor-pointer",
    // Variant
    variant === "primary" && [
      "bg-accent text-accent-ink",
      "hover:bg-accent/90",
    ],
    variant === "secondary" && [
      "bg-transparent text-text",
      "border border-line-strong",
      "hover:border-accent hover:text-accent",
    ],
    className
  );

  if (props.as === "a") {
    const { as: _, variant: __, ...anchorProps } = props as ButtonAsAnchor;
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { as: _, variant: __, ...buttonProps } = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}

