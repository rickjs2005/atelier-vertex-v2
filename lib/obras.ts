/**
 * Portfólio do Atelier Vertex — obras entregues antes da 041 (o filme).
 * Fotos: Unsplash, IDs fixos e estáveis (verificados no projeto v1).
 */

export interface Obra {
  n: string;
  title: string;
  loc: string;
  year: number;
  area: string;
  sistema: string;
  cover: string;
}

const img = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const OBRAS: Obra[] = [
  {
    n: "040",
    title: "Casa Horizonte",
    loc: "Serra da Mantiqueira, SP",
    year: 2025,
    area: "780 m²",
    sistema: "concreto aparente · balanço de 12 m",
    cover: img("photo-1600585154340-be6161a56a0c"),
  },
  {
    n: "038",
    title: "Pavilhão Luz",
    loc: "Jardins, São Paulo",
    year: 2024,
    area: "540 m²",
    sistema: "concreto pigmentado · pátio central",
    cover: img("photo-1600566753190-17f0baa2a6c3"),
  },
  {
    n: "035",
    title: "Refúgio Mata",
    loc: "Campos do Jordão, SP",
    year: 2024,
    area: "420 m²",
    sistema: "madeira laminada · seis apoios no solo",
    cover: img("photo-1512917774080-9991f1c4c750"),
  },
  {
    n: "031",
    title: "Casa Monólito",
    loc: "Guarujá, SP",
    year: 2023,
    area: "920 m²",
    sistema: "concreto protendido · travertino",
    cover: img("photo-1613490493576-7fde63acd811"),
  },
  {
    n: "027",
    title: "Casa Pátio Norte",
    loc: "Brasília, DF",
    year: 2023,
    area: "610 m²",
    sistema: "concreto branco · cobogó cerâmico",
    cover: img("photo-1600047509807-ba8f99d2cdde"),
  },
  {
    n: "022",
    title: "Vila Serena",
    loc: "Punta del Este, UY",
    year: 2022,
    area: "1.150 m²",
    sistema: "basalto · três pavilhões",
    cover: img("photo-1600596542815-ffad4c1539a9"),
  },
];
