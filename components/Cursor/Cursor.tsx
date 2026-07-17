"use client";

import { useEffect, useRef } from "react";
import s from "./Cursor.module.css";

/**
 * Cursor customizado: ponto azul-céu + anel que amortece atrás dele e
 * cresce sobre alvos interativos. Só ponteiros finos — em touch os
 * elementos nascem com opacity 0 e nunca são revelados.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.classList.add("av-cursor");
    if (dot.current) dot.current.style.opacity = "1";
    if (ring.current) ring.current.style.opacity = "1";

    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let scale = 1;
    let targetScale = 1;
    let raf = 0;
    let last = performance.now();

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
    };

    const onOver = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest("a, button, [data-cursor]");
      targetScale = t ? 2.4 : 1;
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      const k = 1 - Math.exp(-14 * dt);
      ringPos.x += (pos.x - ringPos.x) * k;
      ringPos.y += (pos.y - ringPos.y) * k;
      scale += (targetScale - scale) * k;

      if (dot.current)
        dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      if (ring.current)
        ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    return () => {
      document.documentElement.classList.remove("av-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dot} className={s.dot} aria-hidden />
      <div ref={ring} className={s.ring} aria-hidden />
    </>
  );
}
