import { cn } from "@/lib/utils";
import { useActiveChapter } from "@/lib/hooks";
import { chapters } from "@/content/copy";

const chapterKeys = Object.keys(chapters) as Array<keyof typeof chapters>;

/**
 * ChapterRail — Minimalist Editorial Navigation.
 * Sharp rectangular markers, zero rounded capsules.
 */
export function ChapterRail() {
  const activeChapter = useActiveChapter();

  const handleClick = (chapter: string) => {
    const target = document.querySelector(`[data-chapter="${chapter}"]`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Desktop rail */}
      <nav
        aria-label="Chapter navigation"
        className="hidden lg:flex fixed left-0 top-0 z-50 h-screen flex-col items-center justify-center gap-3"
        style={{ width: "var(--chapter-rail-width)" }}
      >
        {chapterKeys.map((key) => {
          const isActive = activeChapter === key;
          return (
            <button
              key={key}
              onClick={() => handleClick(key)}
              aria-label={`Go to chapter ${chapters[key].eyebrow}`}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "w-7 h-7 flex items-center justify-center",
                "font-mono text-[10px]",
                "border transition-all duration-200",
                "cursor-pointer",
                "min-w-[40px] min-h-[40px]",
                isActive
                  ? "bg-cyan-400 text-black border-cyan-400 font-bold shadow-[0_0_12px_rgba(34,211,238,0.3)]"
                  : "border-white/10 text-text-faint hover:text-white hover:border-white/40 bg-surface-1/40"
              )}
            >
              {key}
            </button>
          );
        })}
      </nav>

      {/* Mobile progress indicator */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-[2px] bg-surface-1">
        <div
          className="h-full bg-cyan-400 transition-all duration-300"
          style={{
            width: `${((parseInt(activeChapter) + 1) / chapterKeys.length) * 100}%`,
          }}
        />
      </div>
    </>
  );
}
