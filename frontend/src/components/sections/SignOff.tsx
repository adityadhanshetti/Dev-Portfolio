import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { chapters } from "@/content/copy";
import { profile } from "@/content/profile";
import { useLocalTime } from "@/lib/hooks";

/**
 * SignOff — Chapter 06
 * Terminal-style contact section: email, links, local time.
 * Typed terminal animation added in Phase 4.
 * Magnet CTA added in Phase 4.
 * Footer scroll transition (Pacôme-style) added in Phase 4.
 */
export function SignOff() {
  const localTime = useLocalTime(profile.timezone);

  return (
    <Section id="contact" chapter="08" eyebrow="08 // GET IN TOUCH">
      <div className="max-w-3xl">
        <span className="font-mono text-label text-[#ed4a1c] uppercase tracking-widest block mb-4">
          CONTACT & COLLABORATION
        </span>
        <h2
          className="font-display font-black tracking-tighter uppercase text-[#05080c] mb-8"
          style={{ fontSize: "var(--text-h1)" }}
        >
          Have an idea? Let's build something extraordinary.
        </h2>

        {/* Clean DOVV-style card */}
        <div className="bg-white border border-black/8 rounded-3xl p-8 md:p-12 font-mono text-sm relative overflow-hidden shadow-xs">
          {/* Location & time */}
          <div className="flex items-center gap-3 text-text-faint mb-6 text-xs">
            <span>📍 {profile.location}</span>
            <span>·</span>
            <span>{localTime} IST</span>
          </div>

          <p className="text-text-muted text-base leading-relaxed mb-8 font-body">
            Whether you have a product to build, an engineering architecture to scale,
            or a creative digital experience in mind, my inbox is always open.
          </p>

          {/* Email CTA Button */}
          <a
            href={`mailto:${profile.links.email}`}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#ed4a1c] hover:bg-[#ff5722] text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-[0_8px_30px_rgba(237,74,28,0.4)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Say Hello: {profile.links.email}</span>
            <span>→</span>
          </a>

          {/* Social links */}
          <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap gap-6 text-xs text-text-muted">
            {Object.entries(profile.links)
              .filter(([key]) => key !== "email")
              .map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ed4a1c] transition-colors uppercase tracking-wider"
                >
                  {key} ↗
                </a>
              ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

