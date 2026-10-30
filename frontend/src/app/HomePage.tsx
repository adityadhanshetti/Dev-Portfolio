import { lazy, Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { CaseFiles } from "@/components/sections/CaseFiles";
import { GetToKnowMe } from "@/components/sections/GetToKnowMe";
import { HowIThink } from "@/components/sections/HowIThink";
import { SignalLog } from "@/components/sections/SignalLog";
import { MeTeaser } from "@/components/sections/MeTeaser";
import { SignOff } from "@/components/sections/SignOff";

const MusicSection = lazy(() =>
  import("@/components/sections/MusicSection").then((m) => ({
    default: m.MusicSection,
  }))
);

/**
 * HomePage — Composes all chapters in sequential order.
 * Includes:
 * 1. Hero with official React Bits Aurora & refined typography
 * 2. Case Files (Selected client works)
 * 3. Get To Know Me (Playful interactive storytelling bento)
 * 4. How I Think (Operating principles)
 * 5. Music Section (Sonic ecosystem)
 * 6. Signal Log (Telemetry & stats)
 * 7. /me Teaser (Control room gateway)
 * 8. Sign-off (Terminal contact)
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <CaseFiles />
      <GetToKnowMe />
      <HowIThink />
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <MusicSection />
      </Suspense>
      <SignalLog />
      <MeTeaser />
      <SignOff />
    </>
  );
}
