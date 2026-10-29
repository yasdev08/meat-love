/**
 * MEAT LOVE — menu officiel.
 *
 * Source unique de vérité pour la carte, les fiches produits et le panier.
 * Les noms, prix, textes arabes et packs reproduisent exactement la carte
 * fournie par le restaurant. Ne rien ajouter qui n'y figure pas.
 */

export type CategoryId =
  | "entrees-chaudes"
  | "burgers"
  | "viandes-fumees"
  | "poulet-pasta"
  | "riz"
  | "desserts"
  | "boissons";

/** Clé du visuel illustré utilisé tant qu'aucune photo réelle n'est fournie. */
export type VisualKey =
  | "bourek"
  | "soup"
  | "burger"
  | "chicken-burger"
  | "brisket-burger"
  | "lamb-shoulder"
  | "lamb-shank"
  | "lamb-neck"
  | "cloche"
  | "chicken-plate"
  | "smoked-chicken"
  | "pasta"
  | "rice"
  | "creme-brulee"
  | "tiramisu"
  | "soda"
  | "water"
  | "coffee"
  | "brioche";

export interface PackOption {
  id: string;
  /** Libellé d'origine, conservé tel quel (sa signification n'est pas précisée). */
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  /** Nom arabe tel qu'il figure sur la carte. */
  nameAr?: string;
  description?: string;
  category: CategoryId;
  /** Prix en dinars algériens. Pour les produits à packs : prix du plus petit pack. */
  price: number;
  /** Libellé affiché à la place du prix (ex. « Offert »). */
  priceLabel?: string;
  packs?: readonly PackOption[];
  visual: VisualKey;
  /** Mis en avant sur la page d'accueil. */
  signature?: boolean;
}

export interface Category {
  id: CategoryId;
  name: string;
  /** Courte accroche éditoriale (texte de présentation, pas une donnée produit). */
  tagline: string;
  /** Information officielle affichée en tête de catégorie et dans chaque fiche. */
  note?: string;
}

export const SMOKED_MEAT_INCLUDES =
  "Chaque plat de viande inclut toutes les entrées chaudes et froides offertes (riz, salade, houmous, metbal, aubergine, hmiss) et toutes les sauces Meat Love.";

/** Les accompagnements offerts, repris de la mention officielle ci-dessus. */
export const SMOKED_MEAT_SIDES = [
  "riz",
  "salade",
  "houmous",
  "metbal",
  "aubergine",
  "hmiss",
] as const;

export const categories: readonly Category[] = [
  {
    id: "entrees-chaudes",
    name: "Entrées chaudes",
    tagline: "Pour ouvrir l'appétit.",
  },
  {
    id: "burgers",
    name: "Burgers",
    tagline: "Trois classiques de la maison.",
  },
  {
    id: "viandes-fumees",
    name: "Viandes fumées",
    tagline: "La signature de la maison.",
    note: SMOKED_MEAT_INCLUDES,
  },
  {
    id: "poulet-pasta",
    name: "Poulet & Pasta",
    tagline: "Grillé, fumé ou crémeux.",
  },
  {
    id: "riz",
    name: "Riz",
    tagline: "En accompagnement.",
  },
  {
    id: "desserts",
    name: "Desserts",
    tagline: "Le mot de la fin.",
  },
  {
    id: "boissons",
    name: "Boissons",
    tagline: "Pour accompagner.",
  },
];

const lambPacks: readonly PackOption[] = [
  { id: "pack-2", label: "Pack 2", price: 7000 },
  { id: "pack-3", label: "Pack 3", price: 8000 },
  { id: "pack-4", label: "Pack 4", price: 9000 },
  { id: "pack-6", label: "Pack 6", price: 12000 },
];

export const products: readonly Product[] = [
  // ENTRÉES CHAUDES
  { id: "bourek", name: "Bourek", category: "entrees-chaudes", price: 250, visual: "bourek" },
  {
    id: "soupe-lentilles-corail",
    name: "Soupe de lentilles corail",
    category: "entrees-chaudes",
    price: 450,
    visual: "soup",
  },
  {
    id: "soupe-champignons",
    name: "Soupe de champignons",
    category: "entrees-chaudes",
    price: 700,
    visual: "soup",
  },

  // BURGERS
  {
    id: "chicken-burger",
    name: "Chicken Burger",
    nameAr: "برغر دجاج",
    category: "burgers",
    price: 750,
    visual: "chicken-burger",
  },
  {
    id: "classic-meat-burger",
    name: "Classic Meat Burger",
    nameAr: "برغر لحم",
    category: "burgers",
    price: 950,
    visual: "burger",
  },
  {
    id: "smoked-brisket-burger",
    name: "Smoked Brisket Burger",
    nameAr: "برغر بريسكت مدخّن",
    category: "burgers",
    price: 1350,
    visual: "brisket-burger",
    signature: true,
  },

  // VIANDES FUMÉES
  {
    id: "epaule-agneau",
    name: "Épaule d'agneau",
    category: "viandes-fumees",
    price: 7000,
    packs: lambPacks,
    visual: "lamb-shoulder",
    signature: true,
  },
  {
    id: "lamb-tchang",
    name: "Lamb Tchang",
    category: "viandes-fumees",
    price: 7000,
    packs: lambPacks,
    visual: "lamb-shank",
  },
  {
    id: "collier-agneau",
    name: "Collier d'agneau",
    category: "viandes-fumees",
    price: 7000,
    packs: lambPacks,
    visual: "lamb-neck",
  },
  {
    id: "bouzelouf",
    name: "Bouzelouf",
    nameAr: "بوزلوف",
    category: "viandes-fumees",
    price: 4500,
    visual: "cloche",
  },

  // POULET & PASTA
  {
    id: "plat-poulet-grille",
    name: "Plat de poulet grillé",
    description: "Salade, pommes de terre et riz",
    category: "poulet-pasta",
    price: 2100,
    visual: "chicken-plate",
  },
  {
    id: "poulet-fume",
    name: "Poulet fumé",
    description: "Salade, pommes de terre et riz",
    category: "poulet-pasta",
    price: 3300,
    visual: "smoked-chicken",
    signature: true,
  },
  {
    id: "pasta-fettuccine-alfredo",
    name: "Pasta Fettuccine Alfredo",
    category: "poulet-pasta",
    price: 1500,
    visual: "pasta",
  },

  // RIZ
  { id: "riz-blanc", name: "Riz blanc", nameAr: "أرز أبيض", category: "riz", price: 350, visual: "rice" },
  { id: "riz-jaune", name: "Riz jaune", nameAr: "أرز أصفر", category: "riz", price: 350, visual: "rice" },

  // DESSERTS
  { id: "creme-brulee", name: "Crème brûlée", category: "desserts", price: 400, visual: "creme-brulee" },
  { id: "tiramisu", name: "Tiramisu", category: "desserts", price: 600, visual: "tiramisu" },

  // BOISSONS
  { id: "coca-cola", name: "Coca-Cola", category: "boissons", price: 150, visual: "soda" },
  { id: "pepsi", name: "Pepsi", category: "boissons", price: 150, visual: "soda" },
  { id: "7-up", name: "7 Up", category: "boissons", price: 150, visual: "soda" },
  { id: "eau", name: "Eau", category: "boissons", price: 0, priceLabel: "Offert", visual: "water" },
  { id: "cafe", name: "Café", category: "boissons", price: 350, visual: "coffee" },
];

/** Les produits offerts ne s'ajoutent pas au panier. */
export function isOrderable(product: Product): boolean {
  return product.price > 0;
}

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getCategory(id: CategoryId): Category {
  const category = categories.find((c) => c.id === id);
  if (!category) throw new Error(`Unknown category: ${id}`);
  return category;
}

export function productsIn(categoryId: CategoryId): Product[] {
  return products.filter((p) => p.category === categoryId);
}

export const signatureProducts = (
  ["smoked-brisket-burger", "epaule-agneau", "poulet-fume"] as const
).map((id) => {
  const product = getProduct(id);
  if (!product) throw new Error(`Missing signature product: ${id}`);
  return product;
});
