import type { SceneName } from "./world";

/**
 * O roteiro do filme: cada cena da página dirige um trecho do vídeo
 * (frações 0–1 da duração). O VideoRig faz lerp entre cenas — um pulo
 * de cena vira um dolly de tempo, nunca um corte seco.
 */
/**
 * Fronteiras calibradas nos frames reais do vídeo (5s), não em frações
 * ingênuas: extraímos amostras a cada 0.5s e a transformação visível de
 * verdade (cross-fade de estrutura crua pra fachada pronta) acontece
 * concentrada entre ~40% e ~70% do vídeo — antes disso é andaime estático,
 * depois é acabamento fino. Dar às cenas 2 e 3 esse trecho é o que faz
 * "Vedação" e "Fachada" realmente parecerem etapas diferentes de
 * "Estrutura", em vez de mostrarem o mesmo andaime parado (achado do
 * parecer de design, seção 03/12).
 */
export const SCENES: Record<SceneName, { v0: number; v1: number }> = {
  // hero/prancha alongados (eram 0–4% / 4–6%): davam menos de 6vh de
  // scroll de exposição ao título antes da 1ª transição — o próprio
  // trecho do vídeo aqui é andaime parado de qualquer forma, então
  // esticar não custa nada em conteúdo (achado do parecer, seção 02/12)
  hero: { v0: 0.0, v1: 0.09 }, // obra crua, quase parada
  prancha: { v0: 0.09, v1: 0.13 }, // mesa de luz: a planta se desenha
  "film-1": { v0: 0.13, v1: 0.3 }, // estrutura — andaime, ainda cru
  "film-2": { v0: 0.3, v1: 0.5 }, // vedação — o cross-fade começa
  "film-3": { v0: 0.5, v1: 0.9 }, // fachada — a transformação principal
  stats: { v0: 0.9, v1: 0.95 }, // quase pronto, números por cima
  finale: { v0: 0.95, v1: 1.0 }, // entrega, frame final
  after: { v0: 1.0, v1: 1.0 }, // filme encerrado — conteúdo rola por cima
};
