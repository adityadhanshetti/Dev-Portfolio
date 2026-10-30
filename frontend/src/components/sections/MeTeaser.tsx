import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { chapters } from "@/content/copy";
import { SpotlightCard } from "@/components/reactbits/SpotlightCard";

/**
 * MeTeaser — Chapter 05
 * Spotlight Card leading into the /me Control Room interactive page.
 */
export function MeTeaser() {
  return (
    <Section chapter="07" eyebrow={chapters["07"].eyebrow}>
      <div className="flex flex-col items-center">
        <SpotlightCard
          className="w-full max-w-2xl p-10 md:p-16 text-center bg-white border border-black/8 rounded-2xl shadow-xs"
          spotlightColor="rgba(237, 74, 28, 0.08)"
        >
          <span className="font-mono text-label text-accent uppercase tracking-widest block mb-4">
            07 // INTERACTIVE ZONE
          </span>
          <h2
            className="font-display mb-4 tracking-tight"
            style={{ fontSize: "var(--text-h1)" }}
          >
            /me — Control Room
          </h2>
          <p className="text-text-muted mb-8 max-w-lg mx-auto text-body leading-relaxed">
            Enter the interactive playground: an ambient session scoring engine,
            music I code to, real-time typing diagnostics, and unlocked easter eggs.
          </p>
          <Button as="a" href="/me" variant="primary">
            Initialize session →
          </Button>
        </SpotlightCard>
      </div>
    </Section>
  );
}
