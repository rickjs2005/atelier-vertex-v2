import s from "./Nav.module.css";

const LINKS = [
  ["A obra", "#film"],
  ["Números", "#numeros"],
  ["Contato", "#contato"],
];

export default function Nav() {
  return (
    <header className={s.nav}>
      <a href="#" className={s.logo}>
        Atelier Vertex
      </a>
      <nav className={s.links} aria-label="Navegação principal">
        {LINKS.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
