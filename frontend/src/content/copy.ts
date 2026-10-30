// ──────────────────────────────────────────────
// Copy — chapter titles, beliefs, stats, and labels.
// Replace [[PLACEHOLDER: ...]] with real content.
// ──────────────────────────────────────────────

export const chapters = {
  "01": { eyebrow: "01 / STATEMENT", title: "Living Artifact" },
  "02": { eyebrow: "02 / CASE FILES", title: "Selected work" },
  "03": { eyebrow: "03 / NATURAL OBSERVATORY", title: "Visual Sanctuary" },
  "04": { eyebrow: "04 / HOW I THINK", title: "Operating principles" },
  "05": { eyebrow: "05 / SONIC CANOPY", title: "Audio Sanctuary" },
  "06": { eyebrow: "06 / SIGNAL LOG", title: "Timeline" },
  "07": { eyebrow: "07 / CONTROL ROOM", title: "/me" },
  "08": { eyebrow: "08 / SIGN-OFF", title: "Let's talk" },
} as const;

export interface Belief {
  number: string;
  title: string;
  body: string;
}

export const beliefs: Belief[] = [
  {
    number: "01",
    title: "[[PLACEHOLDER: First belief / working principle]]",
    body: "[[PLACEHOLDER: Expand on it in 1-2 sentences. Be specific — what does this mean in practice?]]",
  },
  {
    number: "02",
    title: "[[PLACEHOLDER: Second belief / working principle]]",
    body: "[[PLACEHOLDER: Expand on it in 1-2 sentences.]]",
  },
  {
    number: "03",
    title: "[[PLACEHOLDER: Third belief / working principle]]",
    body: "[[PLACEHOLDER: Expand on it in 1-2 sentences.]]",
  },
];

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export const stats: Stat[] = [
  { label: "[[PLACEHOLDER: e.g. Projects shipped]]", value: 0, suffix: "+" },
  { label: "[[PLACEHOLDER: e.g. Lines of code]]", value: 0, suffix: "K+" },
  { label: "[[PLACEHOLDER: e.g. Clients served]]", value: 0, suffix: "" },
];

export interface TimelineEntry {
  date: string;
  title: string;
  description: string;
}

export const timeline: TimelineEntry[] = [
  {
    date: "[[PLACEHOLDER: e.g. Oct 2024]]",
    title: "[[PLACEHOLDER: What you shipped/learned]]",
    description: "[[PLACEHOLDER: One-line description]]",
  },
  {
    date: "[[PLACEHOLDER: e.g. Aug 2024]]",
    title: "[[PLACEHOLDER: What you shipped/learned]]",
    description: "[[PLACEHOLDER: One-line description]]",
  },
  {
    date: "[[PLACEHOLDER: e.g. Mar 2024]]",
    title: "[[PLACEHOLDER: What you shipped/learned]]",
    description: "[[PLACEHOLDER: One-line description]]",
  },
];

/** Tech stack icons/labels for the marquee */
export const techStack: string[] = [
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Redis",
  "Tailwind CSS",
  "GSAP",
  "Vercel",
  "Railway",
  "Docker",
  "Git",
  "Figma",
];

