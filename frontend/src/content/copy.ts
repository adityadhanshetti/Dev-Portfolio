// ──────────────────────────────────────────────
// Copy — Aditya Arun Kumar Dhanshetti
// ──────────────────────────────────────────────

export const chapters = {
  "01": { eyebrow: "01 / STATEMENT", title: "Living Artifact" },
  "02": { eyebrow: "02 / CASE FILES", title: "Selected work" },
  "03": { eyebrow: "03 / NATURAL OBSERVATORY", title: "Visual Sanctuary" },
  "04": { eyebrow: "04 / HOW I THINK", title: "Operating principles" },
  "05": { eyebrow: "05 / SIGNAL LOG", title: "Experience & Timeline" },
  "06": { eyebrow: "06 / SIGN-OFF", title: "Let's build" },
  // Compatibility keys
  "07": { eyebrow: "07 / SYSTEM", title: "Diagnostics" },
  "08": { eyebrow: "08 / SIGN-OFF", title: "Get in touch" },
} as const;

export interface Belief {
  number: string;
  title: string;
  body: string;
}

export const beliefs: Belief[] = [
  {
    number: "01",
    title: "Math-First Over Black-Box Magic",
    body: "Building deterministic, human-explainable anomaly detection delivers verifiable risk scores with sub-150ms latency without opaque AI hallucinations.",
  },
  {
    number: "02",
    title: "Zero-Config Developer Ergonomics",
    body: "Security and telemetry SDKs should drop into codebases in 3-10 lines of code. If client integration requires dozens of configuration files, the architecture failed.",
  },
  {
    number: "03",
    title: "Local Sovereignty & Privacy Engineering",
    body: "Sensitive documents deserve local multimodal RAG and encrypted pipelines. Local vector embeddings and quantized SLMs eliminate cloud exfiltration risks.",
  },
];

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export const stats: Stat[] = [
  { label: "B2B Marketplace Services", value: 70, suffix: "+" },
  { label: "Target p99 Signal Latency", value: 150, suffix: "ms" },
  { label: "Auto-Collected SDK Signals", value: 50, suffix: "+" },
];

export interface TimelineEntry {
  date: string;
  title: string;
  description: string;
  role?: string;
  skills?: string[];
}

export const timeline: TimelineEntry[] = [
  {
    date: "Apr 2026 – Present",
    title: "Technical Lead @ Sentinel Layer",
    description:
      "Architected real-time post-login session monitoring pipeline targeting sub-150ms p99 latency. Built browser security SDK collecting 50+ signals with zero configuration and redesigned infrastructure for millions of active users on AWS.",
    skills: ["System Design", "AWS", "Redis", "PostgreSQL", "Node.js", "Security SDK"],
  },
  {
    date: "Jul 2026 – Present",
    title: "SDE Intern @ AppOrb",
    description:
      "Built B2B services marketplace powering 70+ services using Next.js 16 frontend with Fastify / MongoDB microservices backend. Shipped full-lifecycle Lead & Quotation engine and RBAC invitation systems.",
    skills: ["Next.js", "TypeScript", "Fastify", "MongoDB", "Prisma ORM", "Microservices"],
  },
  {
    date: "Jul 2024 – Sep 2024",
    title: "Web & AI Developer Intern @ E-arth Solutions",
    description:
      "Developed university admission portal system, engineered deep learning tuberculosis detection model using DICOM medical images, and assisted in clinical dataset EDA.",
    skills: ["Python", "Flask", "Machine Learning", "React", "Data Visualization", "EDA"],
  },
];

/** Tech stack icons/labels for the marquee */
export const techStack: string[] = [
  "TypeScript",
  "Python",
  "Next.js",
  "React",
  "FastAPI",
  "Node.js",
  "Fastify",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "AWS",
  "Docker",
  "LangChain",
  "LangGraph",
  "SLM / LLMs",
  "Prisma ORM",
  "GSAP",
  "Tailwind CSS",
  "Spring Boot",
  "Java",
  "C++",
];
