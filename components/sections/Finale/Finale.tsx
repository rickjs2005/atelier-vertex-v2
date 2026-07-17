import Reveal from "@/components/ui/Reveal/Reveal";
import MonoLabel from "@/components/ui/MonoLabel/MonoLabel";
import s from "./Finale.module.css";

export default function Finale() {
  return (
    <section id="entrega" data-scene="finale" className={s.finale}>
      <div className={s.sticky}>
        <div className={s.scrim} />
        <div className={s.inner}>
          <Reveal>
            <p className={s.eyebrow}>
              <MonoLabel tone="ceu">dia 132 · entrega</MonoLabel>
            </p>
            <h2 className={s.title}>Entregue.</h2>
            <p className={s.copy}>
              Do andaime à fachada sem um dia de atraso. O próximo registro de
              obra pode ser o seu.
            </p>
            <div className={s.actions}>
              <a className={s.btn} href="#contato">
                Solicitar um projeto
              </a>
              <a className={`${s.btn} ${s.ghost}`} href="#obras">
                Ver outras obras
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
