"use client";

import { useEffect, useRef } from "react";
import { world } from "@/lib/world";
import { SCENES } from "@/lib/scenes";
import s from "./VideoRig.module.css";

/**
 * O ativo do filme: vídeo fullscreen FIXO atrás de toda a página.
 * Um rAF lê (scene, t) do world e persegue o tempo-alvo com damping —
 * o prédio se constrói e desconstrói conforme o scroll atravessa as
 * cenas. Requer vídeo GOP 1 (todo frame keyframe, ver README).
 */
export default function VideoRig() {
  const video = useRef<HTMLVideoElement>(null);
  const day = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.pause();

    const ready = () => window.dispatchEvent(new CustomEvent("av:ready"));
    if (v.readyState >= 3) ready();
    else v.addEventListener("canplay", ready, { once: true });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => v.removeEventListener("canplay", ready);
    }

    let current = 0;
    let rafId = 0;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const dur = v.duration;
      if (!dur || v.readyState < 2) return;
      const sc = SCENES[world.scene];
      const target = sc.v0 + (sc.v1 - sc.v0) * world.t;
      const next = current + (target - current) * 0.1;
      if (Math.abs(next - current) > 0.0004) {
        current = next;
        // -0.05s: seek exatamente em duration congela no último frame
        v.currentTime = current * (dur - 0.05);
      }
      if (day.current) {
        const txt = `dia ${String(1 + Math.round(current * 131)).padStart(3, "0")} / 132`;
        if (day.current.textContent !== txt) day.current.textContent = txt;
      }
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      v.removeEventListener("canplay", ready);
    };
  }, []);

  return (
    <div id="video-rig" className={s.rig} aria-hidden>
      <video
        ref={video}
        className={s.video}
        muted
        playsInline
        preload="auto"
        poster="/video/poster.jpg"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>
      {/* timecode da obra — vive sobre a tarja do letterbox */}
      <span ref={day} className={s.day}>
        dia 001 / 132
      </span>
    </div>
  );
}
