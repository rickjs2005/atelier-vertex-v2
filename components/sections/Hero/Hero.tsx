"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
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

// narrativa do scrub — cada palavra amarrada a um trecho do vídeo
const ETAPAS: { word: string; meta: string }[] = [
  { word: "Conceito.", meta: "dia 001 · prancha 041" },
  { word: "Precisão.", meta: "dia 027 · fundação" },
  { word: "Estrutura.", meta: "dia 063 · concreto armado" },
  { word: "Arquitetura.", meta: "dia 104 · fachada" },
  { word: "Transformação.", meta: "dia 132 · entrega" },
];

// posição de entrada de cada etapa na timeline virtual (0–10 = 0–100% do pin)
const ENTRADA = [1.4, 3.2, 5.0, 6.8, 8.4];

const NAV = [
  ["Memorial", "#memorial"],
  ["Materiais", "#materiais"],
  ["Contato", "#contato"],
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLElement>(null);
  const dia = useRef<HTMLSpanElement>(null);
  const progress = useRef(0);
  const [broken, setBroken] = useState(false);
  const [mobile, setMobile] = useState(false);

  // o vídeo persegue progress.current — o scroll é o botão de play
  useVideoScrub(video, progress);

  useEffect(() => {
    setMobile(window.matchMedia("(max-width: 767px)").matches);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el || !title.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (reduced) return;

    // ---- entrada, uma vez no load ----
    const titleSplit = new SplitText(title.current, { type: "lines", mask: "lines" });
    const rest = el.querySelectorAll<HTMLElement>("[data-fade]");
    const entry = gsap
      .timeline({ defaults: { ease: "power4.out" } })
      .from(titleSplit.lines, { yPercent: 115, duration: 1.1, stagger: 0.09, delay: 0.2 })
      .from(rest, { opacity: 0, y: 12, duration: 0.7, stagger: 0.06 }, "-=0.55");

    if (isMobile) {
      return () => {
        entry.kill();
        titleSplit.revert();
      };
    }

    // ---- narrativa do scrub: uma timeline, um ScrollTrigger, um pin ----
    const etapas = gsap.utils.toArray<HTMLElement>("[data-etapa]", el);
    const wordSplits = etapas.map(
      (e) => new SplitText(e.querySelector("[data-word]"), { type: "chars", mask: "chars" })
    );

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // o texto de abertura se dissolve enquanto a obra começa
    tl.to(hint.current, { autoAlpha: 0, duration: 0.4 }, 0)
      .to(
        intro.current,
        { autoAlpha: 0, y: -36, filter: "blur(6px)", duration: 1.1, ease: "power2.inOut" },
        0.1
      )
      .to(dia.current, { autoAlpha: 1, duration: 0.5 }, 0.6);

    // cada palavra entra com text reveal, segura, e sai antes da próxima
    etapas.forEach((etapa, i) => {
      const at = ENTRADA[i];
      const meta = etapa.querySelector("[data-meta]");
      tl.set(etapa, { autoAlpha: 1 }, at)
        .from(
          wordSplits[i].chars,
          { yPercent: 120, duration: 0.55, stagger: 0.028, ease: "power4.out" },
          at
        )
        .from(meta, { autoAlpha: 0, y: 10, duration: 0.4 }, at + 0.25);
      if (i < etapas.length - 1) {
        tl.to(etapa, { autoAlpha: 0, y: -26, duration: 0.45, ease: "power2.in" }, at + 1.35);
      }
    });

    // preenche até 10: a última palavra assenta antes do vídeo chegar a 100%
    tl.to({ p: 0 }, { p: 1, duration: 0.01 }, 9.99);

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "+=350%",
      pin: true,
      anticipatePin: 1,
      scrub: 0.6,
      animation: tl,
      onUpdate: (self) => {
        progress.current = self.progress;
        if (dia.current) {
          const d = 1 + Math.round(self.progress * 131);
          dia.current.textContent = `dia ${String(d).padStart(3, "0")} / 132`;
        }
      },
    });

    return () => {
      st.kill();
      tl.kill();
      entry.kill();
      wordSplits.forEach((sp) => sp.revert());
      titleSplit.revert();
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
          <div ref={intro}>
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

          {/* narrativa que o scroll esculpe — decorativa pro leitor de tela */}
          <div className={s.etapas} aria-hidden>
            {ETAPAS.map((e) => (
              <div key={e.word} className={s.etapa} data-etapa>
                <p className={s.etapaWord} data-word>
                  {e.word}
                </p>
                <span className={s.etapaMeta} data-meta>
                  <MonoLabel tone="ceu">{e.meta}</MonoLabel>
                </span>
              </div>
            ))}
          </div>
        </div>

        <figure className={s.videoBox} data-fade>
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
          <figcaption className={s.caption}>
            <em ref={hint} className={s.hint}>
              <MonoLabel tone="ceu">↓ role para construir</MonoLabel>
            </em>
            <span ref={dia} className={s.dia}>
              dia 001 / 132
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
