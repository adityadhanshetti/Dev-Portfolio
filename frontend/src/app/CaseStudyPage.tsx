import { useParams, Link } from "react-router";
import { Section } from "@/components/ui/Section";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { projects } from "@/content/projects";

/**
 * CaseStudyPage — /work/:slug
 * Template: hero media, meta row (role, year, stack, links),
 * problem, approach, outcome, next case file.
 */
export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <Section chapter="02" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-h1 mb-4" style={{ fontSize: "var(--text-h1)" }}>
            Case file not found
          </h1>
          <Button as="a" href="/" variant="secondary">
            ← Back to home
          </Button>
        </div>
      </Section>
    );
  }

  // Find next project for navigation
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <article>
      {/* Hero */}
      <Section chapter="02" className="min-h-[60vh] flex flex-col justify-end" fullBleed>
        <div className="mx-auto max-w-[var(--grid-max-width)] px-[var(--grid-gutter)] pb-16">
          <span className="eyebrow mb-4 block">Case file {project.index}</span>
          <h1
            className="font-display"
            style={{ fontSize: "var(--text-hero)" }}
          >
            {project.title}
          </h1>
          <p className="text-text-muted mt-4 text-h3" style={{ fontSize: "var(--text-h3)" }}>
            {project.tagline}
          </p>
        </div>
      </Section>

      {/* Meta row */}
      <div className="mx-auto max-w-[var(--grid-max-width)] px-[var(--grid-gutter)]">
        <hr className="hairline" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
          <div>
            <span className="eyebrow block mb-2">Role</span>
            <span className="text-text">{project.role}</span>
          </div>
          <div>
            <span className="eyebrow block mb-2">Year</span>
            <span className="text-text">{project.year}</span>
          </div>
          <div>
            <span className="eyebrow block mb-2">Stack</span>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Chip key={tech}>{tech}</Chip>
              ))}
            </div>
          </div>
          {project.link && (
            <div>
              <span className="eyebrow block mb-2">Link</span>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Visit →
              </a>
            </div>
          )}
        </div>
        <hr className="hairline" />
      </div>

      {/* Content */}
      <div
        className="mx-auto max-w-[var(--grid-max-width)] px-[var(--grid-gutter)]"
        style={{ paddingBlock: "var(--section-padding)" }}
      >
        <div className="max-w-[var(--max-prose)]">
          <h2 className="font-display mb-6" style={{ fontSize: "var(--text-h2)" }}>
            The problem
          </h2>
          <p className="text-text-muted leading-relaxed mb-16">
            {project.problem}
          </p>

          <h2 className="font-display mb-6" style={{ fontSize: "var(--text-h2)" }}>
            Outcome
          </h2>
          <p className="text-text-muted leading-relaxed">
            {project.outcome}
          </p>
        </div>
      </div>

      {/* Next case file */}
      <div className="mx-auto max-w-[var(--grid-max-width)] px-[var(--grid-gutter)] pb-24">
        <hr className="hairline mb-8" />
        <span className="eyebrow mb-4 block">Next case file</span>
        <Link
          to={`/work/${nextProject.slug}`}
          className="font-display text-h2 hover:text-accent transition-colors duration-200"
          style={{ fontSize: "var(--text-h2)" }}
        >
          {nextProject.title} →
        </Link>
      </div>
    </article>
  );
}

