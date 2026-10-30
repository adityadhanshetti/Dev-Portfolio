import { Section } from "@/components/ui/Section";
import { chapters, timeline, stats, techStack } from "@/content/copy";
import { CountUp } from "@/components/reactbits/CountUp";

/**
 * SignalLog — Chapter 04
 * Real stats with Count Up animation + dated timeline + marquee tech loop.
 */
export function SignalLog() {
  return (
    <Section chapter="06" eyebrow={chapters["06"].eyebrow}>
      {/* Stats row with animated CountUp */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-20 md:mb-28">
        {stats.map((stat) => (
          <div key={stat.label} className="border-l-2 border-accent/40 pl-5">
            <span
              className="font-display block text-accent tracking-tight"
              style={{ fontSize: "var(--text-h1)" }}
            >
              <CountUp to={stat.value} suffix={stat.suffix} />
            </span>
            <span className="font-mono text-label text-text-muted uppercase tracking-wide block mt-1">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <h2
        className="font-display mb-12"
        style={{ fontSize: "var(--text-h2)" }}
      >
        {chapters["04"].title}
      </h2>

      <div className="flex flex-col">
        {timeline.map((entry, i) => (
          <div key={i} className="group">
            <hr className="hairline" />
            <div className="grid grid-cols-12 gap-[var(--grid-gutter)] py-6 md:py-9 transition-colors group-hover:bg-surface-1/40">
              <div className="col-span-3 md:col-span-2">
                <span className="font-mono text-label text-text-faint group-hover:text-accent transition-colors">
                  {entry.date}
                </span>
              </div>
              <div className="col-span-9 md:col-span-4">
                <h3 className="font-display text-h3" style={{ fontSize: "var(--text-h3)" }}>
                  {entry.title}
                </h3>
              </div>
              <div className="col-span-12 md:col-span-6 mt-2 md:mt-0">
                <p className="text-text-muted leading-relaxed">{entry.description}</p>
              </div>
            </div>
          </div>
        ))}
        <hr className="hairline" />
      </div>

      {/* Tech stack infinite marquee loop */}
      <div className="mt-20 md:mt-28 overflow-hidden py-4 border-y border-line">
        <div className="flex w-max gap-8 animate-[marquee_25s_linear_infinite] motion-reduce:animate-none hover:[animation-play-state:paused]">
          {[...techStack, ...techStack].map((tech, idx) => (
            <span
              key={`${tech}-${idx}`}
              className="flex items-center gap-3 font-mono text-label text-text-muted uppercase tracking-widest"
            >
              <span className="text-accent text-[8px]">●</span>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
