import { Hero } from "@/components/sections/Hero";
import { CaseFiles } from "@/components/sections/CaseFiles";
import { Skills } from "@/components/sections/Skills";
import { GetToKnowMe } from "@/components/sections/GetToKnowMe";
import { HowIThink } from "@/components/sections/HowIThink";
import { SignalLog } from "@/components/sections/SignalLog";

/**
 * HomePage — Composes all chapters in sequential order.
 * Includes:
 * 1. Hero with official React Bits Aurora & refined typography
 * 2. Case Files (Selected client works)
 * 3. Skills (Interactive React Bits FolderFloat Physics Showcase)
 * 4. Get To Know Me (The developer behind the work)
 * 5. How I Think (Operating principles)
 * 6. Signal Log (Telemetry, career timeline & stats)
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <CaseFiles />
      <Skills />
      <GetToKnowMe />
      <HowIThink />
      <SignalLog />
    </>
  );
}
