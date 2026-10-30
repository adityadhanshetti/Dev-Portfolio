"use client";

import React, { useCallback, useLayoutEffect, useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

export interface StaggeredMenuItem {
    label: string;
    ariaLabel?: string;
    link: string;
}

export interface StaggeredMenuSocialItem {
    label: string;
    link: string;
}

export interface StaggeredMenuProps {
    position?: "left" | "right";
    colors?: string[];
    items?: StaggeredMenuItem[];
    socialItems?: StaggeredMenuSocialItem[];
    displaySocials?: boolean;
    className?: string;
    accentColor?: string;
    closeOnClickAway?: boolean;
    onMenuOpen?: () => void;
    onMenuClose?: () => void;
    onItemClick?: (item: StaggeredMenuItem) => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
    position = "right",
    colors = ["#1e1e22", "#ed4a1c"],
    items = [],
    socialItems = [],
    displaySocials = true,
    className = "",
    accentColor = "#ed4a1c",
    closeOnClickAway = true,
    onMenuOpen,
    onMenuClose,
    onItemClick,
}) => {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const openRef = useRef(false);

    const panelRef = useRef<HTMLDivElement | null>(null);
    const preLayersRef = useRef<HTMLDivElement | null>(null);
    const preLayerElsRef = useRef<HTMLElement[]>([]);
    const backdropRef = useRef<HTMLDivElement | null>(null);

    const openTlRef = useRef<gsap.core.Timeline | null>(null);
    const closeTlRef = useRef<gsap.core.Timeline | null>(null);

    const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
    const busyRef = useRef(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useLayoutEffect(() => {
        if (!mounted) return;

        const ctx = gsap.context(() => {
            const panel = panelRef.current;
            const preContainer = preLayersRef.current;

            if (!panel) return;

            let preLayers: HTMLElement[] = [];
            if (preContainer) {
                preLayers = Array.from(
                    preContainer.querySelectorAll(".sm-prelayer"),
                ) as HTMLElement[];
            }
            preLayerElsRef.current = preLayers;

            const offscreen = position === "left" ? -100 : 100;
            gsap.set([panel, ...preLayers], {
                xPercent: offscreen,
                opacity: 1,
            });
        });
        return () => ctx.revert();
    }, [position, mounted]);

    const buildOpenTimeline = useCallback(() => {
        const panel = panelRef.current;
        const layers = preLayerElsRef.current;
        const backdrop = backdropRef.current;
        if (!panel) return null;

        openTlRef.current?.kill();
        closeTlRef.current?.kill();

        const itemEls = Array.from(
            panel.querySelectorAll(".sm-panel-itemLabel"),
        ) as HTMLElement[];
        const extraCols = Array.from(
            panel.querySelectorAll(".sm-panel-extra"),
        ) as HTMLElement[];
        const socialTitle = panel.querySelector(".sm-socials-title") as HTMLElement | null;
        const socialLinks = Array.from(
            panel.querySelectorAll(".sm-socials-link"),
        ) as HTMLElement[];

        const offscreen = position === "left" ? -100 : 100;

        // Reset elements (No numbers)
        if (itemEls.length) gsap.set(itemEls, { yPercent: 120, rotate: 3, opacity: 0 });
        if (extraCols.length) gsap.set(extraCols, { opacity: 0, y: 15 });
        if (socialTitle) gsap.set(socialTitle, { opacity: 0, y: 10 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 12, opacity: 0 });

        const tl = gsap.timeline({ paused: true });

        // 1. Fade in backdrop blur (soft dimming and blurring remaining 50-60% of screen)
        if (backdrop) {
            tl.fromTo(
                backdrop,
                { opacity: 0 },
                { opacity: 1, duration: 0.4, ease: "power2.out" },
                0,
            );
        }

        // 2. Slide in pre-layers staggered from right edge (40-50% width)
        layers.forEach((layer, i) => {
            tl.fromTo(
                layer,
                { xPercent: offscreen },
                { xPercent: 0, duration: 0.52, ease: "power4.out" },
                i * 0.08,
            );
        });

        // 3. Slide in main 40-50% sidebar panel
        const panelInsertTime = layers.length * 0.08;
        const panelDuration = 0.6;

        tl.fromTo(
            panel,
            { xPercent: offscreen },
            { xPercent: 0, duration: panelDuration, ease: "power4.out" },
            panelInsertTime,
        );

        // 4. Staggered item labels entrance (clean, bold, no numbers)
        if (itemEls.length) {
            const itemsStart = panelInsertTime + 0.12;

            tl.to(
                itemEls,
                {
                    yPercent: 0,
                    rotate: 0,
                    opacity: 1,
                    duration: 0.75,
                    ease: "power4.out",
                    stagger: { each: 0.065, from: "start" },
                },
                itemsStart,
            );
        }

        // 5. Studio extra details
        if (extraCols.length) {
            tl.to(
                extraCols,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power3.out",
                    stagger: 0.08,
                },
                panelInsertTime + 0.25,
            );
        }

        // 6. Social links fade up
        if (socialTitle || socialLinks.length) {
            const socialsStart = panelInsertTime + 0.35;

            if (socialTitle) {
                tl.to(
                    socialTitle,
                    { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
                    socialsStart,
                );
            }

            if (socialLinks.length) {
                tl.to(
                    socialLinks,
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.4,
                        ease: "power3.out",
                        stagger: { each: 0.05, from: "start" },
                    },
                    socialsStart + 0.05,
                );
            }
        }

        openTlRef.current = tl;
        return tl;
    }, [position]);

    const playOpen = useCallback(() => {
        if (busyRef.current) return;
        busyRef.current = true;
        const tl = buildOpenTimeline();
        if (tl) {
            tl.eventCallback("onComplete", () => {
                busyRef.current = false;
            });
            tl.play(0);
        } else {
            busyRef.current = false;
        }
    }, [buildOpenTimeline]);

    const playClose = useCallback(() => {
        openTlRef.current?.kill();
        openTlRef.current = null;
        closeTlRef.current?.kill();

        const panel = panelRef.current;
        const layers = preLayerElsRef.current;
        const backdrop = backdropRef.current;
        if (!panel) return;

        const offscreen = position === "left" ? -100 : 100;

        // Smooth slide-out back to the right
        const closeTl = gsap.timeline({
            defaults: { ease: "power3.inOut" },
            onComplete: () => {
                const itemEls = Array.from(
                    panel.querySelectorAll(".sm-panel-itemLabel"),
                ) as HTMLElement[];
                if (itemEls.length)
                    gsap.set(itemEls, { yPercent: 120, rotate: 3, opacity: 0 });

                busyRef.current = false;
            },
        });

        // 1. Panel slides out
        closeTl.to(panel, { xPercent: offscreen, duration: 0.42 }, 0);

        // 2. Pre-layers slide out with slight stagger
        layers.forEach((layer, i) => {
            closeTl.to(layer, { xPercent: offscreen, duration: 0.38 }, 0.03 + i * 0.03);
        });

        // 3. Backdrop blur fades out
        if (backdrop) {
            closeTl.to(backdrop, { opacity: 0, duration: 0.35 }, 0.04);
        }

        closeTlRef.current = closeTl;
    }, [position]);

    const toggleMenu = useCallback(() => {
        const target = !openRef.current;
        openRef.current = target;
        setOpen(target);

        if (target) {
            onMenuOpen?.();
            playOpen();
        } else {
            onMenuClose?.();
            playClose();
        }
    }, [playOpen, playClose, onMenuOpen, onMenuClose]);

    const closeMenu = useCallback(() => {
        if (openRef.current) {
            openRef.current = false;
            setOpen(false);
            onMenuClose?.();
            playClose();
        }
    }, [playClose, onMenuClose]);

    // Keyboard support: Escape closes the menu
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && open) {
                closeMenu();
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, closeMenu]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    // Close on click outside panel
    useEffect(() => {
        if (!closeOnClickAway || !open) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                panelRef.current &&
                !panelRef.current.contains(event.target as Node) &&
                toggleBtnRef.current &&
                !toggleBtnRef.current.contains(event.target as Node)
            ) {
                closeMenu();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [closeOnClickAway, open, closeMenu]);

    // 40-50% width class on tablet/desktop, full width on small phones
    const drawerWidthClass = "w-full sm:w-[480px] md:w-[46vw] lg:w-[42vw] xl:w-[38vw] max-w-[580px]";

    return (
        <div
            className={`sm-scope relative inline-flex items-center ${className}`}
        >
            <style>{`
                @keyframes sm-wave-front {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes sm-wave-back {
                    0% { transform: translateX(-25%); }
                    100% { transform: translateX(-75%); }
                }
                .sm-wave-front {
                    animation: sm-wave-front 2.2s linear infinite;
                }
                .sm-wave-back {
                    animation: sm-wave-back 3.4s linear infinite;
                }
            `}</style>

            {/* 1. Toggle Button: Living liquid wave fill on hover, fixed in single place, morphs Menu <-> Close */}
            <button
                ref={toggleBtnRef}
                className={`group sm-toggle relative z-[95] inline-flex items-center gap-2.5 h-10 px-4 rounded-full border cursor-pointer select-none overflow-hidden transition-all duration-300 pointer-events-auto hover:scale-105 active:scale-95 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_22px_rgba(237,74,28,0.35)] ${
                    open
                        ? "border-[#ed4a1c] bg-[#ed4a1c]"
                        : "bg-white border-black/12 hover:border-[#ed4a1c]"
                }`}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="staggered-menu-panel"
                onClick={toggleMenu}
                type="button"
            >
                {/* Liquid Wave Fill Layer: Dual undulating waves surging through the button */}
                <div
                    className={`pointer-events-none absolute left-[-25%] w-[150%] top-0 h-[92px] transition-transform duration-600 ease-[cubic-bezier(0.2,1,0.25,1)] flex flex-col ${
                        open
                            ? "translate-y-[-6px]"
                            : "translate-y-[44px] group-hover:translate-y-[-4px]"
                    }`}
                    aria-hidden="true"
                >
                    {/* Deep Living Waves (height 54px with full 40px sine swell) */}
                    <div className="relative w-full h-[54px] shrink-0">
                        {/* Secondary Back Wave (amber-peach swell, opposite phase) */}
                        <svg
                            className="sm-wave-back absolute top-0 left-0 w-[200%] h-full"
                            viewBox="0 0 1000 60"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M 0,25 C 150,-5 350,55 500,25 C 650,-5 850,55 1000,25 L 1000,60 L 0,60 Z"
                                fill="#ff7a3d"
                                opacity="0.75"
                            />
                            <path
                                d="M 0,25 C 150,-5 350,55 500,25 C 650,-5 850,55 1000,25"
                                fill="none"
                                stroke="rgba(255,255,255,0.5)"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>

                        {/* Primary Front Wave (Flame Orange swell with bright white foam crest line) */}
                        <svg
                            className="sm-wave-front absolute top-0 left-0 w-[200%] h-full"
                            viewBox="0 0 1000 60"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M 0,25 C 150,55 350,-5 500,25 C 650,55 850,-5 1000,25 L 1000,60 L 0,60 Z"
                                fill="#ed4a1c"
                                opacity="0.9"
                            />
                            {/* Luminous water foam crest line */}
                            <path
                                d="M 0,25 C 150,55 350,-5 500,25 C 650,55 850,-5 1000,25"
                                fill="none"
                                stroke="rgba(255,255,255,0.95)"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

                    {/* Liquid Base below wave */}
                    <div className="w-full flex-1 bg-[#ed4a1c] -mt-[1px]" />
                </div>

                {/* Natural CSS Grid for Menu <-> Close (Zero text clipping, zero hardcoded width jumps) */}
                <span className="relative z-10 grid grid-cols-1 items-center pointer-events-none">
                    <span
                        className={`col-start-1 row-start-1 font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                            open
                                ? "opacity-0 -translate-y-2.5 pointer-events-none text-white"
                                : "opacity-100 translate-y-0 text-[#05080c] group-hover:text-white group-hover:drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                        }`}
                    >
                        Menu
                    </span>
                    <span
                        className={`col-start-1 row-start-1 font-mono text-xs font-semibold uppercase tracking-wider text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] transition-all duration-300 ${
                            open
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-2.5 pointer-events-none"
                        }`}
                    >
                        Close
                    </span>
                </span>

                {/* Animated 2-bar hamburger icon morphing into a crisp 'X' */}
                <span
                    className="relative z-10 w-3.5 h-3.5 shrink-0 flex items-center justify-center pointer-events-none"
                    aria-hidden="true"
                >
                    <span
                        className={`absolute h-[1.5px] w-3.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            open
                                ? "bg-white rotate-45 translate-y-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                                : "-translate-y-1 rotate-0 bg-[#05080c] group-hover:bg-white group-hover:drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                        }`}
                    />
                    <span
                        className={`absolute h-[1.5px] w-3.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            open
                                ? "bg-white -rotate-45 translate-y-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                                : "translate-y-1 rotate-0 bg-[#05080c] group-hover:bg-white group-hover:drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                        }`}
                    />
                </span>
            </button>

            {/* 2. 40-50% Sidebar Drawer Portaled to Document Body */}
            {mounted &&
                createPortal(
                    <div
                        className="sm-portal-wrapper fixed inset-0 z-[80] pointer-events-none"
                        style={{ pointerEvents: open ? "auto" : "none" }}
                    >
                        {/* A. Backdrop Overlay: Softly blurs and dims the remaining 50-60% of the screen */}
                        <div
                            ref={backdropRef}
                            className="fixed inset-0 bg-black/25 backdrop-blur-[6px] transition-opacity pointer-events-auto"
                            onClick={closeMenu}
                            style={{
                                opacity: 0,
                                pointerEvents: open ? "auto" : "none",
                            }}
                            aria-hidden="true"
                        />

                        {/* B. Staggered Pre-Layers (DOVV Studio colors: Graphite & Flame Orange, 40-50% width) */}
                        <div
                            ref={preLayersRef}
                            className={`sm-prelayers fixed top-0 right-0 bottom-0 h-screen ${drawerWidthClass} pointer-events-none overflow-hidden z-[85]`}
                            aria-hidden="true"
                        >
                            {colors.map((c, i) => (
                                <div
                                    key={i}
                                    className="sm-prelayer absolute inset-0 h-full w-full"
                                    style={{ background: c }}
                                />
                            ))}
                        </div>

                        {/* C. Main 40-50% Sidebar Panel */}
                        <aside
                            id="staggered-menu-panel"
                            ref={panelRef}
                            className={`staggered-menu-panel fixed top-0 right-0 bottom-0 h-screen ${drawerWidthClass} bg-[#f5f5f5]/97 backdrop-blur-2xl flex flex-col justify-between pt-24 sm:pt-28 pb-8 px-8 sm:px-12 md:px-14 overflow-y-auto overflow-x-hidden pointer-events-auto z-[90] shadow-[-20px_0_60px_rgba(0,0,0,0.16)]`}
                            aria-hidden={!open}
                            style={{ pointerEvents: open ? "auto" : "none" }}
                        >
                            {/* Navigation Items (Clean, bold editorial links without numbers) */}
                            <div className="my-auto py-4">
                                <ul
                                    className="sm-panel-list list-none -mt-26 p-0 flex flex-col gap-3 sm:gap-4"
                                    role="list"
                                >
                                    {items.map((it, idx) => (
                                        <li
                                            className="sm-panel-itemWrap relative overflow-hidden leading-none"
                                            key={it.label + idx}
                                        >
                                            <a
                                                className="group sm-panel-item relative text-[#05080c] font-display font-black text-[clamp(2rem,4.5vw,2.5rem)] cursor-pointer leading-[1.1] tracking-tight uppercase transition-all duration-300 ease-out inline-flex items-center gap-3 no-underline hover:text-[#ed4a1c] hover:translate-x-3"
                                                href={it.link}
                                                aria-label={
                                                    it.ariaLabel || it.label
                                                }
                                                onClick={(e) => {
                                                    if (onItemClick) {
                                                        e.preventDefault();
                                                        onItemClick(it);
                                                    }
                                                    closeMenu();
                                                }}
                                            >
                                                <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                                                    {it.label}
                                                </span>
                                                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#ed4a1c] font-mono text-xl"></span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Studio Details / Availability in Sidebar */}
                            {/* <div className="py-6 border-t border-black/8 flex flex-col gap-4">
                                <div className="sm-panel-extra flex items-center justify-between gap-4">
                                    <span className="font-mono text-xs uppercase tracking-wider text-[#5b5b5b]">
                                        Status
                                    </span>
                                    <span className="text-xs text-[#05080c] font-semibold flex items-center gap-2">
                                        <span className="inline-block w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                                        Available for Work
                                    </span>
                                </div>
                                <div className="sm-panel-extra flex items-center justify-between gap-4">
                                    <span className="font-mono text-xs uppercase tracking-wider text-[#5b5b5b]">
                                        Email
                                    </span>
                                    <a
                                        href="mailto:adityadhanshetti@gmail.com"
                                        className="text-xs font-mono text-[#05080c] hover:text-[#ed4a1c] underline underline-offset-4 transition-colors font-medium"
                                    >
                                        adityadhanshetti@gmail.com ↗
                                    </a>
                                </div>
                            </div> */}

                            {/* Footer: Social Links */}
                            {displaySocials &&
                                socialItems &&
                                socialItems.length > 0 && (
                                    <div className="sm-socials pt-4 border-t border-black/8 flex items-center justify-between gap-4">
                                        <ul className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-5 flex-wrap">
                                            {socialItems.map((s, i) => (
                                                <li
                                                    key={s.label + i}
                                                    className="sm-socials-item"
                                                >
                                                    <a
                                                        href={s.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="sm-socials-link font-mono text-xs text-[#4f4f4f] hover:text-[#ed4a1c] transition-colors uppercase tracking-wider"
                                                    >
                                                        {s.label}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                        </aside>
                    </div>,
                    document.body,
                )}
        </div>
    );
};

export default StaggeredMenu;
