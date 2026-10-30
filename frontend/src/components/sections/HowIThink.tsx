import { Section } from "@/components/ui/Section";
import { chapters, beliefs } from "@/content/copy";
import { ScrollReveal } from "@/components/reactbits/ScrollReveal";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";

/**
 * HowIThink — Chapter 03
 * 3 beliefs / working principles on a layered layout with
 * scroll-linked word filling and floating numeral parallax.
 */
export function HowIThink() {
  return (
    <Section chapter="04" eyebrow={chapters["04"].eyebrow}>
      <h2
        className="font-display mb-16 text-text"
        style={{ fontSize: "var(--text-h2)" }}
      >
        {chapters["04"].title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-28">
        {beliefs.map((belief) => (
          <div key={belief.number} className="md:col-span-12 relative overflow-hidden">
            {/* Outline numeral drifting in background parallax */}
            <ParallaxLayer
              speed={0.14}
              className="absolute -top-10 -left-4 pointer-events-none select-none z-0 opacity-10"
            >
              <span
                className="font-display text-text block"
                style={{ fontSize: "clamp(6rem, 16vw, 15rem)" }}
                aria-hidden="true"
              >
                {belief.number}
              </span>
            </ParallaxLayer>

            <div className="relative z-10 max-w-[var(--max-prose)] pt-8">
              <span className="font-mono text-label text-accent uppercase tracking-widest block mb-2">
                RULE #{belief.number}
              </span>
              <h3
                className="font-display mb-6"
                style={{ fontSize: "var(--text-h2)" }}
              >
                {belief.title}
              </h3>

              {/* Scroll reveal scrubbing words from faint to full */}
              <ScrollReveal
                className="text-text-muted text-lg md:text-xl font-body"
                wordClassName="text-text"
              >
                {belief.body}
              </ScrollReveal>
            </div>

            <hr className="hairline mt-16" />
          </div>
        ))}
      </div>
    </Section>
  );
}
