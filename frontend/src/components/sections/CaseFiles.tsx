import { Section } from "@/components/ui/Section";
import { Chip } from "@/components/ui/Chip";
import { chapters } from "@/content/copy";
import { projects } from "@/content/projects";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

/**
 * CaseFiles — Chapter 02
 * Numbered project rows with custom cursor hook, sibling dimming,
 * and Parallax on flagship case file.
 */
export function CaseFiles() {
  return (
    <Section id="work" chapter="02" eyebrow="02 // SELECTED WORK" className="relative">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-16 gap-3">
        <div>
          <h2
            className="font-display font-black tracking-tighter uppercase text-[#05080c]"
            style={{ fontSize: "var(--text-h1)" }}
          >
            Selected Work
          </h2>
          <p className="font-body text-text-muted mt-2 text-sm sm:text-base">
            Featured applications built for performance, security, and scale.
          </p>
        </div>
        <span className="font-mono text-label text-text-faint">
          [{projects.length} PROJECTS]
        </span>
      </div>

      <div className="flex flex-col group/list">
        {projects.map((project, i) => (
          <Link
            key={project.slug}
            to={`/work/${project.slug}`}
            data-cursor="VIEW"
            className="group/item block transition-opacity duration-300 group-hover/list:opacity-40 hover:!opacity-100"
          >
            {/* Hairline separator */}
            {i === 0 && <hr className="hairline" />}

            <div
              className={cn(
                "relative grid grid-cols-12 gap-[var(--grid-gutter)] items-center",
                "py-8 md:py-12",
                "transition-all duration-200",
                project.isFlagship && "py-12 md:py-20"
              )}
            >
              {/* Flagship background parallax watermark */}
              {project.isFlagship && (
                <ParallaxLayer
                  speed={0.12}
                  className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none z-0 hidden lg:block opacity-10"
                >
                  <span className="font-display text-[12rem] leading-none text-text">
                    01
                  </span>
                </ParallaxLayer>
              )}

              {/* Index number */}
              <div className="col-span-1 relative z-10">
                <span className="font-mono text-text-faint text-label group-hover/item:text-accent transition-colors">
                  {project.index}
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="col-span-12 md:col-span-5 relative z-10">
                <div className="flex items-center gap-3">
                  <h3
                    className="font-display transition-transform duration-200 group-hover/item:translate-x-1"
                    style={{
                      fontSize: project.isFlagship
                        ? "var(--text-h1)"
                        : "var(--text-h2)",
                    }}
                  >
                    {project.title}
                  </h3>
                  {project.isFlagship && (
                    <span className="font-mono text-[9px] px-2 py-0.5 border border-[#ed4a1c]/40 text-[#ed4a1c] uppercase tracking-widest bg-[#ed4a1c]/10 rounded-sm">
                      Flagship
                    </span>
                  )}
                </div>
                <p className="text-text-muted mt-2 group-hover/item:text-text transition-colors">
                  {project.tagline}
                </p>
              </div>

              {/* Stack chips */}
              <div className="col-span-12 md:col-span-4 flex flex-wrap gap-2 mt-4 md:mt-0 relative z-10">
                {project.stack.slice(0, 4).map((tech) => (
                  <Chip key={tech} className="group-hover/item:border-line-strong">
                    {tech}
                  </Chip>
                ))}
              </div>

              {/* Year & Arrow */}
              <div className="col-span-12 md:col-span-2 text-right relative z-10 flex items-center justify-end gap-3">
                <span className="font-mono text-label text-text-faint">
                  {project.year}
                </span>
                <span className="text-text-faint group-hover/item:text-accent group-hover/item:translate-x-1 transition-all">
                  →
                </span>
              </div>
            </div>

            <hr className="hairline" />
          </Link>
        ))}
      </div>
    </Section>
  );
}
