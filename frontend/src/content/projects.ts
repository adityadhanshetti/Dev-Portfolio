// ──────────────────────────────────────────────
// Project data — typed with placeholder values.
// Replace [[PLACEHOLDER: ...]] with real content.
// ──────────────────────────────────────────────

export interface Project {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  problem: string;
  role: string;
  stack: string[];
  outcome: string;
  year: string;
  link?: string;
  media: {
    hero: string;
    thumbnail: string;
  };
  isFlagship: boolean;
}

export const projects: Project[] = [
  {
    slug: "sentinel-layer",
    index: "01",
    title: "Sentinel Layer",
    tagline: "Post-login behavioral anomaly detection",
    problem:
      "[[PLACEHOLDER: Describe the account-takeover problem Sentinel Layer solves]]",
    role: "Full-stack engineer & architect",
    stack: ["React", "Node.js", "PostgreSQL", "Redis", "Railway", "Vercel"],
    outcome:
      "[[PLACEHOLDER: Real metrics — API response times, detection rates, client count]]",
    year: "2024–present",
    link: "[[PLACEHOLDER: URL if public]]",
    media: {
      hero: "/media/sentinel-hero.webp",
      thumbnail: "/media/sentinel-thumb.webp",
    },
    isFlagship: true,
  },
  {
    slug: "project-two",
    index: "02",
    title: "[[PLACEHOLDER: Project 2 Name]]",
    tagline: "[[PLACEHOLDER: One-line description]]",
    problem: "[[PLACEHOLDER: What problem does it solve?]]",
    role: "[[PLACEHOLDER: Your role]]",
    stack: ["[[PLACEHOLDER]]"],
    outcome: "[[PLACEHOLDER: Measurable outcome]]",
    year: "2024",
    media: {
      hero: "/media/placeholder-hero.webp",
      thumbnail: "/media/placeholder-thumb.webp",
    },
    isFlagship: false,
  },
  {
    slug: "project-three",
    index: "03",
    title: "[[PLACEHOLDER: Project 3 Name]]",
    tagline: "[[PLACEHOLDER: One-line description]]",
    problem: "[[PLACEHOLDER: What problem does it solve?]]",
    role: "[[PLACEHOLDER: Your role]]",
    stack: ["[[PLACEHOLDER]]"],
    outcome: "[[PLACEHOLDER: Measurable outcome]]",
    year: "2023",
    media: {
      hero: "/media/placeholder-hero.webp",
      thumbnail: "/media/placeholder-thumb.webp",
    },
    isFlagship: false,
  },
];

