import Image from "next/image";
import Reveal from "@/components/ui/Reveal/Reveal";
import MonoLabel from "@/components/ui/MonoLabel/MonoLabel";
import { OBRAS } from "@/lib/obras";
import s from "./Obras.module.css";

/**
 * Portfólio editorial: grade assimétrica em breu sólido — o filme
 * acabou, agora o arquivo do escritório. Cada obra com sua ficha
 * técnica em mono, como prancha de registro.
 */
export default function Obras() {
  return (
    <section id="obras" className={s.obras}>
      <header className={s.header}>
        <Reveal>
          <p className={s.eyebrow}>
            <MonoLabel tone="ceu">arquivo · obras entregues</MonoLabel>
          </p>
          <h2 className={s.title}>
            Antes da 041,
            <br />
            outras quarenta.
          </h2>
        </Reveal>
      </header>

      <div className={s.grid}>
        {OBRAS.map((o, i) => (
          <Reveal key={o.n} className={s.item} delay={(i % 2) * 0.08}>
            <figure className={s.figure}>
              <div className={s.frame}>
                <Image
                  src={o.cover}
                  alt={`${o.title} — ${o.loc}`}
                  fill
                  sizes="(max-width: 767px) 100vw, 46vw"
                  className={s.img}
                />
              </div>
              <figcaption className={s.caption}>
                <span className={s.captionLeft}>
                  <MonoLabel tone="ceu">{o.n}</MonoLabel>
                  <span className={s.name}>{o.title}</span>
                </span>
                <span className={s.captionRight}>
                  <MonoLabel>
                    {o.loc} · {o.year}
                  </MonoLabel>
                  <MonoLabel>
                    {o.area} · {o.sistema}
                  </MonoLabel>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
