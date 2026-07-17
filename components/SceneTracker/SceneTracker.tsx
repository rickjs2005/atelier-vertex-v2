"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { world, type SceneName } from "@/lib/world";

/**
 * Um ScrollTrigger por [data-scene] escreve (cena, t local) no world.
 * O VideoRig lê a cada frame — zero re-render de React no scroll.
 * Também espelha a cena ativa em <html data-scene> pro CSS reagir
 * (letterbox nas cenas de filme, dimming do vídeo nos números).
 * end "bottom top": handoff entre cenas sem zona morta.
 */
export default function SceneTracker() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scene]")
    );

    const triggers = sections.map((el) => {
      const name = el.dataset.scene as SceneName;
      return ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          world.scene = name;
          world.t = self.progress;
          if (document.documentElement.dataset.scene !== name)
            document.documentElement.dataset.scene = name;
        },
      });
    });

    if (sections.length) {
      document.documentElement.dataset.scene = sections[0].dataset.scene!;
    }

    return () => {
      triggers.forEach((t) => t.kill());
      delete document.documentElement.dataset.scene;
    };
  }, []);

  return (
    <>
      <div id="letterbox-top" aria-hidden />
      <div id="letterbox-bottom" aria-hidden />
    </>
  );
}
