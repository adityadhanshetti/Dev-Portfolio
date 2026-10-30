import { useState } from "react";

export function VariableBioTile() {
  const [activeKeyword, setActiveKeyword] = useState<string | null>(null);

  const keywords: Record<string, string> = {
    security: "Specialized in post-login anomaly profiling & account takeover prevention.",
    systems: "High-throughput APIs designed for resilience and sub-50ms latency.",
    craft: "Obsessed with buttery 60fps animations, keyboard accessibility, and Swiss restraint.",
  };

  return (
    <div className="col-span-4 md:col-span-6 lg:col-span-5 bg-surface-1 border border-line rounded-md p-6 md:p-8 min-h-[260px] flex flex-col justify-between">
      <div>
        <span className="eyebrow block mb-4">04 // KINETIC BIO</span>
        <p className="text-text leading-relaxed text-base font-body">
          I build resilient{" "}
          <span
            onMouseEnter={() => setActiveKeyword("security")}
            className="cursor-pointer text-accent underline decoration-dotted font-semibold hover:tracking-wide transition-all"
          >
            security
          </span>{" "}
          products and distributed{" "}
          <span
            onMouseEnter={() => setActiveKeyword("systems")}
            className="cursor-pointer text-accent underline decoration-dotted font-semibold hover:tracking-wide transition-all"
          >
            systems
          </span>
          . I believe in uncompromising{" "}
          <span
            onMouseEnter={() => setActiveKeyword("craft")}
            className="cursor-pointer text-accent underline decoration-dotted font-semibold hover:tracking-wide transition-all"
          >
            craft
          </span>
          , where every interaction rewards user curiosity.
        </p>
      </div>

      <div className="pt-4 border-t border-line/60 font-mono text-xs text-text-muted min-h-[40px] flex items-center">
        {activeKeyword ? (
          <span className="text-accent animate-fadeIn">
            → {keywords[activeKeyword]}
          </span>
        ) : (
          <span className="text-text-faint">
            Hover over highlighted concepts to decrypt context...
          </span>
        )}
      </div>
    </div>
  );
}

