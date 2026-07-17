"use client";

import { useEffect, useRef, useState } from "react";
import type Lenis from "lenis";
import { gsap } from "@/lib/gsap";
import s from "./Loader.module.css";

/**
 * Abertura de filme: cartela em breu com a marca e uma linha que
 * preenche. Sobe a cortina quando o vídeo avisa av:ready (fallback 4s)
 * e um tempo mínimo de cartela passou; dispara av:intro-done.
 */
export default function Loader() {
  const [gone, setGone] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLSpanElement>(null);
  const skipRef = useRef(false);
  const skipHandlerRef = useRef<() => void>(() => {});

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ready = false;
    let minDone = false;
    let finished = false;

    const tryFinish = () => {
      if (finished || !ready || !minDone) return;
      finished = true;
      const skip = skipRef.current;
      gsap.to(overlay.current, {
        yPercent: -100,
        duration: skip || reduced ? 0.01 : 1.0,
        ease: "power4.inOut",
        onComplete: () => {
          window.dispatchEvent(new CustomEvent("av:intro-done"));
          setGone(true);
          if (skip) {
            const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
            const target = document.querySelector("#obras");
            if (lenis && target) lenis.scrollTo(target as HTMLElement, { duration: 1.4 });
            else target?.scrollIntoView();
          }
        },
      });
    };

    const onReady = () => {
      ready = true;
      tryFinish();
    };
    window.addEventListener("av:ready", onReady);
    const fallback = window.setTimeout(onReady, 4000);

    // "pular pro arquivo": força os dois gates e resolve na hora —
    // quem já viu o filme não devia ser obrigado a assistir de novo
    const onSkip = () => {
      skipRef.current = true;
      ready = true;
      minDone = true;
      tryFinish();
    };
    skipHandlerRef.current = onSkip;

    const minWait = reduced ? 0 : 1.9;
    const lineTween = reduced
      ? null
      : gsap.fromTo(
          line.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1.7, ease: "power2.inOut" }
        );
    const minTimer = window.setTimeout(() => {
      minDone = true;
      tryFinish();
    }, minWait * 1000);

    return () => {
      window.removeEventListener("av:ready", onReady);
      window.clearTimeout(fallback);
      window.clearTimeout(minTimer);
      lineTween?.kill();
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={overlay} className={s.overlay}>
      <p className={s.brand}>Atelier Vertex</p>
      <p className={s.obra}>Obra 041</p>
      <span className={s.track}>
        <span ref={line} className={s.line} />
      </span>
      <p className={s.hint}>registro de obra · 132 dias</p>
      <button
        type="button"
        className={s.skip}
        onClick={() => skipHandlerRef.current()}
      >
        pular pro arquivo →
      </button>
    </div>
  );
}
