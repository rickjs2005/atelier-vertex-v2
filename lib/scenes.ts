import type { SceneName } from "./world";

/**
 * O roteiro do filme: cada cena da página dirige um trecho do vídeo
 * (frações 0–1 da duração). O VideoRig faz lerp entre cenas — um pulo
 * de cena vira um dolly de tempo, nunca um corte seco.
 */
export const SCENES: Record<SceneName, { v0: number; v1: number }> = {
  hero: { v0: 0.0, v1: 0.05 }, // obra crua, quase parada
  "film-1": { v0: 0.05, v1: 0.34 }, // estrutura
  "film-2": { v0: 0.34, v1: 0.62 }, // vedação
  "film-3": { v0: 0.62, v1: 0.86 }, // fachada
  stats: { v0: 0.86, v1: 0.93 }, // quase pronto, números por cima
  finale: { v0: 0.93, v1: 1.0 }, // entrega
};
