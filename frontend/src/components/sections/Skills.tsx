"use client";

import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";

// Official react-icons for technical tools and frameworks
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiNextdotjs,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiFastify,
  SiSpringboot,
  SiFlask,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiMysql,
  SiPrisma,
  SiLangchain,
  SiScikitlearn,
  SiPandas,
  SiDocker,
  SiGit,
  SiTailwindcss,
  SiFigma,
  SiCplusplus,
  SiVercel,
  SiRailway,
  SiRedux,
  SiFramer,
  SiPostman,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa6";

interface SkillItem {
  name: string;
  icon?: React.ReactNode;
}

const SKILL_ITEMS: SkillItem[] = [
  // Core Languages & High-Performance Runtimes
  { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" size={14} /> },
  { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" size={14} /> },
  { name: "Python", icon: <SiPython className="text-[#3776AB]" size={14} /> },
  { name: "Java", icon: <FaJava className="text-[#ED8B00]" size={14} /> },
  { name: "C / C++", icon: <SiCplusplus className="text-[#00599C]" size={14} /> },
  { name: "Node.js", icon: <SiNodedotjs className="text-[#5FA04E]" size={14} /> },

  // Web Frameworks & Engines
  { name: "Next.js 16", icon: <SiNextdotjs className="text-[#05080c]" size={14} /> },
  { name: "React", icon: <SiReact className="text-[#61DAFB]" size={14} /> },
  { name: "FastAPI", icon: <SiFastapi className="text-[#059669]" size={14} /> },
  { name: "Fastify", icon: <SiFastify className="text-[#05080c]" size={14} /> },
  { name: "Express.js", icon: <SiExpress className="text-[#05080c]" size={14} /> },
  { name: "Spring Boot", icon: <SiSpringboot className="text-[#6DB33F]" size={14} /> },
  { name: "Flask", icon: <SiFlask className="text-[#05080c]" size={14} /> },

  // Databases, Caching & ORM
  { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" size={14} /> },
  { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" size={14} /> },
  { name: "Redis", icon: <SiRedis className="text-[#DC382D]" size={14} /> },
  { name: "MySQL", icon: <SiMysql className="text-[#00758F]" size={14} /> },
  { name: "Prisma ORM", icon: <SiPrisma className="text-[#2D3748]" size={14} /> },
  { name: "Vector Databases" },

  // GenAI, LLMs, RAG & Data Science
  { name: "Multimodal RAG" },
  { name: "LangChain", icon: <SiLangchain className="text-[#1C3C3C]" size={14} /> },
  { name: "LangGraph" },
  { name: "Quantized SLMs" },
  { name: "Prompt Engineering" },
  { name: "Semantic Search" },
  { name: "RAGAS Evaluation" },
  { name: "LLM-as-a-Judge" },
  { name: "Scikit-Learn", icon: <SiScikitlearn className="text-[#F7931E]" size={14} /> },
  { name: "Pandas & EDA", icon: <SiPandas className="text-[#150458]" size={14} /> },

  // Cloud, DevOps & Deployment
  { name: "AWS", icon: <FaAws className="text-[#FF9900]" size={14} /> },
  { name: "Docker", icon: <SiDocker className="text-[#2496ED]" size={14} /> },
  { name: "Git & GitHub", icon: <SiGit className="text-[#F05032]" size={14} /> },
  { name: "Vercel", icon: <SiVercel className="text-[#05080c]" size={14} /> },
  { name: "Railway", icon: <SiRailway className="text-[#0B0D0E]" size={14} /> },
  { name: "CI/CD Pipelines" },

  // Systems Architecture & Security
  { name: "System Design" },
  { name: "System Architecture" },
  { name: "Microservices" },
  { name: "REST APIs" },
  { name: "Auth & RBAC" },
  { name: "Rate Limiting" },
  { name: "Security SDKs" },
  { name: "API Testing", icon: <SiPostman className="text-[#FF6C37]" size={14} /> },

  // Frontend, UI & Creative Motion
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" size={14} /> },
  { name: "Figma UI/UX", icon: <SiFigma className="text-[#F24E1E]" size={14} /> },
  { name: "Framer Motion", icon: <SiFramer className="text-[#0055FF]" size={14} /> },
  { name: "Redux Toolkit", icon: <SiRedux className="text-[#764ABC]" size={14} /> },
  { name: "GSAP Motion" },
  { name: "TanStack Query" },
  { name: "Lenis Scroll" },
];

const GAP = 10;
const ROW_HEIGHT = 44;
const LIFT = 65;

export function Skills() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  const [sizes, setSizes] = useState<{ w: number; h: number }[]>([]);
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isOpen = isHovered || isPinned;

  const togglePin = () => {
    setIsPinned((prev) => !prev);
  };

  // Close when pressing Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsPinned(false);
        setIsHovered(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Track viewport width for responsive calculations
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Measure actual pill DOM widths
  useLayoutEffect(() => {
    const measure = () => {
      const next = pillRefs.current.map((el) =>
        el ? { w: el.offsetWidth, h: el.offsetHeight } : null
      );
      if (next.some((s) => !s)) return;
      setSizes(next as { w: number; h: number }[]);
    };
    measure();
    document.fonts?.ready.then(measure);
  }, [SKILL_ITEMS.length]);

  // Responsive spread limit that strictly fits within screen boundaries
  const maxSpreadWidth = Math.min(Math.max(windowWidth - 48, 280), 1040);

  // Deterministic packing of skills into rows with zero overlap
  const rows: { item: SkillItem; index: number; width: number }[][] = [];
  let currentRow: { item: SkillItem; index: number; width: number }[] = [];
  let currentRowWidth = 0;

  SKILL_ITEMS.forEach((skill, i) => {
    const pw =
      sizes[i]?.w ??
      Math.round(28 + (skill.icon ? 22 : 0) + skill.name.length * 7.5);
    if (currentRow.length > 0 && currentRowWidth + GAP + pw > maxSpreadWidth) {
      rows.push(currentRow);
      currentRow = [];
      currentRowWidth = 0;
    }
    currentRow.push({ item: skill, index: i, width: pw });
    currentRowWidth += (currentRow.length > 1 ? GAP : 0) + pw;
  });
  if (currentRow.length > 0) rows.push(currentRow);

  // Calculate coordinates for each pill relative to the folder mouth
  const pos: { x: number; y: number }[] = [];
  rows.forEach((row, ri) => {
    const rowTotalWidth = row.reduce(
      (sum, item, idx) => sum + item.width + (idx > 0 ? GAP : 0),
      0
    );
    let currentX = -rowTotalWidth / 2;
    const shift = (ri % 2 === 1 ? 1 : -1) * Math.min(8, maxSpreadWidth * 0.015);

    row.forEach(({ index, width }) => {
      pos[index] = {
        x: Math.round(currentX + width / 2 + shift),
        y: Math.round(-LIFT - ri * ROW_HEIGHT),
      };
      currentX += width + GAP;
    });
  });

  const numRows = rows.length;
  const arenaHeight = numRows * ROW_HEIGHT + LIFT + 40;
  // Total stage height ensures the top row NEVER collides with the section header
  const stageMinHeight = Math.max(arenaHeight + 240, 580);

  return (
      <Section
          id="skills"
          chapter="04"
          eyebrow="04 // Skills"
          className="relative overflow-visible"
      >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 sm:mb-8 gap-3">
              <div>
                  <h2
                      className="font-display font-black tracking-tighter uppercase text-[#05080c]"
                      style={{ fontSize: "var(--text-h1)" }}
                  >
                      Skills
                  </h2>
                  <p className="font-body text-[#5b5b5b] mt-2 text-sm sm:text-base max-w-2xl">
                      Backend Engineering & Scalable APIs | GenAI, Multimodal
                      RAG & Machine Learning | System Design, Cloud & Security
                      Engineering | Modern Frontend & Creative Motion
                      Engineering
                  </p>
              </div>
              {/* <div className="flex items-center gap-2">
                  <span className="font-mono text-label text-[#ed4a1c] bg-[#ed4a1c]/10 px-3 py-1 rounded-full border border-[#ed4a1c]/20">
                      [1 MASTER FOLDER / 48 TECHNOLOGIES]
                  </span>
              </div> */}
          </div>

          {/* Categorized Technical Domain Overview */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {DOMAINS.map((d) => (
          <div
            key={d.title}
            className="p-4 rounded-xl bg-white border border-black/8 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-[#ed4a1c]/30 hover:shadow-[0_4px_16px_rgba(237,74,28,0.08)] transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[10px] text-[#ed4a1c] uppercase tracking-wider font-semibold">
                  {d.tag}
                </span>
                <span className="font-mono text-[10px] text-black/40">
                  {d.count}
                </span>
              </div>
              <h3 className="font-display text-sm font-bold text-[#05080c] tracking-tight">
                {d.title}
              </h3>
              <p className="font-body text-xs text-[#5b5b5b] mt-1.5 leading-relaxed">
                {d.description}
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-black/5 flex flex-wrap gap-1">
              {d.highlights.map((h) => (
                <span
                  key={h}
                  className="font-mono text-[10px] text-[#05080c]/75 bg-black/[0.03] px-2 py-0.5 rounded"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div> */}

          {/* Main Dedicated Arena: The folder has a FIXED position at the bottom. It NEVER moves! */}
          <div
              className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-end overflow-visible select-none"
              style={{ minHeight: `${stageMinHeight}px` }}
          >
              {/* The Skills Arena: Originates from the mouth of the folder */}
              <div className="absolute bottom-[215px] left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                  {SKILL_ITEMS.map((skill, i) => {
                      const p = pos[i] || { x: 0, y: 0 };
                      return (
                          <motion.div
                              key={skill.name}
                              ref={(el) => {
                                  pillRefs.current[i] = el;
                              }}
                              initial={false}
                              animate={
                                  isOpen
                                      ? {
                                            x: p.x,
                                            y: p.y,
                                            scale: 1,
                                            opacity: 1,
                                        }
                                      : {
                                            x: 0,
                                            y: 30,
                                            scale: 0.25,
                                            opacity: 0,
                                        }
                              }
                              transition={{
                                  type: "spring",
                                  stiffness: 280,
                                  damping: 24,
                                  delay: isOpen
                                      ? i * 0.007
                                      : (SKILL_ITEMS.length - 1 - i) * 0.003,
                              }}
                              whileHover={
                                  isOpen
                                      ? { scale: 1.08, zIndex: 60 }
                                      : undefined
                              }
                              className={`absolute top-0 left-1/2 -translate-x-1/2 h-[34px] px-3.5 rounded-full bg-white border border-black/8 shadow-[0_4px_14px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(237,74,28,0.2)] hover:border-[#ed4a1c]/60 transition-shadow duration-200 inline-flex items-center gap-2 whitespace-nowrap ${
                                  isPinned
                                      ? "pointer-events-auto cursor-default"
                                      : "pointer-events-none"
                              }`}
                          >
                              {skill.icon && (
                                  <span className="inline-flex items-center justify-center shrink-0 w-3.5 h-3.5">
                                      {skill.icon}
                                  </span>
                              )}
                              <span className="font-body font-medium text-xs sm:text-[13px] text-[#05080c] tracking-tight">
                                  {skill.name}
                              </span>
                          </motion.div>
                      );
                  })}
              </div>

              {/* Master Skills Folder: STRICTLY THE ENTRY AND EXIT POINT FOR HOVER */}
              <div
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={togglePin}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  aria-label="Toggle Skills Folder Pin"
                  className="relative z-30 mb-2 cursor-pointer group transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                  {/* Subtle Ambient Backlight Glow */}
                  <div
                      className={`absolute -top-10 inset-x-0 h-28 rounded-full blur-2xl transition-opacity duration-500 pointer-events-none ${
                          isOpen ? "opacity-100 bg-[#ed4a1c]/20" : "opacity-0"
                      }`}
                  />

                  {/* Physical Folder Body */}
                  <div className="relative w-[290px] sm:w-[330px] h-[165px] ">
                      {/* Folder Back Plate & Tab */}
                      <div className="absolute inset-0 rounded-2xl bg-[#18181b] shadow-[0_20px_45px_rgba(0,0,0,0.22)] [transform:perspective(600px)_rotateX(6deg)] [transform-origin:50%_100%] before:absolute before:-top-3.5 before:left-0 before:h-6 before:w-[46%] before:rounded-t-xl before:bg-[#18181b]">
                          {/* <div className="absolute -top-3 left-4 text-[10px] font-mono tracking-wider uppercase text-white/60">
                              ARCHIVE // 04
                          </div> */}
                      </div>

                      {/* Paper Sheet Insert: Peeks out and slides up when opened */}
                      <div
                          className={`absolute right-4 left-4 h-1/2 rounded-lg bg-[#ffffff] shadow-sm flex items-center justify-between px-4 pt-1 transition-all duration-400 ease-out ${
                              isOpen
                                  ? "top-2 opacity-100 translate-y-0"
                                  : "top-6 opacity-60 translate-y-3"
                          }`}
                      >
                          <span className="font-mono text-[10px] text-[#5b5b5b] tracking-wider uppercase">
                              MASTER INVENTORY
                          </span>
                          <span className="font-mono text-[10px] text-[#ed4a1c] font-bold">
                              48 SKILLS
                          </span>
                      </div>

                      {/* Folder Front Flap: 3D perspective tilt open when hovered/pinned */}
                      <div
                          className={`absolute inset-x-0 bottom-0 h-[78%] rounded-2xl bg-gradient-to-b from-[#2e2e34] to-[#1e1e22] p-5 flex flex-col justify-end text-white shadow-[0_-8px_26px_rgba(0,0,0,0.32)] border border-white/8 transition-transform duration-400 ease-out ${
                              isOpen
                                  ? "[transform:perspective(600px)_rotateX(-30deg)] [transform-origin:50%_100%]"
                                  : "[transform:perspective(600px)_rotateX(-5deg)] [transform-origin:50%_100%]"
                          }`}
                      >
                          <div className="flex items-center justify-between">
                              <span className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight">
                                  Skills
                              </span>

                              {/* Status Indicator Badge */}
                              {isPinned ? (
                                  <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#16c847] bg-[#16c847]/15 px-2.5 py-0.5 rounded-full border border-[#16c847]/30">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#16c847] animate-pulse" />
                                      PINNED OPEN
                                  </span>
                              ) : isOpen ? (
                                  <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#ff8a4c] bg-[#ff8a4c]/15 px-2.5 py-0.5 rounded-full border border-[#ff8a4c]/30">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff8a4c] animate-pulse" />
                                      HOVER ACTIVE
                                  </span>
                              ) : (
                                  <span className="flex items-center gap-1.5 font-mono text-[10px] text-white/50 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10 group-hover:border-white/20 group-hover:text-white/80 transition-colors">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#ed4a1c]" />
                                      HOVER / PIN
                                  </span>
                              )}
                          </div>
                          <p className="font-mono text-xs text-white/50 mt-1">
                              {isPinned
                                  ? "Click to unpin folder"
                                  : isOpen
                                    ? "Click to pin open"
                                    : "Hover to reveal • Click to pin open"}
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      </Section>
  );
}

export default Skills;