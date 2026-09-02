"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface LivingMarbleProps {
  /** Normalized -0.5..0.5 pointer position relative to the container, e.g. Hero's mouseX/mouseY. */
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  className?: string;
}

interface Vein {
  from: [number, number];
  to: [number, number];
  bow: number;
  alpha: number;
  pulseSpeed: number;
  pulseOffset: number;
}

// Same base color and vein tone as .marble-surface in globals.css (--marble-50 /
// --stone-500) — this canvas is that treatment brought to life, not a new palette.
const BASE = "rgb(253, 252, 250)";
const SHADOW = "131, 124, 109";
const HIGHLIGHT = "227, 211, 174";

function makeVeins(): Vein[] {
  // Same three diagonals as .marble-surface's linear-gradients (128deg / 96deg /
  // 150deg), expressed as normalized start/end points with a slight organic bow.
  return [
    { from: [0.42, 0], to: [0.2, 1], bow: 0.04, alpha: 0.05, pulseSpeed: 0.00018, pulseOffset: 0 },
    { from: [0.62, 0], to: [0.44, 1], bow: -0.03, alpha: 0.04, pulseSpeed: 0.00014, pulseOffset: 2.1 },
    { from: [0.24, 0.05], to: [0.7, 0.95], bow: 0.05, alpha: 0.035, pulseSpeed: 0.00021, pulseOffset: 4.2 },
  ];
}

/**
 * A procedural, cursor-reactive stand-in for the static .marble-surface texture —
 * a soft light drifts and follows the pointer as if catching polished stone.
 * Falls back to a single static frame under prefers-reduced-motion or when
 * canvas/observers aren't available, so the experience without it is unchanged.
 */
export function LivingMarble({ mouseX, mouseY, className }: LivingMarbleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const veinsRef = useRef<Vein[]>(makeVeins());

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;

    function resize() {
      const rect = container!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    let paused = document.hidden;
    function onVisibility() {
      paused = document.hidden;
    }
    document.addEventListener("visibilitychange", onVisibility);

    function drawVeins(t: number) {
      for (const v of veinsRef.current) {
        const alpha = v.alpha * (0.75 + 0.25 * Math.sin(t * v.pulseSpeed + v.pulseOffset));
        ctx!.strokeStyle = `rgba(${SHADOW}, ${alpha})`;
        ctx!.lineWidth = Math.max(1, width * 0.0022);
        const [x1, y1] = v.from;
        const [x2, y2] = v.to;
        const mx = (x1 + x2) / 2 + v.bow;
        const my = (y1 + y2) / 2;
        ctx!.beginPath();
        ctx!.moveTo(x1 * width, y1 * height);
        ctx!.quadraticCurveTo(mx * width, my * height, x2 * width, y2 * height);
        ctx!.stroke();
      }
    }

    function drawGlow(nx: number, ny: number, radiusFactor: number) {
      const cx = nx * width;
      const cy = ny * height;
      const r = Math.max(width, height) * radiusFactor;
      const gradient = ctx!.createRadialGradient(cx, cy, 0, cx, cy, r);
      gradient.addColorStop(0, `rgba(${HIGHLIGHT}, 0.16)`);
      gradient.addColorStop(0.5, `rgba(${HIGHLIGHT}, 0.06)`);
      gradient.addColorStop(1, `rgba(${HIGHLIGHT}, 0)`);
      ctx!.save();
      ctx!.globalCompositeOperation = "soft-light";
      ctx!.fillStyle = gradient;
      ctx!.beginPath();
      ctx!.arc(cx, cy, r, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();
    }

    if (reduceMotion) {
      ctx.fillStyle = BASE;
      ctx.fillRect(0, 0, width, height);
      drawVeins(0);
      drawGlow(0.5, 0.35, 0.32);
      return () => {
        resizeObserver.disconnect();
        io.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
      };
    }

    const light = { x: 0.5, y: 0.35 };
    const start = performance.now();
    let raf = 0;

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      if (paused || !visible) return;
      const t = now - start;

      const hasPointer = mouseX.get() !== 0 || mouseY.get() !== 0;
      // Idle drift keeps the surface feeling alive with no cursor (touch, or before first move).
      const driftX = 0.5 + Math.sin(t * 0.00011) * 0.14;
      const driftY = 0.4 + Math.cos(t * 0.00015) * 0.1;
      const goalX = hasPointer ? 0.5 + mouseX.get() : driftX;
      const goalY = hasPointer ? 0.4 + mouseY.get() * 0.6 : driftY;

      // Slow, heavy easing — this is light moving across stone, not a snappy UI element.
      light.x += (goalX - light.x) * 0.035;
      light.y += (goalY - light.y) * 0.035;

      ctx!.clearRect(0, 0, width, height);
      ctx!.fillStyle = BASE;
      ctx!.fillRect(0, 0, width, height);
      drawVeins(t);
      drawGlow(light.x, light.y, 0.42);
    }

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [mouseX, mouseY]);

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden />
    </div>
  );
}
