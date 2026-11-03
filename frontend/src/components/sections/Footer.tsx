import { useEffect, useState, useRef } from "react";
import VariableProximity from "@/components/reactbits/VariableProximity";

/**
 * Footer — DOVV Studio Exact Match Design.
 * Features:
 * 1. .hello-wrap: Massive "JoyBoy" headline sized with dynamic fit-text to perfectly fit the viewport width without cutting.
 * 2. High-intensity Variable Proximity:
 *    - Expanded radius (550px) for immediate magnetic response
 *    - Extreme weight contrast: 'wght' 950 (ultra heavy bold) -> 'wght' 100 (ultra sleek hairline)
 *    - Kinetic lift (0.12em) and dynamic scale (1.14x)
 *    - Smooth color bloom from #0b0b0b to flame orange #ed4a1c
 * 3. 4 Interactive Holographic Foil Stickers:
 *    - Replies within 24h (Flame foil pill)
 *    - hey! (Electric blue speech bubble)
 *    - Open for new projects (Lime foil pill)
 *    - Starburst 10-point badge (Pink/violet foil)
 * 4. .grid: 4-column Swiss minimalist information grid:
 *    - Start a project: email with expanding underline & "Book a 15 min call" CTA pill
 *    - Pages & Services: large uppercase links with hover shift
 *    - Social: LinkedIn, X, Contra uppercase links
 *    - Based in: Argentina with pulsing live green dot & local time
 * 5. .bar: DOVV Studio brand logo, copyright, and smooth "Back to top" button
 */
export function Footer() {
  const helloWrapRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [localTime, setLocalTime] = useState("");
  const [fitFontSize, setFitFontSize] = useState<number | undefined>(undefined);

  // Exact fit-text algorithm: sizes "JoyBoy" with safe margin so no letter is ever clipped
  useEffect(() => {
    const computeFit = () => {
      const container = textContainerRef.current;
      if (!container) return;

      // Safe available width (accounting for side padding and stroke expansion)
      const isMobile = window.innerWidth < 640;
      const padding = isMobile ? 32 : 64;
      const availWidth = (container.clientWidth - padding) * 0.93; // 93% safe boundary

      const textSpan = textRef.current;
      if (textSpan) {
        const curFont = parseFloat(window.getComputedStyle(textSpan).fontSize) || 120;
        const curWidth = textSpan.getBoundingClientRect().width;
        if (curWidth > 0 && availWidth > 0) {
          const newSize = Math.floor((curFont * availWidth) / curWidth);
          // Set bounded font size
          setFitFontSize(Math.max(36, newSize));
          return;
        }
      }

      // Safe fallback calculation for "JoyBoy" (6 condensed characters in Bebas Neue)
      setFitFontSize(Math.max(36, Math.floor(availWidth / 3.05)));
    };

    computeFit();
    document.fonts?.ready.then(computeFit);

    const observer = new ResizeObserver(() => computeFit());
    if (textContainerRef.current) {
      observer.observe(textContainerRef.current);
    }
    window.addEventListener("resize", computeFit);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", computeFit);
    };
  }, []);

  // Live time for Argentina (DOVV Studio location: UTC-3)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = new Intl.DateTimeFormat("en-GB", {
        timeZone: "America/Argentina/Buenos_Aires",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now);
      setLocalTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
      <footer
          id="contact"
          className="w-full bg-[#f5f5f5] text-[#0b0b0b] scroll-mt-0 overflow-x-hidden border-t border-black/10 select-none"
      >
          {/* ═══ 1. HELLO WRAP (Massive JoyBoy Full-Width + 4 Holographic Stickers) ═══ */}
          <div
              ref={helloWrapRef}
              className="relative w-full py-3 sm:py-4 md:py-2 flex items-center justify-center border-b border-black/[0.12] overflow-visible"
          >
              {/* Massive Interactive Headline that fits comfortably into the width without clipping */}
              <a
                  href="mailto:hello@dovvstudio.com"
                  aria-label="Email JoyBoy"
                  className="group block w-full text-center px-4 sm:px-8 no-underline cursor-pointer transition-colors duration-300"
              >
                  <div
                      ref={textContainerRef}
                      className="w-full flex justify-center items-center py-4 sm:py-8 overflow-visible"
                  >
                      <VariableProximity
                          ref={textRef}
                          label="JoyBoy"
                          // className="cursor-pointer tracking-normal transition-colors duration-300 group-hover:text-[#ed4a1c] whitespace-nowrap block select-none"
                          // fontFamily="'Bebas Neue', sans-serif"
                          fromFontVariationSettings="'wght' 950, 'opsz' 40"
                          toFontVariationSettings="'wght' 350, 'opsz' 15"
                          containerRef={helloWrapRef}
                          radius={550}
                          falloff="linear"
                          smoothing={0.2}
                          scale={1}
                          lift={0.12}
                          fromColor="#0b0b0b"
                          toColor="#ed4a1c"
                          fontSize={fitFontSize || "clamp(3.8rem, 26vw, 22rem)"}
                          style={{
                              lineHeight: "1.05em",
                              fontWeight: 600,
                              textAlign: "center",
                              display: "inline-block",
                              whiteSpace: "nowrap",
                              padding: "0.08em 0.15em",
                          }}
                      />
                  </div>
              </a>

              {/* ── STICKER 1: "Replies within 24h" (Top Left Flame Foil Pill) ── */}
              <div
                  className="absolute z-10 pointer-events-auto transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 hover:rotate-[-4deg] cursor-grab active:cursor-grabbing drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)]"
                  style={{
                      left: "3%",
                      top: "12%",
                      transform: "rotate(-8deg)",
                  }}
              >
                  <svg
                      viewBox="0 0 293.6 64"
                      className="w-[170px] sm:w-[210px] md:w-[250px] h-auto"
                      aria-hidden="true"
                  >
                      <defs>
                          <linearGradient
                              id="foil-flame-footer"
                              x1="0"
                              y1="0"
                              x2="176"
                              y2="38"
                              gradientUnits="userSpaceOnUse"
                              spreadMethod="reflect"
                          >
                              <stop offset="0%" stopColor="#ed4a1c" />
                              <stop offset="16%" stopColor="#ff6a3d" />
                              <stop offset="33%" stopColor="#ff8f5e" />
                              <stop offset="50%" stopColor="#ff4f7a" />
                              <stop offset="66%" stopColor="#ed4a1c" />
                              <stop offset="83%" stopColor="#ff7a3d" />
                              <stop offset="100%" stopColor="#ed4a1c" />
                          </linearGradient>
                          <radialGradient
                              id="shine-flame-footer"
                              cx="146.8"
                              cy="32"
                              r="132"
                              gradientUnits="userSpaceOnUse"
                          >
                              <stop
                                  offset="0%"
                                  stopColor="#ffffff"
                                  stopOpacity="0.75"
                              />
                              <stop
                                  offset="100%"
                                  stopColor="#ffffff"
                                  stopOpacity="0"
                              />
                          </radialGradient>
                          <g id="shape-flame-pill">
                              <rect
                                  x="6"
                                  y="6"
                                  width="281.6"
                                  height="52"
                                  rx="26"
                              />
                          </g>
                      </defs>
                      {/* White die-cut border */}
                      <use
                          href="#shape-flame-pill"
                          fill="#ffffff"
                          stroke="#ffffff"
                          strokeWidth="10"
                          strokeLinejoin="round"
                      />
                      {/* Foil metallic gradient fill */}
                      <use
                          href="#shape-flame-pill"
                          fill="url(#foil-flame-footer)"
                      />
                      {/* Soft-light shine */}
                      <use
                          href="#shape-flame-pill"
                          fill="url(#shine-flame-footer)"
                          style={{ mixBlendMode: "overlay" }}
                      />
                      {/* Inked Text */}
                      <text
                          x="146.8"
                          y="40"
                          textAnchor="middle"
                          className="font-mono text-[20px] font-bold fill-[#1a1a1a]"
                          style={{
                              fontFamily: "monospace",
                              letterSpacing: "-0.01em",
                          }}
                      >
                          Replies within 24h
                      </text>
                  </svg>
              </div>

              {/* ── STICKER 2: "hey!" (Top Right Blue Speech Bubble) ── */}
              <div
                  className="absolute z-10 pointer-events-auto transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 hover:rotate-[6deg] cursor-grab active:cursor-grabbing drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)]"
                  style={{
                      right: "4%",
                      top: "8%",
                      transform: "rotate(10deg)",
                  }}
              >
                  <svg
                      viewBox="0 0 120 100"
                      className="w-[80px] sm:w-[98px] md:w-[114px] h-auto"
                      aria-hidden="true"
                  >
                      <defs>
                          <linearGradient
                              id="foil-blue-footer"
                              x1="0"
                              y1="0"
                              x2="72"
                              y2="60"
                              gradientUnits="userSpaceOnUse"
                              spreadMethod="reflect"
                          >
                              <stop offset="0%" stopColor="#2e90fa" />
                              <stop offset="16%" stopColor="#5aa8ff" />
                              <stop offset="33%" stopColor="#8f7bff" />
                              <stop offset="50%" stopColor="#2e90fa" />
                              <stop offset="66%" stopColor="#4fc0ff" />
                              <stop offset="83%" stopColor="#4f7dff" />
                              <stop offset="100%" stopColor="#2e90fa" />
                          </linearGradient>
                          <radialGradient
                              id="shine-blue-footer"
                              cx="60"
                              cy="50"
                              r="54"
                              gradientUnits="userSpaceOnUse"
                          >
                              <stop
                                  offset="0%"
                                  stopColor="#ffffff"
                                  stopOpacity="0.85"
                              />
                              <stop
                                  offset="100%"
                                  stopColor="#ffffff"
                                  stopOpacity="0"
                              />
                          </radialGradient>
                          <g id="shape-bubble-footer">
                              <path d="M60 6c28.8 0 52 14 52 36s-23.2 36-52 36c-6 0-12-1-17-2L21.6 96l4-20C14 70 8 58 8 42 8 20 31.2 6 60 6z" />
                          </g>
                      </defs>
                      {/* White die-cut border */}
                      <use
                          href="#shape-bubble-footer"
                          fill="#ffffff"
                          stroke="#ffffff"
                          strokeWidth="10"
                          strokeLinejoin="round"
                      />
                      {/* Foil metallic gradient fill */}
                      <use
                          href="#shape-bubble-footer"
                          fill="url(#foil-blue-footer)"
                      />
                      {/* Overlay shine */}
                      <use
                          href="#shape-bubble-footer"
                          fill="url(#shine-blue-footer)"
                          style={{ mixBlendMode: "overlay" }}
                      />
                      {/* Inked Text */}
                      <text
                          x="60"
                          y="52"
                          textAnchor="middle"
                          className="font-mono text-[24px] font-black fill-white"
                          style={{
                              fontFamily: "monospace",
                              letterSpacing: "-0.02em",
                          }}
                      >
                          hey!
                      </text>
                  </svg>
              </div>

              {/* ── STICKER 3: "Open for new projects" (Bottom Center Lime Pill) ── */}
              <div
                  className="hidden sm:block absolute z-10 pointer-events-auto transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 hover:rotate-[-2deg] cursor-grab active:cursor-grabbing drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)]"
                  style={{
                      left: "38%",
                      bottom: "4%",
                      transform: "rotate(-5deg)",
                  }}
              >
                  <svg
                      viewBox="0 0 333.2 64"
                      className="w-[190px] sm:w-[235px] md:w-[270px] h-auto"
                      aria-hidden="true"
                  >
                      <defs>
                          <linearGradient
                              id="foil-lime-footer"
                              x1="0"
                              y1="0"
                              x2="200"
                              y2="38"
                              gradientUnits="userSpaceOnUse"
                              spreadMethod="reflect"
                          >
                              <stop offset="0%" stopColor="#c6f432" />
                              <stop offset="16%" stopColor="#e8ff8a" />
                              <stop offset="33%" stopColor="#7ff0b0" />
                              <stop offset="50%" stopColor="#c6f432" />
                              <stop offset="66%" stopColor="#f5ffb8" />
                              <stop offset="83%" stopColor="#a8f05a" />
                              <stop offset="100%" stopColor="#c6f432" />
                          </linearGradient>
                          <radialGradient
                              id="shine-lime-footer"
                              cx="166.6"
                              cy="32"
                              r="150"
                              gradientUnits="userSpaceOnUse"
                          >
                              <stop
                                  offset="0%"
                                  stopColor="#ffffff"
                                  stopOpacity="0.95"
                              />
                              <stop
                                  offset="100%"
                                  stopColor="#ffffff"
                                  stopOpacity="0"
                              />
                          </radialGradient>
                          <g id="shape-lime-pill">
                              <rect
                                  x="6"
                                  y="6"
                                  width="321.2"
                                  height="52"
                                  rx="26"
                              />
                          </g>
                      </defs>
                      {/* White die-cut border */}
                      <use
                          href="#shape-lime-pill"
                          fill="#ffffff"
                          stroke="#ffffff"
                          strokeWidth="10"
                          strokeLinejoin="round"
                      />
                      {/* Foil metallic gradient fill */}
                      <use
                          href="#shape-lime-pill"
                          fill="url(#foil-lime-footer)"
                      />
                      {/* Overlay shine */}
                      <use
                          href="#shape-lime-pill"
                          fill="url(#shine-lime-footer)"
                          style={{ mixBlendMode: "overlay" }}
                      />
                      {/* Inked Text */}
                      <text
                          x="166.6"
                          y="40"
                          textAnchor="middle"
                          className="font-mono text-[20px] font-bold fill-[#1a1a1a]"
                          style={{
                              fontFamily: "monospace",
                              letterSpacing: "-0.01em",
                          }}
                      >
                          Open for new projects
                      </text>
                  </svg>
              </div>

              {/* ── STICKER 4: 10-Point Pink Starburst Badge (Bottom Right) ── */}
              <div
                  className="hidden sm:block absolute z-10 pointer-events-auto transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-115 hover:rotate-[18deg] cursor-grab active:cursor-grabbing drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)]"
                  style={{
                      right: "16%",
                      bottom: "8%",
                      transform: "rotate(14deg)",
                  }}
              >
                  <svg
                      viewBox="0 0 120 120"
                      className="w-[66px] sm:w-[80px] md:w-[90px] h-auto"
                      aria-hidden="true"
                  >
                      <defs>
                          <linearGradient
                              id="foil-pink-footer"
                              x1="0"
                              y1="0"
                              x2="72"
                              y2="72"
                              gradientUnits="userSpaceOnUse"
                              spreadMethod="reflect"
                          >
                              <stop offset="0%" stopColor="#ff7ac6" />
                              <stop offset="16%" stopColor="#ffb0de" />
                              <stop offset="33%" stopColor="#c9a6ff" />
                              <stop offset="50%" stopColor="#ff7ac6" />
                              <stop offset="66%" stopColor="#ffd0ec" />
                              <stop offset="83%" stopColor="#ff8fb3" />
                              <stop offset="100%" stopColor="#ff7ac6" />
                          </linearGradient>
                          <radialGradient
                              id="shine-pink-footer"
                              cx="60"
                              cy="60"
                              r="54"
                              gradientUnits="userSpaceOnUse"
                          >
                              <stop
                                  offset="0%"
                                  stopColor="#ffffff"
                                  stopOpacity="0.95"
                              />
                              <stop
                                  offset="100%"
                                  stopColor="#ffffff"
                                  stopOpacity="0"
                              />
                          </radialGradient>
                          <g id="shape-starburst-footer">
                              <path d="M60.0 6.0 L74.1 40.6 L111.4 43.3 L82.8 67.4 L91.7 103.7 L60.0 84.0 L28.3 103.7 L37.2 67.4 L8.6 43.3 L45.9 40.6z" />
                          </g>
                      </defs>
                      {/* White die-cut border */}
                      <use
                          href="#shape-starburst-footer"
                          fill="#ffffff"
                          stroke="#ffffff"
                          strokeWidth="10"
                          strokeLinejoin="round"
                      />
                      {/* Foil metallic gradient fill */}
                      <use
                          href="#shape-starburst-footer"
                          fill="url(#foil-pink-footer)"
                      />
                      {/* Soft shine */}
                      <use
                          href="#shape-starburst-footer"
                          fill="url(#shine-pink-footer)"
                          style={{ mixBlendMode: "overlay" }}
                      />
                  </svg>
              </div>
          </div>

          {/* ═══ 2. THE 4-COLUMN DOVV STUDIO INFORMATION GRID ═══ */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.2fr]">
              {/* Cell 1: Start a project / Contact */}
              <div className="flex flex-col gap-3.5 p-6 sm:p-8 md:p-10 border-b md:border-b-0 md:border-r border-black/[0.12] lg:border-b-0">
                  <p className="font-mono text-[13px] font-medium tracking-[0.12em] uppercase text-black/50">
                      Start a project
                  </p>

                  <a
                      href="mailto:connect.adityadhanshetti@gmail.com"
                      className="self-start text-xl sm:text-2xl font-bold text-[#0b0b0b] tracking-[-0.04em] no-underline relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#ed4a1c] hover:after:w-full after:transition-all after:duration-400 after:ease-[cubic-bezier(0.22,1,0.36,1)]"
                  >
                      connect.adityadhanshetti@gmail.com
                  </a>

                  <a
                      href="mailto:work.adityadhanshetti@gmail.com"
                      className="self-start text-sm font-mono text-[#5b5b5b] hover:text-[#ed4a1c] transition-colors"
                  >
                      Alt: work.adityadhanshetti@gmail.com
                  </a>
              </div>

              {/* Cell 2: Pages & Services */}
              <div className="flex flex-col gap-3.5 p-6 sm:p-8 md:p-10 border-b md:border-b-0 md:border-r border-black/[0.12]">
                  <p className="font-mono text-[13px] font-medium tracking-[0.12em] uppercase text-black/50">
                      Pages
                  </p>
                  <ul className="flex flex-col gap-1.5 list-none p-0 m-0">
                      {[
                          { label: "Home", href: "/" },
                          { label: "Work", href: "/#work" },
                          { label: "Skills", href: "/#skills" },
                          { label: "About", href: "/#about" },
                      ].map((item) => (
                          <li key={item.label}>
                              <a
                                  href={item.href}
                                  className="font-display font-extrabold uppercase text-[28px] sm:text-[30px] leading-tight text-[#0b0b0b] hover:text-[#ed4a1c] hover:pl-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] block"
                              >
                                  {item.label}
                              </a>
                          </li>
                      ))}
                  </ul>

                  {/* <p className="font-mono text-[13px] font-medium tracking-[0.12em] uppercase text-black/50 mt-5">
                      Services
                  </p>
                  <ul className="flex flex-col gap-1.5 list-none p-0 m-0">
                      {[
                          { label: "Webflow to Framer", href: "/#work" },
                          { label: "WordPress to Framer", href: "/#work" },
                      ].map((item) => (
                          <li key={item.label}>
                              <a
                                  href={item.href}
                                  className="text-[15px] text-[#0b0b0b] hover:text-black/50 transition-colors duration-200 block"
                              >
                                  {item.label}
                              </a>
                          </li>
                      ))}
                  </ul> */}
              </div>

              {/* Cell 3: Social */}
              <div className="flex flex-col gap-3.5 p-6 sm:p-8 md:p-10 border-b md:border-b-0 lg:border-r border-black/[0.12]">
                  <p className="font-mono text-[13px] font-medium tracking-[0.12em] uppercase text-black/50">
                      Social
                  </p>
                  <ul className="flex flex-col gap-1.5 list-none p-0 m-0">
                      {[
                          {
                              name: "LinkedIn",
                              href: "https://in.linkedin.com/in/aditya-dhanshetti",
                          },
                          { name: "GitHub", href: "https://github.com/adityadhanshetti" },
                          {
                              name: "Twitter / X",
                              href: "https://x.com/adityadhanshetti",
                          },
                      ].map((social) => (
                          <li key={social.name}>
                              <a
                                  href={social.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-display font-extrabold uppercase text-[28px] sm:text-[30px] leading-tight text-[#0b0b0b] hover:text-[#ed4a1c] hover:pl-2 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] block"
                              >
                                  {social.name}
                              </a>
                          </li>
                      ))}
                  </ul>
              </div>

              {/* Cell 4: Based in */}
              <div className="flex flex-col gap-3.5 p-6 sm:p-8 md:p-10">
                  <p className="font-mono text-[13px] font-medium tracking-[0.12em] uppercase text-black/50">
                      Based in
                  </p>
                  <p className="font-display font-extrabold uppercase text-[24px] sm:text-[28px] leading-tight text-[#0b0b0b]">
                      Solapur, India
                  </p>
                  <p className="flex items-center gap-2 text-[15px] text-black/60 font-body">
                      <span className="w-2 h-2 rounded-full bg-[#16c847] animate-pulse shadow-[0_0_8px_#16c847]" />
                      <span>{localTime || "--:--"}</span> IST
                  </p>
              </div>
          </div>

          {/* ═══ 3. BOTTOM BAR (Brand Logo, Copyright, Back to top) ═══ */}
          <div className="border-t border-black/[0.12] px-6 sm:px-8 py-5 justify-between flex items-center gap-4 text-sm text-black/55 font-body">
              {/* DOVV Studio Wordmark Logo */}
              <div className="flex items-center justify-start">
                  {/* <img
                      src="/logo-dovv-black.svg"
                      alt="DOVV Studio"
                      className="h-7 w-auto object-contain"
                      width={81}
                      height={28}
                  /> */}
                  <h2 className="w-[80] h-[28]">Aditya D / JoyBoy</h2>
              </div>

              {/* Center Copyright */}
              {/* <p className="text-center font-medium m-0">© 2026 DOVV Studio</p> */}

              {/* Back to top CTA */}
              <button
                  onClick={scrollToTop}
                  type="button"
                  className="justify-self-end inline-flex items-center gap-1.5 text-inherit hover:text-[#0b0b0b] transition-colors duration-200 group cursor-pointer font-medium"
              >
                  <span>Back to top</span>
                  <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:-translate-y-0.5"
                  >
                      <path
                          d="M12 19V5M6 11l6-6 6 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                      />
                  </svg>
              </button>
          </div>
      </footer>
  );
}
