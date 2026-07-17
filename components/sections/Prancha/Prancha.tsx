"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import MonoLabel from "@/components/ui/MonoLabel/MonoLabel";
import s from "./Prancha.module.css";

/**
 * A prancha 041: sobre o vídeo escurecido (mesa de luz), a planta do
 * pavimento tipo se desenha amarrada ao scroll — paredes, mobiliário,
 * linhas de cota e rótulos. O desenho vem antes da obra.
 * Geometria herdada da planta do loader do v1 (planta 400×300).
 */

const PAREDES = [
  "M 40 40 H 226 M 250 40 H 360",
  "M 360 40 V 240",
  "M 360 240 H 40",
  "M 40 240 V 40",
  "M 40 130 H 118 M 142 130 H 210",
  "M 210 40 V 96 M 210 120 V 130",
  "M 250 130 H 360",
  "M 288 130 V 186 M 288 210 V 240",
  "M 250 40 V 78 M 250 102 V 130",
  "M 118 186 H 176",
];

const DETALHES = [
  "M 226 40 A 24 24 0 0 1 250 64",
  "M 118 130 A 24 24 0 0 0 142 154",
  "M 250 78 A 24 24 0 0 1 226 102",
  "M 262 156 H 344 V 226 H 262 Z",
  "M 60 60 H 130 V 92 H 60 Z",
  "M 300 58 H 344 V 106 H 300 Z",
  "M 64 150 H 100 V 216 H 64 Z",
];

// linhas de cota: medida + tiques nas pontas, como em prancha
const COTAS = [
  "M 40 22 H 360",
  "M 40 17 V 27 M 360 17 V 27",
  "M 22 40 V 240",
  "M 17 40 H 27 M 17 240 H 27",
];

const LABELS: { x: number; y: number; text: string }[] = [
  { x: 125, y: 92, text: "estar · jantar" },
  { x: 305, y: 88, text: "cozinha" },
  { x: 82, y: 186, text: "suíte 01" },
  { x: 218, y: 200, text: "suíte 02" },
  { x: 303, y: 194, text: "varanda" },
];

export default function Prancha() {
  const root = useRef<HTMLElement>(null);
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = root.current;
    const g = svg.current;
    if (!el || !g) return;

    const paredes = g.querySelectorAll<SVGElement>("[data-parede]");
    const detalhes = g.querySelectorAll<SVGElement>("[data-detalhe]");
    const cotas = g.querySelectorAll<SVGElement>("[data-cota]");
    const labels = g.querySelectorAll<SVGElement>("[data-label]");
    const medidas = g.querySelectorAll<SVGElement>("[data-medida]");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([paredes, detalhes, cotas], { strokeDashoffset: 0 });
      gsap.set([labels, medidas], { opacity: 1 });
      return;
    }

    const tl = gsap
      .timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
        },
      })
      // 1) a linha desenha as paredes
      .to(paredes, { strokeDashoffset: 0, duration: 3, stagger: 0.22 }, 0)
      // 2) portas, mobiliário, varanda
      .to(detalhes, { strokeDashoffset: 0, duration: 1.6, stagger: 0.14 }, 2.4)
      // 3) as cotas medem o desenho
      .to(cotas, { strokeDashoffset: 0, duration: 1.1, stagger: 0.25 }, 3.8)
      .to(medidas, { opacity: 1, duration: 0.6 }, 4.4)
      // 4) os ambientes ganham nome
      .to(labels, { opacity: 1, duration: 0.7, stagger: 0.16, ease: "power2.out" }, 4.6)
      .to({ p: 0 }, { p: 1, duration: 0.6 }, 5.4);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={root} data-scene="prancha" className={s.prancha}>
      <div className={s.sticky}>
        <header className={s.header}>
          <MonoLabel tone="ceu">prancha 041 · pavimento tipo</MonoLabel>
        </header>

        <svg
          ref={svg}
          viewBox="0 0 400 300"
          className={s.plan}
          fill="none"
          strokeLinecap="round"
          aria-label="Planta baixa do pavimento tipo da obra 041"
          role="img"
        >
          {PAREDES.map((d, i) => (
            <path
              key={`p${i}`}
              data-parede
              d={d}
              stroke="var(--color-cal)"
              strokeWidth="2"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
            />
          ))}

          {DETALHES.map((d, i) => (
            <path
              key={`d${i}`}
              data-detalhe
              d={d}
              stroke={i === 3 ? "var(--color-ceu)" : "rgba(184,178,167,0.45)"}
              strokeWidth={i === 3 ? 1.4 : 1}
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
            />
          ))}

          {COTAS.map((d, i) => (
            <path
              key={`c${i}`}
              data-cota
              d={d}
              stroke="var(--color-ceu)"
              strokeWidth="0.9"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
            />
          ))}

          <text data-medida x="200" y="13" textAnchor="middle" className={s.medida}>
            18,40 m
          </text>
          <text
            data-medida
            x="10"
            y="140"
            textAnchor="middle"
            className={s.medida}
            transform="rotate(-90 10 140)"
          >
            11,50 m
          </text>

          {LABELS.map((l) => (
            <text
              key={l.text}
              data-label
              x={l.x}
              y={l.y}
              textAnchor="middle"
              className={s.label}
            >
              {l.text}
            </text>
          ))}

          {/* carimbo da prancha */}
          <text data-label x="360" y="262" textAnchor="end" className={s.carimbo}>
            atelier vertex · esc 1:75 · rev 03
          </text>
        </svg>
      </div>
    </section>
  );
}
