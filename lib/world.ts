export type SceneName =
  | "hero"
  | "film-1"
  | "film-2"
  | "film-3"
  | "stats"
  | "finale"
  | "after";

/**
 * Estado mutável compartilhado — o SceneTracker escreve, o VideoRig lê
 * num rAF. Scroll NUNCA re-renderiza React (arquitetura do aurex-motors).
 */
export const world: { scene: SceneName; t: number } = {
  scene: "hero",
  t: 0,
};
