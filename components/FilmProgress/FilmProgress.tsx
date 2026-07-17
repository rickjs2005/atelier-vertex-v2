"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import s from "./FilmProgress.module.css";

/**
 * Trilho vertical fino: quanto do FILME (não da obra) já passou —
 * orientação de scroll, distinto da linha de cota (que mede o vídeo).
 * Mede do topo do Hero até o início do Ato 2 ("after").
 */
export default function FilmProgress() {
  const fill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = document.querySelector<HTMLElement>('[data-scene="hero"]');
    const end = document.querySelector<HTMLElement>('[data-scene="after"]');
    if (!start || !end) return;

    const st = ScrollTrigger.create({
      trigger: start,
      start: "top top",
      endTrigger: end,
      end: "top top",
      onUpdate: (self) => {
        if (fill.current) fill.current.style.transform = `scaleY(${self.progress})`;
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div id="film-progress" className={s.rail} aria-hidden>
      <span ref={fill} className={s.fill} />
    </div>
  );
}
