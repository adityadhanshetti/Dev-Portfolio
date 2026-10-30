import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { profile } from "@/content/profile";
import { TrustScoreTile } from "@/components/me/TrustScoreTile";
import { MusicGridTile } from "@/components/me/MusicGridTile";
import { TypingSpeedTile } from "@/components/me/TypingSpeedTile";
import { VariableBioTile } from "@/components/me/VariableBioTile";
import { ClickSpark } from "@/components/me/ClickSpark";
import { useCalmMode } from "@/lib/hooks";

/**
 * PersonalityPage — /me ("Control Room")
 * High-impact interactive playground honoring user curiosity:
 * - Telemetry Trust score engine
 * - Audio radar / coding playlists
 * - Shell terminal interface
 * - Variable typography bio
 * - Interactive ClickSpark particle effects
 */
export function PersonalityPage() {
  const [calm, toggleCalm] = useCalmMode();

  return (
    <ClickSpark>
      <div className="min-h-screen">
        {/* Header */}
        <Section chapter="05" className="pt-32 pb-12" fullBleed>
          <div className="mx-auto max-w-[var(--grid-max-width)] px-[var(--grid-gutter)]">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <span className="eyebrow block">05 // CONTROL ROOM</span>
              <button
                onClick={toggleCalm}
                className="font-mono text-label px-3 py-1.5 border border-line hover:border-accent text-text-muted hover:text-accent transition-colors cursor-pointer"
              >
                {calm ? "● CALM MODE ON" : "○ CALM MODE OFF"}
              </button>
            </div>

            <h1
              className="font-display mb-6 tracking-tight"
              style={{ fontSize: "var(--text-h1)" }}
            >
              /me — Artifacts of Personality
            </h1>
            <p className="text-text-muted max-w-[var(--max-prose)] text-lg leading-relaxed">
              Welcome to the control room. This space is designed to be probed.
              Interact with the diagnostic modules below, listen to the radar tracks,
              or test commands in the shell.
            </p>
          </div>
        </Section>

        {/* Bento Grid Modules */}
        <div className="mx-auto max-w-[var(--grid-max-width)] px-[var(--grid-gutter)] pb-24">
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4 lg:gap-6">
            {/* Tile 1: Trust Score Engine */}
            <TrustScoreTile />

            {/* Tile 2: Music Grid Radar */}
            <MusicGridTile />

            {/* Tile 3: Shell Terminal */}
            <TypingSpeedTile />

            {/* Tile 4: Variable Typography Bio */}
            <VariableBioTile />

            {/* Tile 5: Location */}
            <div className="col-span-4 md:col-span-3 lg:col-span-6 bg-surface-1 border border-line rounded-md p-6 min-h-[180px] flex flex-col justify-between">
              <span className="eyebrow block">05 // LOCATION</span>
              <div>
                <span className="font-display text-h2 block">{profile.location}</span>
                <span className="font-mono text-xs text-text-faint">{profile.timezone}</span>
              </div>
              <div className="text-text-faint font-mono text-xs">PUNE, INDIA</div>
            </div>

            {/* Tile 6: Philosophy Statement */}
            <div className="col-span-4 md:col-span-3 lg:col-span-6 bg-surface-1 border border-line rounded-md p-6 min-h-[180px] flex flex-col justify-between">
              <span className="eyebrow block">06 // DIRECTIVE</span>
              <p className="text-text-muted text-sm font-mono leading-relaxed">
                "The winners commit to one concept, keep the palette tiny, and
                put the weirdness in interaction and structure, not in clutter."
              </p>
              <span className="text-text-faint font-mono text-xs">DESIGN_PROTOCOL_V2</span>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mx-auto max-w-[var(--grid-max-width)] px-[var(--grid-gutter)] pb-24 text-center">
          <Button as="a" href="/" variant="secondary">
            ← Return to Session Feed
          </Button>
        </div>
      </div>
    </ClickSpark>
  );
}
