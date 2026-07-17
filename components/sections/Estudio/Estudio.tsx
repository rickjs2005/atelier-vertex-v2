import Reveal from "@/components/ui/Reveal/Reveal";
import MonoLabel from "@/components/ui/MonoLabel/MonoLabel";
import s from "./Estudio.module.css";

const FATOS: [string, string][] = [
  ["fundação", "2016 · São Paulo"],
  ["obras entregues", "41 · três países"],
  ["equipe", "12 · arquitetura e engenharia"],
  ["atrasos", "0 · em 41 entregas"],
];

export default function Estudio() {
  return (
    <section id="estudio" className={s.estudio}>
      <div className={s.inner}>
        <Reveal>
          <p className={s.eyebrow}>
            <MonoLabel tone="ceu">o estúdio</MonoLabel>
          </p>
          <h2 className={s.title}>
            Quem desenha,
            <br />
            constrói.
          </h2>
        </Reveal>

        <div className={s.right}>
          <Reveal delay={0.1}>
            <p className={s.copy}>
              O Atelier Vertex projeta e executa com a mesma equipe. A prancha
              que sai do estúdio é a mesma que vai pro canteiro — sem tradução,
              sem terceiros, sem surpresa de obra. Cada projeto tem um número,
              um cronograma e um diário público de execução.
            </p>
          </Reveal>

          <dl className={s.fatos}>
            {FATOS.map(([dt, dd], i) => (
              <Reveal key={dt} delay={0.15 + i * 0.06}>
                <div className={s.fato}>
                  <dt>
                    <MonoLabel>{dt}</MonoLabel>
                  </dt>
                  <dd>
                    <MonoLabel tone="cal">{dd}</MonoLabel>
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
