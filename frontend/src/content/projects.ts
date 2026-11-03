// ──────────────────────────────────────────────
// Project data — Aditya Arun Kumar Dhanshetti
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
    tagline: "Post-login behavioral anomaly detection & real-time security SDK",
    problem:
      "Traditional authentication ceases monitoring once a user signs in, leaving systems vulnerable to session hijacking, credential harvesting, and automated bot takeovers.",
    role: "Technical Lead & System Architect",
    stack: ["Node.js", "React", "PostgreSQL", "Redis", "AWS", "Security SDK", "API Design"],
    outcome:
      "Architected sub-150ms p99 real-time signal scoring pipeline; built browser security SDK auto-collecting 50+ signals with zero-config, cutting client integration to 3-10 LOC.",
    year: "2026–Present",
    link: "https://github.com/adityadhanshetti",
    media: {
      hero: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
    },
    isFlagship: true,
  },
  {
    slug: "mystry-message",
    index: "02",
    title: "Mystry Message",
    tagline: "Privacy-first anonymous messaging & conversation platform",
    problem:
      "Modern anonymous Q&A applications suffer from severe harassment, spam flooding, and data leaks without robust rate-limiting and automated content moderation.",
    role: "Full-Stack Engineer & Architect",
    stack: ["React", "FastAPI", "Python", "MongoDB Atlas", "Redis", "Clerk", "Docker", "Tailwind CSS"],
    outcome:
      "Engineered an anonymous messaging ecosystem with personalized profiles, Redis rate limiting, Clerk auth, Cloudinary media handling, and automated abuse prevention.",
    year: "2025–2026",
    link: "https://mystry-message-five-fawn.vercel.app/",
    media: {
      hero: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    },
    isFlagship: true,
  },
  {
    slug: "prompt-verse",
    index: "03",
    title: "Prompt Verse",
    tagline: "Collaborative prompt engineering, versioning & SLM optimization hub",
    problem:
      "AI engineers lack centralized tooling to discover, fork, test, version-control, and benchmark prompts across diverse small language models and LLMs.",
    role: "Full-Stack Engineer & Team Lead",
    stack: ["React", "Express.js", "MongoDB", "PostgreSQL", "Docker", "AWS", "SLMs/LLMs", "Vector DB"],
    outcome:
      "Shipped dynamic prompt variable editors, git-style prompt forking and versioning, semantic vector search, and automated prompt optimization pipelines with open models.",
    year: "2025",
    link: "https://github.com/adityadhanshetti/Prompt-Verse",
    media: {
      hero: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop",
    },
    isFlagship: true,
  },
  {
    slug: "nosave-rag",
    index: "04",
    title: "NoSave — Local Multimodal RAG",
    tagline: "Zero-cloud private document intelligence with quantized local SLMs",
    problem:
      "Regulated industries and private organizations cannot upload confidential proprietary documents to commercial cloud AI APIs due to compliance and data sovereignty rules.",
    role: "AI & System Architect",
    stack: ["Python", "FastAPI", "LangChain", "LangGraph", "Vector DB", "Docker", "SLMs"],
    outcome:
      "Architected fully local multimodal RAG pipeline combining quantized SLMs with embedded vector storage; built RAGAS evaluation harness benchmarking local accuracy against cloud models.",
    year: "2026",
    link: "https://github.com/adityadhanshetti",
    media: {
      hero: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600&auto=format&fit=crop",
    },
    isFlagship: false,
  },
  {
    slug: "knotee-brand",
    index: "05",
    title: "Brand Website — KnoTee",
    tagline: "Kinetic brand experience with GSAP motion, Lenis physics & SEO/AEO",
    problem:
      "Consumer and apparel brands require bespoke, scroll-driven visual storytelling without sacrificing Core Web Vitals, device responsiveness, or search indexability.",
    role: "Frontend Creative Engineer",
    stack: ["React", "Vite", "Tailwind CSS", "GSAP", "Framer Motion", "Lenis", "Vercel"],
    outcome:
      "Delivered a fluid, high-converting interactive brand destination with bespoke GSAP transitions, smooth Lenis inertia scroll, full device adaptability, and advanced SEO/AEO.",
    year: "2025",
    link: "https://knotee.vercel.app/",
    media: {
      hero: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600&auto=format&fit=crop",
    },
    isFlagship: false,
  },
  {
    slug: "url-shortener",
    index: "06",
    title: "URL Shortener & Analytics",
    tagline: "High-throughput slug generator with click stream telemetry",
    problem:
      "Link shortening requires sub-millisecond redirect lookups, custom aliases, end-to-end data encryption, and transparent clickstream telemetry under concurrent traffic.",
    role: "Full-Stack Engineer",
    stack: ["React", "Node.js", "Express", "MongoDB", "Firebase", "TanStack"],
    outcome:
      "Engineered a fast, secure URL shortener featuring custom aliases, click rate metrics, encrypted records, and an interactive dashboard.",
    year: "2024",
    link: "https://github.com/aqib-pagdiwale/URL-SHORTENER",
    media: {
      hero: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop",
    },
    isFlagship: false,
  },
];
