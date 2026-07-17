import Reveal from "@/components/ui/Reveal/Reveal";
import MonoLabel from "@/components/ui/MonoLabel/MonoLabel";
import s from "./Cta.module.css";

export default function Cta() {
  return (
    <section id="contato" className={s.cta}>
      <Reveal>
        <p className={s.eyebrow}>
          <MonoLabel tone="ceu">obra 042 · em aberto</MonoLabel>
        </p>
        <h2 className={s.title}>
          O próximo número
          <br />é o seu.
        </h2>
        <p className={s.copy}>
          Envie o terreno, o programa e o prazo. Em duas semanas devolvemos
          estudo de viabilidade, cronograma e orçamento executivo.
        </p>
        <div className={s.actions}>
          <a className={s.btn} href="mailto:projetos@ateliervertex.com.br">
            projetos@ateliervertex.com.br
          </a>
          <a className={`${s.btn} ${s.ghost}`} href="#obras">
            Rever o arquivo
          </a>
        </div>
      </Reveal>
    </section>
  );
}
