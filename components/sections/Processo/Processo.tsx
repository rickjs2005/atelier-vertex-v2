import Reveal from "@/components/ui/Reveal/Reveal";
import MonoLabel from "@/components/ui/MonoLabel/MonoLabel";
import s from "./Processo.module.css";

const ETAPAS = [
  {
    n: "01",
    title: "Levantamento",
    weeks: "semanas 01–03",
    copy: "Topografia, sondagem do solo, estudo de insolação e vizinhança. Nenhuma linha antes do terreno estar inteiro no papel.",
  },
  {
    n: "02",
    title: "Projeto executivo",
    weeks: "semanas 04–12",
    copy: "Arquitetura, estrutura e instalações compatibilizadas numa prancha única. O que está desenhado é o que será construído.",
  },
  {
    n: "03",
    title: "Obra",
    weeks: "semanas 13–30",
    copy: "Equipe própria de execução, diário de obra fotográfico semanal e cronograma público. O cliente acompanha dia a dia.",
  },
  {
    n: "04",
    title: "Entrega",
    weeks: "semana 31",
    copy: "As built, manual de uso e manutenção, garantia de cinco anos. A chave só muda de mão com a última prancha conferida.",
  },
];

export default function Processo() {
  return (
    <section id="processo" className={s.processo}>
      <header className={s.header}>
        <Reveal>
          <p className={s.eyebrow}>
            <MonoLabel tone="ceu">método · da prancha à chave</MonoLabel>
          </p>
          <h2 className={s.title}>O processo é a especificação.</h2>
        </Reveal>
      </header>

      <ol className={s.lista}>
        {ETAPAS.map((e, i) => (
          <Reveal key={e.n} delay={i * 0.06}>
            <li className={s.etapa}>
              <span className={s.numero}>{e.n}</span>
              <div className={s.corpo}>
                <h3 className={s.nome}>{e.title}</h3>
                <p className={s.copy}>{e.copy}</p>
              </div>
              <span className={s.weeks}>
                <MonoLabel>{e.weeks}</MonoLabel>
              </span>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
