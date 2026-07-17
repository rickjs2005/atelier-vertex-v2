import Reveal from "@/components/ui/Reveal/Reveal";
import Counter from "@/components/ui/Counter/Counter";
import MonoLabel from "@/components/ui/MonoLabel/MonoLabel";
import s from "./Stats.module.css";

const STATS = [
  { value: 132, unit: "dias", label: "do andaime à entrega" },
  { value: 1240, unit: "m²", label: "área construída" },
  { value: 4, unit: "pav", label: "estrutura em concreto armado" },
  { value: 38, unit: "t", label: "aço CA-50 aplicado" },
];

export default function Stats() {
  return (
    <section id="numeros" data-scene="stats" className={s.stats}>
      <div className={s.sticky}>
        <div className={s.inner}>
          <Reveal>
            <p className={s.eyebrow}>
              <MonoLabel tone="ceu">memorial · em números</MonoLabel>
            </p>
            <h2 className={s.title}>Números, não adjetivos.</h2>
          </Reveal>

          <div className={s.grid}>
            {STATS.map((st, i) => (
              <Reveal key={st.label} delay={i * 0.08}>
                <div>
                  <p className={s.value}>
                    <Counter value={st.value} />
                    <span className={s.unit}>{st.unit}</span>
                  </p>
                  <p className={s.label}>
                    <MonoLabel>{st.label}</MonoLabel>
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
