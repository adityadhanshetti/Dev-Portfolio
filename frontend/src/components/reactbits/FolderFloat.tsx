"use client";

import React, {
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    type CSSProperties,
} from "react";

export type FolderFloatItem = string | { label: string; value: string; icon?: React.ReactNode };

export interface FolderFloatProps {
    items?: FolderFloatItem[];
    label?: string;
    sublabel?: string;
    folderColor?: string;
    frontColor?: string;
    paperColor?: string;
    itemColor?: string;
    itemTextColor?: string;
    labelColor?: string;
    width?: number;
    height?: number;
    radius?: number;
    spread?: number;
    lift?: number;
    flapAngle?: number;
    className?: string;
}

type Entry = { label: string; value: string; icon?: React.ReactNode };
type Size = { w: number; h: number };

const DEFAULT_ITEMS: FolderFloatItem[] = [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
];

const PAD = 28;
const CHAR = 7.6;
const GAP = 12;
const ROW = 48;

const layout = (
    list: Entry[],
    spread: number,
    lift: number,
    sizes: (Size | null)[],
) => {
    const rows: { items: { i: number; pw: number }[]; width: number }[] = [];
    let row: { i: number; pw: number }[] = [];
    let width = 0;

    list.forEach((item, i) => {
        const pw = sizes[i]?.w ?? Math.round(PAD + item.label.length * CHAR + (item.icon ? 22 : 0));
        if (row.length && width + GAP + pw > spread * 2) {
            rows.push({ items: row, width });
            row = [];
            width = 0;
        }
        row.push({ i, pw });
        width += (row.length > 1 ? GAP : 0) + pw;
    });
    if (row.length) rows.push({ items: row, width });

    const pos: { x: number; y: number }[] = [];
    rows.forEach((r, ri) => {
        let x = -r.width / 2;
        const shift = (ri % 2 === 1 ? 1 : -1) * Math.min(8, spread * 0.02);
        r.items.forEach(({ i, pw }) => {
            pos[i] = {
                x: x + pw / 2 + shift,
                y: -lift - ri * ROW,
            };
            x += pw + GAP;
        });
    });

    const totalHeight = rows.length * ROW + lift;
    return { pos, totalHeight };
};

const FolderFloat: React.FC<FolderFloatProps> = ({
    items = DEFAULT_ITEMS,
    label = "Skills",
    sublabel = "",
    folderColor = "#1e1e22",
    frontColor = "#2a2b30",
    paperColor = "#f5f5f5",
    itemColor = "#ffffff",
    itemTextColor = "#05080c",
    labelColor = "#ffffff",
    width = 250,
    height = 170,
    radius = 16,
    spread = 480,
    lift = 44,
    flapAngle = 32,
    className = "",
}) => {
    const [sizes, setSizes] = useState<Size[]>([]);
    const [windowWidth, setWindowWidth] = useState<number>(1200);
    const pillRefs = useRef<(HTMLDivElement | null)[]>([]);

    const list: Entry[] = items.map((item) =>
        typeof item === "string" ? { label: item, value: item } : item,
    );
    const n = list.length;
    const sub = sublabel || `${n} technologies`;

    // Responsive spread based on viewport width
    useEffect(() => {
        const onResize = () => setWindowWidth(window.innerWidth);
        onResize();
        window.addEventListener("resize", onResize, { passive: true });
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const effectiveSpread = Math.min(
        spread,
        Math.max(160, Math.floor((windowWidth - 48) / 2))
    );

    const { pos, totalHeight } = layout(list, effectiveSpread, lift, sizes);

    const labelsKey = list.map((item) => item.label).join("|");
    useLayoutEffect(() => {
        const measure = () => {
            const next = pillRefs.current
                .slice(0, n)
                .map((el) =>
                    el ? { w: el.offsetWidth, h: el.offsetHeight } : null,
                );
            if (next.some((s) => !s)) return;
            const sized = next as Size[];
            setSizes((prev) =>
                prev.length === sized.length &&
                prev.every((s, i) => s.w === sized[i].w && s.h === sized[i].h)
                    ? prev
                    : sized,
            );
        };
        measure();
        document.fonts?.ready.then(measure);
    }, [n, labelsKey]);

    return (
        <div
            className={`relative flex flex-col items-center select-none w-full${className ? ` ${className}` : ""}`}
            style={{
                paddingTop: `${totalHeight + 16}px`,
                "--ff-w": `${width}px`,
                "--ff-h": `${height}px`,
                "--ff-r": `${radius}px`,
                "--ff-back": folderColor,
                "--ff-front": frontColor,
                "--ff-paper": paperColor,
                "--ff-item": itemColor,
                "--ff-item-ink": itemTextColor,
                "--ff-label": labelColor,
                "--ff-angle": `${flapAngle}deg`,
                "--ff-tab": "16px",
            } as CSSProperties}
        >
            {/* The Skills Arena (Permanently Open, Crisp, Non-Overlapping, Zero Physics/Flinging) */}
            <div className="absolute top-[var(--ff-tab)] left-1/2 z-[5] h-0 w-0">
                {list.map((item, i) => {
                    const p = pos[i] || { x: 0, y: 0 };
                    return (
                        <div
                            key={`${item.value}-${i}`}
                            ref={(el) => {
                                pillRefs.current[i] = el;
                            }}
                            className="pointer-events-auto absolute top-0 left-1/2 m-0 h-[34px] rounded-full border border-black/8 px-3.5 whitespace-nowrap opacity-100 shadow-[0_2px_10px_rgba(0,0,0,0.06)] [background:var(--ff-item)] [color:var(--ff-item-ink)] transition-all duration-300 hover:scale-105 hover:border-[#ed4a1c]/40 hover:shadow-[0_4px_16px_rgba(237,74,28,0.12)] cursor-default"
                            style={{
                                transform: `translate(calc(-50% + ${p.x.toFixed(1)}px), ${p.y.toFixed(1)}px)`,
                            }}
                        >
                            <span className="inline-flex items-center gap-2 h-full">
                                {item.icon && (
                                    <span className="inline-flex items-center justify-center shrink-0 w-3.5 h-3.5">
                                        {item.icon}
                                    </span>
                                )}
                                <span className="font-medium text-xs tracking-tight">{item.label}</span>
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* The Master Skills Folder (Clean Open Presentation) */}
            <div className="relative [width:var(--ff-w)] [height:var(--ff-h)]">
                {/* Folder Back with Tab */}
                <span
                    className="absolute inset-0 z-0 [border-radius:var(--ff-r)] [background:var(--ff-back)] [transform:perspective(600px)_rotateX(8deg)] [transform-origin:50%_100%] before:absolute before:top-[calc(-1*var(--ff-tab))] before:left-0 before:h-[calc(var(--ff-tab)+var(--ff-r))] before:w-[44%] before:[border-radius:var(--ff-r)_var(--ff-r)_0_0] before:[background:inherit] before:content-[''] shadow-[0_12px_32px_rgba(0,0,0,0.18)]"
                    aria-hidden="true"
                />

                {/* Paper Insert Peeking Out */}
                <span
                    className="absolute top-[8%] right-[8%] left-[8%] z-[1] h-1/2 rounded-md opacity-100 [background:var(--ff-paper)] shadow-inner"
                    aria-hidden="true"
                />

                {/* Folder Front Flap Open */}
                <span
                    className="absolute right-0 bottom-0 left-0 z-[2] box-border flex h-[76%] flex-col justify-end gap-1.5 px-5 py-4 [border-radius:var(--ff-r)] [background:linear-gradient(180deg,color-mix(in_srgb,var(--ff-front)_92%,#fff),var(--ff-front)_60%)] [color:var(--ff-label)] shadow-[0_-10px_28px_rgba(0,0,0,0.32)] [transform:perspective(600px)_rotateX(calc(-1*var(--ff-angle)))] [transform-origin:50%_100%]"
                    aria-hidden="true"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-base font-bold tracking-tight uppercase font-display">{label}</span>
                        <span className="inline-block w-2 h-2 rounded-full bg-[#16c847] shadow-[0_0_8px_#16c847]" />
                    </div>
                    <span className="text-[11px] opacity-70 font-mono tracking-wide">{sub}</span>
                </span>
            </div>
        </div>
    );
};

export { FolderFloat };
export default FolderFloat;