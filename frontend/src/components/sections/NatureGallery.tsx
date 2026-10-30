import { Section } from "@/components/ui/Section";
import { TiltedCard } from "@/components/reactbits/TiltedCard";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";

interface NatureArtifact {
  title: string;
  tagline: string;
  image: string;
  location: string;
  elevation: string;
}

const natureArtifacts: NatureArtifact[] = [
  {
    title: "Redwood Canopy Mist",
    tagline: "Atmospheric depth & moisture retention models",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop",
    location: "Pacific Northwest",
    elevation: "840m",
  },
  {
    title: "Bioluminescent Flora",
    tagline: "Self-illuminating organic signal pathways",
    image: "https://images.unsplash.com/photo-1511497584788-87676104235f?q=80&w=1200&auto=format&fit=crop",
    location: "Monteverde Cloud Forest",
    elevation: "1,440m",
  },
  {
    title: "Emerald Alpine Depths",
    tagline: "Still water reflection & tranquility algorithms",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop",
    location: "Val di Funes",
    elevation: "1,750m",
  },
  {
    title: "Deep Moss & Lichen",
    tagline: "Symbiotic fractal scaling on ancient basalt",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1200&auto=format&fit=crop",
    location: "Yakushima Ancient Forest",
    elevation: "1,100m",
  },
];

/**
 * NatureGallery — High-impact visual gallery using React Bits TiltedCard
 * Features 3D cursor tilt, dynamic glare reflection, and nature photography.
 */
export function NatureGallery() {
  return (
    <Section chapter="03" eyebrow="03 // NATURAL OBSERVATORY" className="relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <span className="font-mono text-label text-accent uppercase tracking-widest block mb-3">
            ORGANIC STUDY
          </span>
          <h2
            className="font-display tracking-tight text-text"
            style={{ fontSize: "var(--text-h1)" }}
          >
            Visual Sanctuary
          </h2>
        </div>
        <p className="text-text-muted max-w-md font-body leading-relaxed text-sm">
          Natural systems balance immense complexity with silent harmony.
          Hover across artifacts to engage 3D physics tilt and light glare.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {natureArtifacts.map((item, idx) => (
          <ParallaxLayer key={item.title} speed={idx % 2 === 0 ? 0.08 : -0.06}>
            <div className="group relative rounded-xl border border-line p-3 bg-surface-1/50 backdrop-blur-sm hover:border-accent/40 transition-colors">
              <div className="h-[320px] sm:h-[380px] w-full overflow-hidden rounded-lg">
                <TiltedCard
                  imageSrc={item.image}
                  altText={item.title}
                  captionText={`${item.title} · ${item.elevation}`}
                  containerHeight="100%"
                  containerWidth="100%"
                  imageHeight="100%"
                  imageWidth="100%"
                  rotateAmplitude={12}
                  scaleOnHover={1.03}
                  showTooltip={true}
                  glare={0.45}
                  glareColor="rgba(74, 222, 128, 0.35)"
                />
              </div>

              <div className="pt-4 pb-2 px-2 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg text-text group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">{item.tagline}</p>
                </div>
                <div className="text-right font-mono text-[10px] text-text-faint">
                  <div>{item.location}</div>
                  <div className="text-accent">{item.elevation}</div>
                </div>
              </div>
            </div>
          </ParallaxLayer>
        ))}
      </div>
    </Section>
  );
}

