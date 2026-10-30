import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import StaggeredMenu from "@/components/reactbits/StaggeredMenu";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
      <header
          className={`fixed top-0 left-0 right-0 z-[95] transition-all duration-300 ${
              scrolled
                  ? "bg-[#f5f5f5]/85 backdrop-blur-sm border-b border-black/8 py-3.5 shadow-xs"
                  : "bg-transparent py-5"
          }`}
      >
          <div className="mx-auto max-w-7xl px-6 sm:px-10 flex items-center justify-between">
              {/* Brand / Logo */}
              <a
                  href="/"
                  className="flex items-center gap-2 font-display text-base sm:text-lg font-black tracking-tight text-[#05080c] hover:text-[#ed4a1c] transition-colors ease-in delay-300"
              >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ed4a1c]" />
                  <span>Aditya D / JoyBoy</span>
              </a>

              {/* Right Action Container: Contact Button + Animated Hamburger StaggeredMenu */}
              <div className="flex items-center gap-3">
                  <button
                      onClick={() => scrollTo("contact")}
                      className="px-5 py-2 flex items-center gap-1 rounded-full bg-[#05080c] hover:bg-[#ed4a1c] text-white text-sm font-semibold tracking-wider transition-all duration-200 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:scale-105 active:scale-95"
                  >
                      Contact <ArrowUpRight size={16}/>
                  </button>

                  {/* Hamburger StaggeredMenu: Single-place Menu <-> Close toggle */}
                  <StaggeredMenu
                      position="right"
                      colors={["#1e1e22", "#ed4a1c"]}
                      accentColor="#ed4a1c"
                      items={[
                          { label: "Home", link: "#" },
                          { label: "Selected Work", link: "#work" },
                          { label: "About Aditya", link: "#about" },
                          { label: "Sonic Deck", link: "#music" },
                          { label: "Get In Touch", link: "#contact" },
                      ]}
                      socialItems={[
                          { label: "GitHub", link: "https://github.com" },
                          { label: "LinkedIn", link: "https://linkedin.com" },
                          { label: "Twitter / X", link: "https://twitter.com" },
                          { label: "Spotify", link: "https://spotify.com" },
                      ]}
                      onItemClick={(item) => {
                          const targetId = item.link.replace("#", "");
                          if (targetId) {
                              scrollTo(targetId);
                          } else {
                              window.scrollTo({ top: 0, behavior: "smooth" });
                          }
                      }}
                  />
              </div>
          </div>
      </header>
  );
}
