"use client";

import { type RefObject, useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

type Options = {
  /** distância de scroll do pin (default 250% da viewport) */
  end?: string;
  /** progresso 0–1 a cada update — a linha de cota escuta por aqui */
  onProgress?: (p: number) => void;
};

/**
 * Amarra o currentTime do vídeo ao progresso de um ScrollTrigger pinado.
 * O seek nunca é feito direto no onUpdate: um rAF com lerp persegue o
 * alvo — seeks curtos e constantes escondem o custo de decodificação.
 * Requer vídeo com GOP 1 (todo frame keyframe), ver README.
 */
export function useVideoScrub(
  video: RefObject<HTMLVideoElement | null>,
  trigger: RefObject<HTMLElement | null>,
  { end = "+=250%", onProgress }: Options = {}
) {
  useEffect(() => {
    const v = video.current;
    const el = trigger.current;
    if (!v || !el) return;

    // mobile e reduced-motion: sem pin, sem scrub — vídeo comum
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    if (reduced || mobile) return;

    v.pause();
    let target = 0;
    let current = 0;
    let rafId = 0;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        target = self.progress;
        onProgress?.(self.progress);
      },
    });

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const dur = v.duration;
      if (!dur || v.readyState < 2) return;
      const next = current + (target - current) * 0.16;
      if (Math.abs(next - current) < 0.0004) return;
      current = next;
      // -0.05s: seek exatamente em duration congela no último frame decodificado
      v.currentTime = current * (dur - 0.05);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      st.kill();
    };
  }, [video, trigger, end, onProgress]);
}
