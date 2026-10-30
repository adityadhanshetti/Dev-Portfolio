"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export type MenuItem = {
    label: string;
    href: string;
    ariaLabel?: string;
    rotation?: number;
    hoverStyles?: {
        bgColor?: string;
        textColor?: string;
    };
};

export type BubbleMenuProps = {
    logo?: ReactNode | string;
    showLogo?: boolean;
    onMenuClick?: (open: boolean) => void;
    onItemClick?: (item: MenuItem) => void;
    className?: string;
    style?: CSSProperties;
    menuAriaLabel?: string;
    menuBg?: string;
    menuContentColor?: string;
    useFixedPosition?: boolean;
    items?: MenuItem[];
    animationEase?: string;
    animationDuration?: number;
    staggerDelay?: number;
};

const DEFAULT_ITEMS: MenuItem[] = [
    {
        label: "home",
        href: "#",
        ariaLabel: "Home",
        rotation: -7,
        hoverStyles: { bgColor: "#ed4a1c", textColor: "#ffffff" },
    },
    {
        label: "work",
        href: "#work",
        ariaLabel: "Selected Work",
        rotation: 6,
        hoverStyles: { bgColor: "#c6f432", textColor: "#05080c" },
    },
    {
        label: "about",
        href: "#about",
        ariaLabel: "About Aditya",
        rotation: -5,
        hoverStyles: { bgColor: "#05080c", textColor: "#ffffff" },
    },
    {
        label: "sonic deck",
        href: "#music",
        ariaLabel: "Sonic Deck",
        rotation: 7,
        hoverStyles: { bgColor: "#8b5cf6", textColor: "#ffffff" },
    },
    {
        label: "contact",
        href: "#contact",
        ariaLabel: "Get In Touch",
        rotation: -6,
        hoverStyles: { bgColor: "#ed4a1c", textColor: "#ffffff" },
    },
];

export default function BubbleMenu({
    logo,
    showLogo = true,
    onMenuClick,
    onItemClick,
    className,
    style,
    menuAriaLabel = "Toggle navigation menu",
    menuBg = "#ffffff",
    menuContentColor = "#05080c",
    useFixedPosition = true,
    items,
    animationEase = "back.out(1.5)",
    animationDuration = 0.5,
    staggerDelay = 0.09,
}: BubbleMenuProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

    const overlayRef = useRef<HTMLDivElement>(null);
    const bubblesRef = useRef<HTMLAnchorElement[]>([]);
    const labelRefs = useRef<HTMLSpanElement[]>([]);

    const menuItems = items?.length ? items : DEFAULT_ITEMS;

    const handleToggle = () => {
        const nextState = !isMenuOpen;
        if (nextState) setShowOverlay(true);
        setIsMenuOpen(nextState);
        onMenuClick?.(nextState);
    };

    // Keyboard support: Escape closes the menu
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isMenuOpen) {
                handleToggle();
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isMenuOpen]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const overlay = overlayRef.current;
        const bubbles = bubblesRef.current.filter(Boolean);
        const labels = labelRefs.current.filter(Boolean);
        if (!overlay || !bubbles.length) return;

        if (isMenuOpen) {
            gsap.set(overlay, { display: "flex" });
            gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
            gsap.killTweensOf([...bubbles, ...labels]);
            gsap.set(bubbles, { scale: 0, transformOrigin: "50% 50%" });
            gsap.set(labels, { y: 24, autoAlpha: 0 });

            bubbles.forEach((bubble, i) => {
                const delay = i * staggerDelay + gsap.utils.random(-0.03, 0.03);
                const tl = gsap.timeline({ delay });
                tl.to(bubble, {
                    scale: 1,
                    duration: animationDuration,
                    ease: animationEase,
                });
                if (labels[i]) {
                    tl.to(
                        labels[i],
                        {
                            y: 0,
                            autoAlpha: 1,
                            duration: animationDuration,
                            ease: "power3.out",
                        },
                        "-=" + animationDuration * 0.9,
                    );
                }
            });
        } else if (showOverlay) {
            gsap.killTweensOf([...bubbles, ...labels, overlay]);
            gsap.to(overlay, { opacity: 0, duration: 0.25, ease: "power2.in" });
            gsap.to(labels, {
                y: 24,
                autoAlpha: 0,
                duration: 0.2,
                ease: "power3.in",
            });
            gsap.to(bubbles, {
                scale: 0,
                duration: 0.2,
                ease: "power3.in",
                onComplete: () => {
                    gsap.set(overlay, { display: "none" });
                    setShowOverlay(false);
                },
            });
        }
    }, [
        isMenuOpen,
        showOverlay,
        animationEase,
        animationDuration,
        staggerDelay,
    ]);

    useEffect(() => {
        const handleResize = () => {
            if (isMenuOpen) {
                const bubbles = bubblesRef.current.filter(Boolean);
                const isDesktop = window.innerWidth >= 900;
                bubbles.forEach((bubble, i) => {
                    const item = menuItems[i];
                    if (bubble && item) {
                        const rotation = isDesktop ? (item.rotation ?? 0) : 0;
                        gsap.set(bubble, { rotation });
                    }
                });
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isMenuOpen, menuItems]);

    const toggleButton = (
        <button
            type="button"
            className={[
                "bubble toggle-bubble menu-btn",
                isMenuOpen ? "open" : "",
                "inline-flex flex-col items-center justify-center",
                "rounded-full",
                "bg-white",
                "border border-black/10 hover:border-black/20",
                "shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]",
                "pointer-events-auto",
                "w-10 h-10 md:w-11 md:h-11",
                "cursor-pointer p-0",
                "transition-transform duration-200 ease-out",
                "hover:scale-105 active:scale-95",
                "relative z-[1002]",
            ].join(" ")}
            onClick={handleToggle}
            aria-label={menuAriaLabel}
            aria-pressed={isMenuOpen}
            style={{ background: menuBg }}
        >
            <span
                className="menu-line block mx-auto rounded-[2px]"
                style={{
                    width: 20,
                    height: 2,
                    background: menuContentColor,
                    transform: isMenuOpen
                        ? "translateY(3.5px) rotate(45deg)"
                        : "none",
                }}
            />
            <span
                className="menu-line short block mx-auto rounded-[2px]"
                style={{
                    marginTop: "5px",
                    width: 20,
                    height: 2,
                    background: menuContentColor,
                    transform: isMenuOpen
                        ? "translateY(-3.5px) rotate(-45deg)"
                        : "none",
                }}
            />
        </button>
    );

    return (
        <>
            <style>{`
        .bubble-menu .menu-line,
        .menu-btn .menu-line {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
          transform-origin: center;
        }
        .bubble-menu-items .pill-list .pill-col:nth-child(4):nth-last-child(2) {
          margin-left: calc(100% / 6);
        }
        .bubble-menu-items .pill-list .pill-col:nth-child(4):last-child {
          margin-left: calc(100% / 3);
        }
        @media (min-width: 900px) {
          .bubble-menu-items .pill-link {
            transform: rotate(var(--item-rot));
          }
          .bubble-menu-items .pill-link:hover {
            transform: rotate(var(--item-rot)) scale(1.06);
            background: var(--hover-bg) !important;
            color: var(--hover-color) !important;
            border-color: transparent !important;
          }
          .bubble-menu-items .pill-link:active {
            transform: rotate(var(--item-rot)) scale(.95);
          }
        }
        @media (max-width: 899px) {
          .bubble-menu-items {
            padding-top: 100px;
            align-items: flex-start;
          }
          .bubble-menu-items .pill-list {
            row-gap: 14px;
          }
          .bubble-menu-items .pill-list .pill-col {
            flex: 0 0 100% !important;
            margin-left: 0 !important;
            overflow: visible;
          }
          .bubble-menu-items .pill-link {
            font-size: clamp(1.3rem, 3.5vw, 2.6rem);
            padding: clamp(1rem, 2vw, 1.8rem) 0;
            min-height: 72px !important;
          }
          .bubble-menu-items .pill-link:hover {
            transform: scale(1.04);
            background: var(--hover-bg);
            color: var(--hover-color);
          }
          .bubble-menu-items .pill-link:active {
            transform: scale(.96);
          }
        }
      `}</style>

            {/* If showLogo is enabled, render the classic BubbleMenu bar */}
            {showLogo ? (
                <nav
                    className={[
                        "bubble-menu",
                        useFixedPosition ? "fixed" : "absolute",
                        "left-0 right-0 top-8",
                        "flex items-center justify-between",
                        "gap-4 px-8",
                        "pointer-events-none",
                        "z-[1001]",
                        className,
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    style={style}
                    aria-label="Main navigation"
                >
                    <div
                        className={[
                            "bubble logo-bubble",
                            "inline-flex items-center justify-center",
                            "rounded-full",
                            "bg-white",
                            "shadow-[0_4px_16px_rgba(0,0,0,0.12)]",
                            "pointer-events-auto",
                            "h-12 md:h-14",
                            "px-4 md:px-8",
                            "gap-2",
                            "will-change-transform",
                        ].join(" ")}
                        aria-label="Logo"
                        style={{
                            background: menuBg,
                            minHeight: "48px",
                            borderRadius: "9999px",
                        }}
                    >
                        <span
                            className={[
                                "logo-content",
                                "inline-flex items-center justify-center",
                                "w-[120px] h-full",
                            ].join(" ")}
                        >
                            {typeof logo === "string" ? (
                                <img
                                    src={logo}
                                    alt="Logo"
                                    className="bubble-logo max-h-[60%] max-w-full object-contain block"
                                />
                            ) : (
                                logo
                            )}
                        </span>
                    </div>

                    {toggleButton}
                </nav>
            ) : (
                /* Standalone hamburger button placed directly in Navbar next to Contact */
                <div className={["relative inline-flex items-center", className].filter(Boolean).join(" ")} style={style}>
                    {toggleButton}
                </div>
            )}

            {/* Full-Screen Bubble Menu Overlay with Subtle Background Blur */}
            {showOverlay && (
                <div
                    ref={overlayRef}
                    className={[
                        "bubble-menu-items",
                        "fixed inset-0",
                        "flex items-center justify-center",
                        "z-[1000]",
                        "bg-[#f5f5f5]/85 backdrop-blur-md",
                        "pointer-events-auto",
                        "overflow-y-auto py-16",
                    ].join(" ")}
                    onClick={(e) => {
                        // Clicking the blurred backdrop closes the menu
                        if (e.target === overlayRef.current) {
                            handleToggle();
                        }
                    }}
                    aria-hidden={!isMenuOpen}
                >
                    <ul
                        className={[
                            "pill-list",
                            "list-none m-0 px-6",
                            "w-full max-w-[1400px] mx-auto",
                            "flex flex-wrap",
                            "gap-x-0 gap-y-3",
                            "pointer-events-auto",
                        ].join(" ")}
                        role="menu"
                        aria-label="Menu links"
                    >
                        {menuItems.map((item, idx) => (
                            <li
                                key={idx}
                                role="none"
                                className={[
                                    "pill-col",
                                    "flex justify-center items-stretch",
                                    "[flex:0_0_calc(100%/3)]",
                                    "box-border",
                                    "px-3",
                                ].join(" ")}
                            >
                                <a
                                    role="menuitem"
                                    href={item.href}
                                    aria-label={item.ariaLabel || item.label}
                                    onClick={(e) => {
                                        if (onItemClick) {
                                            e.preventDefault();
                                            onItemClick(item);
                                        }
                                        handleToggle();
                                    }}
                                    className={[
                                        "pill-link",
                                        "w-full",
                                        "rounded-full",
                                        "no-underline",
                                        "bg-white",
                                        "text-[#05080c]",
                                        "border border-black/8",
                                        "shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.14)]",
                                        "flex items-center justify-center",
                                        "relative",
                                        "transition-all duration-300 ease-out",
                                        "box-border",
                                        "whitespace-nowrap overflow-hidden",
                                        "cursor-pointer",
                                    ].join(" ")}
                                    style={
                                        {
                                            ["--item-rot"]: `${item.rotation ?? 0}deg`,
                                            ["--pill-bg"]: menuBg,
                                            ["--pill-color"]: menuContentColor,
                                            ["--hover-bg"]:
                                                item.hoverStyles?.bgColor ||
                                                "#f3f4f6",
                                            ["--hover-color"]:
                                                item.hoverStyles?.textColor ||
                                                menuContentColor,
                                            background: "var(--pill-bg)",
                                            color: "var(--pill-color)",
                                            minHeight: "115px",
                                            padding: "clamp(1.5rem, 2.5vw, 3.5rem) 0",
                                            fontSize: "clamp(1.5rem, 3.2vw, 3rem)",
                                            fontFamily: "'Bricolage Grotesque Variable', sans-serif",
                                            fontWeight: 800,
                                            textTransform: "uppercase",
                                            letterSpacing: "-0.02em",
                                            lineHeight: 1,
                                            willChange: "transform",
                                        } as CSSProperties
                                    }
                                    ref={(el) => {
                                        if (el) bubblesRef.current[idx] = el;
                                    }}
                                >
                                    <span
                                        className="pill-label inline-block"
                                        style={{
                                            willChange: "transform, opacity",
                                            lineHeight: 1.2,
                                        }}
                                        ref={(el) => {
                                            if (el) labelRefs.current[idx] = el;
                                        }}
                                    >
                                        {item.label}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

export { BubbleMenu };
