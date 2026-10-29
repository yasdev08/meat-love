"use client";

import { useEffect, useRef } from "react";

/**
 * Braises qui s'élèvent lentement (canvas léger). Désactivé si l'utilisateur
 * préfère réduire les animations, et mis en pause hors écran.
 */
export function EmberField({ density = 46, className }: { density?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Ember = { x: number; y: number; r: number; vy: number; vx: number; life: number; max: number; hue: number };
    const embers: Ember[] = [];
    const spawn = (initial = false): Ember => ({
      x: Math.random() * width,
      y: initial ? Math.random() * height : height + 10,
      r: Math.random() * 1.6 + 0.5,
      vy: Math.random() * 0.55 + 0.25,
      vx: (Math.random() - 0.5) * 0.25,
      life: 0,
      max: Math.random() * 420 + 260,
      hue: Math.random() * 22 + 14,
    });

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const count = Math.round(density * Math.min(1, width / 1200) + 12);
    for (let i = 0; i < count; i++) embers.push(spawn(true));

    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (!visible) return;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.life++;
        e.y -= e.vy;
        e.x += e.vx + Math.sin((e.life + i * 40) / 60) * 0.18;
        const t = e.life / e.max;
        const alpha = Math.sin(Math.PI * Math.min(1, t)) * 0.9;
        if (t >= 1 || e.y < -10) {
          embers[i] = spawn();
          continue;
        }
        const g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 4);
        g.addColorStop(0, `hsla(${e.hue + 20}, 100%, 75%, ${alpha})`);
        g.addColorStop(0.4, `hsla(${e.hue}, 95%, 55%, ${alpha * 0.5})`);
        g.addColorStop(1, `hsla(${e.hue}, 90%, 45%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    tick();

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(canvas);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
