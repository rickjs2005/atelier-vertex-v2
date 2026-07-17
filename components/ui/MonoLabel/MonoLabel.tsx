import type { ReactNode } from "react";
import s from "./MonoLabel.module.css";

type Props = {
  children: ReactNode;
  /** cal | ceu | dim (default) */
  tone?: "dim" | "cal" | "ceu";
  className?: string;
};

/** Label técnico em JetBrains Mono — cotas, datas, números, specs. */
export default function MonoLabel({ children, tone = "dim", className }: Props) {
  return (
    <span className={`${s.label} ${s[tone]} ${className ?? ""}`}>{children}</span>
  );
}
