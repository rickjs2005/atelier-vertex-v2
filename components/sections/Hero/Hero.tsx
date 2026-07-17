"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import MonoLabel from "@/components/ui/MonoLabel/MonoLabel";
import s from "./Hero.module.css";

/**
 * Cena de abertura: o vídeo fullscreen atrás segura o frame inicial
 * (obra crua); o título entra quando o loader sobe a cortina.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !title.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const split = new SplitText(title.current, { type: "lines", mask: "lines" });
    const rest = el.querySelectorAll<HTMLElement>("[data-fade]");
    gsap.set(rest, { opacity: 0, y: 14 });

    let played = false;
    let tl: gsap.core.Timeline | undefined;
    const play = () => {
      if (played) return;
      played = true;
      tl = gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(split.lines, { yPercent: 115, duration: 1.15, stagger: 0.1, delay: 0.15 })
        .to(rest, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, "-=0.6");
    };
    window.addEventListener("av:intro-done", play);
    const fallback = window.setTimeout(play, 4500);

    // o cartão de abertura se dissolve enquanto a obra começa a andar
    const exit = gsap.to(content.current, {
      opacity: 0,
      y: -70,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "72% bottom",
        scrub: true,
      },
    });

    return () => {
      window.removeEventListener("av:intro-done", play);
      window.clearTimeout(fallback);
      exit.scrollTrigger?.kill();
      exit.kill();
      tl?.kill();
      split.revert();
    };
  }, []);

  return (
    <section ref={root} data-scene="hero" className={s.hero}>
      <div className={s.sticky}>
        <div className={s.scrim} />
        <div ref={content} className={s.content}>
          <h1 ref={title} className={s.title}>
            Do andaime
            <br />à fachada.
          </h1>
          <div className={s.meta} data-fade>
            <MonoLabel tone="cal">obra 041 · residencial vertente</MonoLabel>
            <MonoLabel tone="cal">concreto armado · 1.240 m² · 4 pavimentos</MonoLabel>
          </div>
          <p className={s.hint} data-fade>
            <MonoLabel tone="ceu">↓ role para construir</MonoLabel>
          </p>
        </div>
      </div>
    </section>
  );
}
