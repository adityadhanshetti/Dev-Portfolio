import { useEffect, useRef } from "react";
import { useReducedMotion, useCalmMode } from "@/lib/hooks";
import { FLAGS } from "@/lib/flags";

interface NatureSilkProps {
  className?: string;
  speed?: number;
  sporeCount?: number;
}

interface Spore {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  pulseSpeed: number;
  baseAlpha: number;
}

/**
 * NatureSilk — React Bits inspired organic background.
 * Simulates gentle wind currents through canopy foliage with
 * floating bioluminescent flora spores and layered atmospheric mist.
 */
export function NatureSilk({
  className = "",
  speed = 0.6,
  sporeCount = 28,
}: NatureSilkProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [calm] = useCalmMode();

  const isEnabled = FLAGS.WEBGL_BG && !reducedMotion && !calm;

  useEffect(() => {
    if (!isEnabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let time = 0;
    let isVisible = true;

    // Spores (bioluminescent organic spores drifting naturally)
    const spores: Spore[] = Array.from({ length: sporeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.2 - Math.random() * 0.5,
      size: 1 + Math.random() * 2.5,
      alpha: 0.2 + Math.random() * 0.6,
      baseAlpha: 0.2 + Math.random() * 0.6,
      pulseSpeed: 0.02 + Math.random() * 0.04,
    }));

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const render = () => {
      if (!isVisible || document.hidden) {
        animId = requestAnimationFrame(render);
        return;
      }

      time += 0.006 * speed;
      ctx.clearRect(0, 0, width, height);

      // Layer 1: Ambient deep canopy glow
      const cx1 = width * 0.35 + Math.sin(time * 0.5) * 90;
      const cy1 = height * 0.3 + Math.cos(time * 0.4) * 60;
      const r1 = Math.max(width, height) * 0.7;

      const grad1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, r1);
      grad1.addColorStop(0, "rgba(16, 185, 129, 0.16)"); // emerald canopy
      grad1.addColorStop(0.4, "rgba(5, 150, 105, 0.08)"); // forest moss
      grad1.addColorStop(1, "rgba(7, 11, 8, 0)");

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Layer 2: Sunlight / dew shimmer flowing like silk across the canopy
      const cx2 = width * 0.7 + Math.cos(time * 0.7) * 80;
      const cy2 = height * 0.6 + Math.sin(time * 0.5) * 70;
      const r2 = Math.max(width, height) * 0.55;

      const grad2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, r2);
      grad2.addColorStop(0, "rgba(74, 222, 128, 0.14)"); // bioluminescent sage glow
      grad2.addColorStop(0.5, "rgba(16, 185, 129, 0.05)");
      grad2.addColorStop(1, "rgba(7, 11, 8, 0)");

      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Layer 3: Organic sinusoidal silk currents (gentle wind currents)
      ctx.save();
      ctx.lineWidth = 1.5;
      const waveCount = 4;
      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        const yBase = height * 0.25 + w * (height * 0.18);
        ctx.moveTo(0, yBase);

        for (let x = 0; x <= width; x += 30) {
          const yOffset =
            Math.sin(x * 0.003 + time * 1.5 + w) * 35 +
            Math.cos(x * 0.002 - time * 0.8) * 20;
          ctx.lineTo(x, yBase + yOffset);
        }

        ctx.strokeStyle = `rgba(74, 222, 128, ${0.035 + w * 0.015})`;
        ctx.stroke();
      }
      ctx.restore();

      // Layer 4: Floating bioluminescent flora spores
      for (const spore of spores) {
        spore.x += spore.vx + Math.sin(time + spore.y * 0.01) * 0.2;
        spore.y += spore.vy;
        spore.alpha =
          spore.baseAlpha + Math.sin(time * 3 + spore.x) * 0.25 * spore.baseAlpha;

        // Wrap around boundaries
        if (spore.y < -10) spore.y = height + 10;
        if (spore.x < -10) spore.x = width + 10;
        if (spore.x > width + 10) spore.x = -10;

        ctx.beginPath();
        ctx.arc(spore.x, spore.y, spore.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(134, 239, 172, ${Math.max(0, spore.alpha)})`;
        ctx.shadowColor = "rgba(74, 222, 128, 0.6)";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [isEnabled, speed, sporeCount]);

  if (!isEnabled) {
    return (
      <div
        className={`absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.15)_0%,_transparent_75%)] ${className}`}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none will-change-transform ${className}`}
      style={{ filter: "blur(20px)" }}
    />
  );
}

