import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode
} from 'react';

type Axis = 'both' | 'horizontal' | 'vertical';

export interface TiltedCardProps {
  imageSrc?: string;
  altText?: string;
  captionText?: string;
  containerHeight?: number | string;
  containerWidth?: number | string;
  imageHeight?: number | string;
  imageWidth?: number | string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showTooltip?: boolean;
  overlayContent?: ReactNode;
  displayOverlayContent?: boolean;
  overlayDepth?: number;
  children?: ReactNode;
  backContent?: ReactNode;
  flipOnClick?: boolean;
  flipped?: boolean;
  onFlip?: (flipped: boolean) => void;
  radius?: number | string;
  perspective?: number | string;
  smoothness?: number;
  glare?: number;
  glareColor?: string;
  shadow?: number;
  parallax?: number;
  axis?: Axis;
  reverse?: boolean;
  trackWindow?: boolean;
  floating?: boolean;
  gyroscope?: boolean;
  intro?: boolean;
  introDelay?: number;
  onClick?: (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void;
  className?: string;
  style?: CSSProperties;
}

const LAYER_TRANSFORM =
  'translate3d(calc(var(--tc-px, 0) * var(--tc-depth, 0) * 1px), calc(var(--tc-py, 0) * var(--tc-depth, 0) * 1px), 0)';

const GLARE_STYLE: CSSProperties = {
  background:
    'radial-gradient(farthest-corner circle at var(--tc-gx, 50%) var(--tc-gy, 50%), rgba(var(--tc-glare-rgb, 255, 255, 255), calc(var(--tc-glare, 0) * 0.34)) 0%, rgba(var(--tc-glare-rgb, 255, 255, 255), calc(var(--tc-glare, 0) * 0.331)) 9%, rgba(var(--tc-glare-rgb, 255, 255, 255), calc(var(--tc-glare, 0) * 0.285)) 18%, rgba(var(--tc-glare-rgb, 255, 255, 255), calc(var(--tc-glare, 0) * 0.202)) 27%, rgba(var(--tc-glare-rgb, 255, 255, 255), calc(var(--tc-glare, 0) * 0.108)) 36%, rgba(var(--tc-glare-rgb, 255, 255, 255), calc(var(--tc-glare, 0) * 0.035)) 45%, rgba(var(--tc-glare-rgb, 255, 255, 255), 0) 60%)'
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const parseColor = (value: string): number[] | null => {
  const text = String(value || '').trim();
  const hex = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(text);
  if (hex) {
    const full = hex[1].length === 3 ? hex[1].replace(/./g, digit => digit + digit) : hex[1];
    return [0, 2, 4].map(index => parseInt(full.slice(index, index + 2), 16));
  }
  const rgb = /^rgba?\(\s*([\d.]+)[/\s,]+([\d.]+)[/\s,]+([\d.]+)/i.exec(text);
  if (rgb) return [rgb[1], rgb[2], rgb[3]].map(channel => clamp(Math.round(parseFloat(channel)), 0, 255));
  return [255, 255, 255];
};

const toLength = (value: number | string | undefined) => (typeof value === 'number' ? `${value}px` : value);

export const TiltedCard = ({
  imageSrc,
  altText = 'Nature imagery',
  captionText,
  containerHeight = '100%',
  containerWidth = '100%',
  imageHeight = '100%',
  imageWidth = '100%',
  scaleOnHover = 1.04,
  rotateAmplitude = 14,
  showTooltip = true,
  overlayContent,
  displayOverlayContent = false,
  overlayDepth = 30,
  children,
  radius = 12,
  perspective = 900,
  smoothness = 0.14,
  glare = 0.5,
  glareColor = 'rgba(74, 222, 128, 0.4)',
  shadow = 0.35,
  parallax = 15,
  className = '',
  style
}: TiltedCardProps) => {
  const figureRef = useRef<HTMLElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const captionRef = useRef<HTMLElement | null>(null);

  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  const parsedGlare = parseColor(glareColor) || [74, 222, 128];
  const glareRgb = `${parsedGlare[0]}, ${parsedGlare[1]}, ${parsedGlare[2]}`;

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = figureRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    const y = clamp((e.clientY - rect.top) / rect.height, 0, 1);
    setMousePos({ x, y });

    if (captionRef.current) {
      captionRef.current.style.transform = `translate3d(${e.clientX - rect.left + 12}px, ${e.clientY - rect.top + 12}px, 0)`;
    }
  };

  const rotX = isHovered ? (0.5 - mousePos.y) * rotateAmplitude : 0;
  const rotY = isHovered ? (mousePos.x - 0.5) * rotateAmplitude : 0;
  const scaleVal = isHovered ? scaleOnHover : 1;

  return (
    <figure
      ref={figureRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden transition-all duration-300 ease-out cursor-pointer ${className}`}
      style={{
        width: toLength(containerWidth),
        height: toLength(containerHeight),
        perspective: toLength(perspective),
        ...style
      }}
    >
      <div
        ref={bodyRef}
        className="relative w-full h-full rounded-[inherit] transition-transform duration-200 ease-out [transform-style:preserve-3d]"
        style={{
          borderRadius: toLength(radius),
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${scaleVal}, ${scaleVal}, 1)`,
        }}
      >
        {/* Image layer */}
        {imageSrc && (
          <img
            src={imageSrc}
            alt={altText}
            className="w-full h-full object-cover rounded-[inherit] pointer-events-none select-none"
            style={{
              borderRadius: toLength(radius),
            }}
          />
        )}

        {children}

        {/* Dynamic Light Glare */}
        <span
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] mix-blend-screen transition-opacity duration-300"
          style={{
            ...GLARE_STYLE,
            opacity: isHovered ? glare : 0,
            ['--tc-gx' as any]: `${mousePos.x * 100}%`,
            ['--tc-gy' as any]: `${mousePos.y * 100}%`,
            ['--tc-glare-rgb' as any]: glareRgb,
            ['--tc-glare' as any]: glare,
          }}
          aria-hidden="true"
        />

        {/* Ambient Overlay border */}
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-line-strong group-hover:border-accent/40 transition-colors z-20" />

        {/* Optional Overlay Content */}
        {displayOverlayContent && overlayContent && (
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{ transform: `translateZ(${overlayDepth}px)` }}
          >
            {overlayContent}
          </div>
        )}
      </div>

      {/* Floating Hover Tooltip */}
      {showTooltip && captionText && (
        <figcaption
          ref={captionRef}
          className={`pointer-events-none absolute left-0 top-0 z-30 whitespace-nowrap rounded font-mono text-[11px] uppercase tracking-wider bg-surface-1/90 backdrop-blur-md px-2.5 py-1 text-accent border border-accent/30 transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {captionText}
        </figcaption>
      )}
    </figure>
  );
};

export default TiltedCard;

