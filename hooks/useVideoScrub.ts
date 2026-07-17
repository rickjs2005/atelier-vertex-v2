"use client";

import { type RefObject, useEffect } from "react";

/**
 * Seguidor de progresso: persegue `progress.current` (0–1) com lerp num
 * rAF e escreve o currentTime do vídeo. Quem dita o progresso é o
 * ScrollTrigger do Hero — aqui só se esconde o custo do seek com passos
 * curtos e constantes. Requer vídeo GOP 1 (todo frame keyframe), ver README.
 */
export function useVideoScrub(
  video: RefObject<HTMLVideoElement | null>,
  progress: RefObject<number>
) {
  useEffect(() => {
    const v = video.current;
    if (!v) return;

    // mobile e reduced-motion: sem scrub — vídeo comum
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    if (reduced || mobile) return;

    v.pause();
    let current = 0;
    let rafId = 0;

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const dur = v.duration;
      if (!dur || v.readyState < 2) return;
      const next = current + (progress.current - current) * 0.16;
      if (Math.abs(next - current) < 0.0004) return;
      current = next;
      // -0.05s: seek exatamente em duration congela no último frame decodificado
      v.currentTime = current * (dur - 0.05);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [video, progress]);
}
