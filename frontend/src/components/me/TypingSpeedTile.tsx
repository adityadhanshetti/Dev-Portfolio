import { useState, type KeyboardEvent } from "react";

export function TypingSpeedTile() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([
    "Terminal session ready. Type 'help' for diagnostics or commands.",
  ]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      const cmd = input.trim().toLowerCase();
      let response = "";

      switch (cmd) {
        case "help":
          response = "Available: stack, security, ping, philosophy, clear";
          break;
        case "stack":
          response = "React, TypeScript, Node.js, PostgreSQL, Redis, GSAP, Tailwind v4";
          break;
        case "security":
          response = "Anomaly detection / behavioral trust models via Sentinel Layer.";
          break;
        case "ping":
          response = "pong -> latency: 12ms to Asia/Kolkata";
          break;
        case "philosophy":
          response = "'Quiet signal, loud details.' Craft every pixel with intent.";
          break;
        case "clear":
          setOutput([]);
          setInput("");
          return;
        default:
          response = `Command '${cmd}' unrecognized. Try 'help'.`;
      }

      setOutput((prev) => [...prev.slice(-4), `> ${input}`, response]);
      setInput("");
    }
  };

  return (
    <div className="col-span-4 md:col-span-6 lg:col-span-7 bg-surface-1 border border-line rounded-md p-6 min-h-[260px] flex flex-col justify-between font-mono">
      <div>
        <div className="flex items-center justify-between mb-3 border-b border-line pb-2">
          <span className="eyebrow block">03 // SHELL INTERFACE</span>
          <span className="text-[10px] text-text-faint">TTY: /DEV/PTS/0</span>
        </div>

        <div className="space-y-1 text-xs text-text-muted mt-2">
          {output.map((line, i) => (
            <div
              key={i}
              className={line.startsWith(">") ? "text-accent font-semibold" : "text-text-muted"}
            >
              {line}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-line/60 flex items-center gap-2 text-xs">
        <span className="text-accent font-bold">visitor@sentinel:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type command & press Enter..."
          className="bg-transparent text-text outline-none flex-1 font-mono placeholder:text-text-faint text-xs"
        />
      </div>
    </div>
  );
}

