import { Section } from "@/components/ui/Section";
import InfiniteSpiral, { type InfiniteSpiralItem } from "@/components/reactbits/InfiniteSpiral";
import ScrollReveal from "@/components/reactbits/ScrollReveal";

// Curated high-res portrait placeholders for Aditya
const adityaPlaceholderImages: InfiniteSpiralItem[] = [
  {
    id: "aditya-1",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    alt: "Aditya Dhanshetti — Full-Stack Developer",
    label: "Aditya Dhanshetti",
  },
  {
    id: "aditya-2",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    alt: "Aditya Dhanshetti — Architecture & System Design",
    label: "System Design",
  },
  {
    id: "aditya-3",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    alt: "Aditya Dhanshetti — Creative Development",
    label: "Creative Code",
  },
  {
    id: "aditya-4",
    src: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop",
    alt: "Aditya Dhanshetti — GSAP & Motion Interactions",
    label: "Motion & Craft",
  },
  {
    id: "aditya-5",
    src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    alt: "Aditya Dhanshetti — Clean Code & Scalability",
    label: "Clean Code",
  },
  {
    id: "aditya-6",
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    alt: "Aditya Dhanshetti — End-to-End Delivery",
    label: "Zero Hand-offs",
  },
];

/**
 * About Aditya — DOVV Studio Clean & Freeform Layout.
 * - Left side: Free-floating 3D interactive InfiniteSpiral without boxes or cards.
 * - Right side: Single big impactful paragraph with word-by-word ScrollReveal (no extra cards or clutter).
 */
export function GetToKnowMe() {
  return (
    <Section id="about" chapter="03" eyebrow="03 // ABOUT ADITYA" className="relative">
      {/* Section Header */}
      <div className="mb-12">
        <span className="font-mono text-label text-[#ed4a1c] uppercase tracking-widest block mb-2 font-semibold">
          THE DEVELOPER BEHIND THE WORK
        </span>
        <h2
          className="font-display font-black tracking-tighter uppercase text-[#05080c]"
          style={{ fontSize: "var(--text-h1)" }}
        >
          About Aditya
        </h2>
      </div>

      {/* Freeform 2-Column Grid (30% - 70% Ratio) */}
      <div className="z-50 grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-14 items-center">
        {/* Left Side (30%): Free-floating React Bits InfiniteSpiral */}
        <div className="lg:col-span-3 relative w-full h-[460px] sm:h-[540px] lg:h-[640px] overflow-hidden flex items-center justify-center select-none">
          <InfiniteSpiral
            items={adityaPlaceholderImages}
            speed={0.25}
            direction="up"
            animationMode="all"
            radius={200}
            cardWidth={120}
            cardHeight={175}
            verticalSpacing={65}
            cardRadius={14}
            cardsPerTurn={6}
            perspective={650}
            pauseOnHover={true}
            className="w-full h-full"
          />
        </div>

        {/* Right Side (70%): Single Big Paragraph with ScrollReveal */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <ScrollReveal
            mode="scrub"
            splitBy="words"
            enableBlur={false}
            baseOpacity={0.12}
            highlightColor="#ed4a1c"
            duration={0.25}
            textClassName="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.85rem] font-bold text-[#05080c] leading-[1.32] tracking-tight"
          >
            I'm Aditya, the developer and systems architect behind these digital experiences. I design and build web applications from the first sketch to the last line of code, so strategy, user experience, and robust architecture stay in the same hands and nothing gets lost along the way.
          </ScrollReveal>
        </div>
      </div>
    </Section>
  );
}
