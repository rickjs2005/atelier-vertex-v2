import Reveal from "@/components/ui/Reveal/Reveal";
import MonoLabel from "@/components/ui/MonoLabel/MonoLabel";
import s from "./Film.module.css";

/**
 * Os três atos da obra. Cada seção é uma cena do roteiro (scenes.ts):
 * o vídeo fixo atrás avança seu trecho enquanto a legenda sobe como
 * subtítulo de cinema, com letterbox.
 */
const BEATS = [
  {
    scene: "film-1",
    index: "cena 01 · dia 027",
    title: "Estrutura.",
    copy: "Concreto armado e laje nervurada. Quatro pavimentos içados em ciclos de sete dias, prumo conferido a laser.",
    align: "left",
  },
  {
    scene: "film-2",
    index: "cena 02 · dia 063",
    title: "Vedação.",
    copy: "Alvenaria, contrapiso e esquadrias de alumínio anodizado. A obra fecha o corpo antes de ganhar o rosto.",
    align: "right",
  },
  {
    scene: "film-3",
    index: "cena 03 · dia 104",
    title: "Fachada.",
    copy: "Painel cimentício ventilado e ripado de madeira. O desenho da prancha 041 aparece pela primeira vez na rua.",
    align: "left",
  },
] as const;

export default function Film() {
  return (
    <div id="film">
      {BEATS.map((b) => (
        <section key={b.scene} data-scene={b.scene} className={s.beat}>
          <div className={s.sticky}>
            <div className={s.scrim} />
            <div className={`${s.caption} ${b.align === "right" ? s.right : ""}`}>
              <Reveal>
                <p className={s.index}>
                  <MonoLabel tone="ceu">{b.index}</MonoLabel>
                </p>
                <h2 className={s.title}>{b.title}</h2>
                <p className={s.copy}>{b.copy}</p>
              </Reveal>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
