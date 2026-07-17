import MonoLabel from "@/components/ui/MonoLabel/MonoLabel";
import s from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <MonoLabel tone="cal">Atelier Vertex — arquitetura e execução</MonoLabel>
      <MonoLabel>obra 041 · registro completo · 2026</MonoLabel>
      <a href="https://milweb.com.br" className={s.credit}>
        <MonoLabel>feito por MilWeb</MonoLabel>
      </a>
    </footer>
  );
}
