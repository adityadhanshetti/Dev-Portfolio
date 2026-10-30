import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion, useCalmMode } from "@/lib/hooks";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
}

interface ClickSparkProps {
  children: ReactNode;
}

export function ClickSpark({ children }: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);
  const reducedMotion = useReducedMotion();
  const [calm] = useCalmMode();

  const isEnabled = !reducedMotion && !calm;

  useEffect(() => {
    if (!isEnabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const onClick = (e: MouseEvent) => {
      // Spawn 10 sparks at click position
      for (let i = 0; i < 12; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 3.5;
        sparksRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          size: 2 + Math.random() * 2,
        });
      }
    };
    window.addEventListener("click", onClick);

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = sparksRef.current.length - 1; i >= 0; i--) {
        const s = sparksRef.current[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.035;

        if (s.alpha <= 0) {
          sparksRef.current.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(182, 255, 74, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("click", onClick);
    };
  }, [isEnabled]);

  return (
    <div className="relative">
      {isEnabled && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-[9990]"
        />
      )}
      {children}
    </div>
  );
}

