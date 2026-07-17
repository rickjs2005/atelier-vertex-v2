"use client";

import { useEffect, useState } from "react";
import s from "./Nav.module.css";

const LINKS = [
  ["A obra", "#film"],
  ["Arquivo", "#obras"],
  ["Estúdio", "#estudio"],
  ["Contato", "#contato"],
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  // trava o scroll de fundo com o painel mobile aberto
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header className={`${s.nav} ${open ? s.navOpen : ""}`}>
        <a href="#" className={s.logo} onClick={() => setOpen(false)}>
          Atelier Vertex
        </a>

        <nav className={s.links} aria-label="Navegação principal">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={s.burger}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </header>

      {/* fora do <header>: o backdrop-filter do nav vira containing
          block pra position:fixed e encolhe "tela cheia" pra altura
          do próprio nav — painel precisa ser irmão, não filho */}
      <div className={`${s.panel} ${open ? s.panelOpen : ""}`} aria-hidden={!open}>
        <nav className={s.panelLinks} aria-label="Navegação (mobile)">
          {LINKS.map(([label, href], i) => (
            <a
              key={href}
              href={href}
              style={{ transitionDelay: `${i * 0.05}s` }}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
