import { useEffect, useState } from "react";
import { DecryptedText } from "@/components/reactbits/DecryptedText";

export function TrustScoreTile() {
  const [score, setScore] = useState(0.94);
  const [interactions, setInteractions] = useState(0);

  const boostScore = () => {
    setInteractions((prev) => prev + 1);
    setScore((prev) => Math.min(0.999, +(prev + 0.005).toFixed(3)));
  };

  return (
    <div
      onClick={boostScore}
      className="col-span-4 md:col-span-3 lg:col-span-6 bg-surface-1 border border-line hover:border-accent/50 rounded-md p-6 md:p-8 min-h-[220px] flex flex-col justify-between transition-all cursor-pointer group"
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="eyebrow block">01 // TELEMETRY TOY</span>
          <span className="font-mono text-[10px] text-accent uppercase tracking-wider">
            CLICK TO CALIBRATE
          </span>
        </div>
        <div className="flex items-baseline gap-4 mt-2">
          <span
            className="font-display text-accent tracking-tighter"
            style={{ fontSize: "var(--text-h1)" }}
          >
            {score.toFixed(2)}
          </span>
          <span className="font-mono text-label text-text-muted">
            / 1.00 TRUST RATIO
          </span>
        </div>
        <p className="text-text-faint text-xs font-mono mt-1">
          <DecryptedText
            text={
              score >= 0.98
                ? "SECURITY CLEARANCE: ROOT PRIVILEGE GRANTED"
                : "STATUS: VERIFYING BEHAVIORAL PROFILE"
            }
            speed={25}
          />
        </p>
      </div>

      <div className="pt-4 border-t border-line/60 flex items-center justify-between text-text-faint font-mono text-[11px]">
        <span>SAMPLES RECORDED: {interactions}</span>
        <span className="text-accent group-hover:translate-x-1 transition-transform">
          PROBE CLIENT +
        </span>
      </div>
    </div>
  );
}

