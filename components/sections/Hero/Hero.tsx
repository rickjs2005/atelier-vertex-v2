"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { useVideoScrub } from "@/hooks/useVideoScrub";
import MonoLabel from "@/components/ui/MonoLabel/MonoLabel";
import s from "./Hero.module.css";

const DADOS: [string, string][] = [
  ["obra", "Residencial Vertente · nº 041"],
  ["sistema", "concreto armado · laje nervurada"],
  ["fachada", "painel cimentício ventilado"],
  ["área", "1.240 m² · 4 pavimentos"],
  ["prazo", "132 dias · entrega fev 2026"],
];

const NAV = [
  ["Memorial", "#memorial"],
  ["Materiais", "#materiais"],
  ["Contato", "#contato"],
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const [broken, setBroken] = useState(false);
  const [mobile, setMobile] = useState(false);

  // o scroll é o botão de play
  useVideoScrub(video, root);

  useEffect(() => {
    setMobile(window.matchMedia("(max-width: 767px)").matches);
  }, []);

  // entrada do texto — uma vez, no load
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current;
    if (!el || !title.current) return;

    const split = new SplitText(title.current, { type: "lines", mask: "lines" });
    const rest = el.querySelectorAll<HTMLElement>("[data-fade]");

    const tl = gsap
      .timeline({ defaults: { ease: "power4.out" } })
      .from(split.lines, { yPercent: 115, duration: 1.1, stagger: 0.09, delay: 0.2 })
      .from(rest, { opacity: 0, y: 12, duration: 0.7, stagger: 0.06 }, "-=0.55");

    return () => {
      tl.kill();
      split.revert();
    };
  }, []);

  return (
    <section ref={root} className={s.hero}>
      <header className={s.nav}>
        <a href="#" className={s.logo}>
          Atelier Vertex
        </a>
        <nav className={s.links} aria-label="Navegação principal">
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
      </header>

      <div className={s.grid}>
        <div className={s.copy}>
          <h1 ref={title} className={s.title}>
            Do andaime
            <br />à fachada.
            <br />
            <span className={s.titleDias}>132 dias.</span>
          </h1>

          <dl className={s.dados} data-fade>
            {DADOS.map(([dt, dd]) => (
              <div key={dt} className={s.row}>
                <dt>
                  <MonoLabel>{dt}</MonoLabel>
                </dt>
                <dd>
                  <MonoLabel tone="cal">{dd}</MonoLabel>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className={s.stage} data-fade>
          {broken ? (
            <div className={s.fallback} role="img" aria-label="Obra do edifício">
              <MonoLabel>obra 041 · registro indisponível</MonoLabel>
            </div>
          ) : (
            <video
              ref={video}
              className={s.video}
              muted
              playsInline
              preload="auto"
              controls={mobile}
              poster="/video/poster.jpg"
              onError={() => setBroken(true)}
              aria-label="Time-lapse da obra: da estrutura crua à fachada pronta"
            >
              <source src="/video/hero.mp4" type="video/mp4" />
            </video>
          )}
          <figcaption className={s.hint}>
            <MonoLabel tone="ceu">↓ role para construir</MonoLabel>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
