// Curated Unsplash photo IDs per niche. No API key needed — direct CDN.
// If an ID 404s, the UI falls back to a CSS gradient.
import type { NicheKey } from "./types.js";

export interface PhotoSet {
  hero: string;
  gallery: string[];
}

function unsplash(id: string, w = 1600): string {
  return `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;
}

const POOLS: Record<NicheKey, PhotoSet> = {
  hospitality: {
    hero: "1564013799919-ab600027ffc6",
    gallery: [
      "1582719508461-905c673771fd",
      "1551882547-ff40c63fe5fa",
      "1542314831-068cd1dbfeeb",
      "1611892440504-42a792e24d32",
      "1571896349842-33c89424de2d",
      "1566073771259-6a8506099945",
    ],
  },
  food: {
    hero: "1517248135467-4c7edcad34c4",
    gallery: [
      "1414235077428-338989a2e8c0",
      "1551218808-94e220e084d2",
      "1565299624946-b28f40a0ae38",
      "1504674900247-0877df9cc836",
      "1555396273-367ea4eb4db5",
      "1517248135467-4c7edcad34c4",
    ],
  },
  services: {
    hero: "1503387762-592deb58ef4e",
    gallery: [
      "1604147706283-d7119b5b822c",
      "1560066984-138dadb4c035",
      "1556228720-195a672e8a03",
      "1581578731548-c64695cc6952",
      "1503387762-592deb58ef4e",
      "1542621334-a254cf47733d",
    ],
  },
  ecommerce: {
    hero: "1441986300917-64674bd600d8",
    gallery: [
      "1483985988355-763728e1935b",
      "1490481651871-ab68de25d43d",
      "1542291026-7eec264c27ff",
      "1539109136881-3be0616acf4b",
      "1556909114-f6e7ad7d3136",
      "1551488831-00ddcb6c6bd3",
    ],
  },
  agency: {
    hero: "1573164713714-d95e436ab8d6",
    gallery: [
      "1497366216548-37526070297c",
      "1542744173-8e7e53415bb0",
      "1551434678-e076c223a692",
      "1517048676732-d65bc937f952",
      "1556761175-5973dc0f32e7",
      "1556761175-b413da4baf72",
    ],
  },
  portfolio: {
    hero: "1503676260728-1c00da094a0b",
    gallery: [
      "1542435503-956c469947f6",
      "1559028012-481c04fa702d",
      "1518770660439-4636190af475",
      "1488229297213-66f1c4baf61c",
      "1517048676732-d65bc937f952",
      "1542435503-956c469947f6",
    ],
  },
  tech: {
    hero: "1518770660439-4636190af475",
    gallery: [
      "1551288049-bebda4e38f71",
      "1488229297213-66f1c4baf61c",
      "1517048676732-d65bc937f952",
      "1555949963-aa79dcee981c",
      "1551434678-e076c223a692",
      "1518770660439-4636190af475",
    ],
  },
  fitness: {
    hero: "1571019614242-c5c5dee9f50b",
    gallery: [
      "1534438327276-14e5300c3a48",
      "1517836357463-d25dfeac3438",
      "1540497077202-7c8a3999166f",
      "1518611012118-696072aa579a",
      "1571902943202-507ec2618e8f",
      "1571019614242-c5c5dee9f50b",
    ],
  },
  education: {
    hero: "1503676260728-1c00da094a0b",
    gallery: [
      "1522202176988-66273c2fd55f",
      "1523240795612-9a054b0db644",
      "1513258496099-48168024aec0",
      "1501504905252-473c47e087f8",
      "1481627834876-b7833e8f5570",
      "1503676260728-1c00da094a0b",
    ],
  },
  generic: {
    hero: "1497366216548-37526070297c",
    gallery: [
      "1517694712202-14dd9538aa97",
      "1497366754035-f200968a6e72",
      "1542621334-a254cf47733d",
      "1518770660439-4636190af475",
      "1517048676732-d65bc937f952",
      "1556761175-5973dc0f32e7",
    ],
  },
};

export function photosFor(niche: NicheKey): { hero: string; gallery: string[] } {
  const pool = POOLS[niche] || POOLS.generic;
  return {
    hero: unsplash(pool.hero, 2000),
    gallery: pool.gallery.map((id) => unsplash(id, 1200)),
  };
}
