import { profile } from "@/content/profile";

/**
 * Footer — minimal: links, copyright.
 * Footer scroll transition (Pacôme-style) added in Phase 4.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[var(--grid-max-width)] px-[var(--grid-gutter)] py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-label text-text-faint">
            © {year} {profile.name}
          </span>

          <div className="flex gap-6">
            {Object.entries(profile.links)
              .filter(([key]) => key !== "email")
              .map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-label text-text-faint hover:text-[#ed4a1c] transition-colors duration-200 capitalize"
                >
                  {key}
                </a>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

