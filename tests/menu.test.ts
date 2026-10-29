import { test } from "node:test";
import assert from "node:assert/strict";
import { categories, products, SMOKED_MEAT_INCLUDES, getProduct } from "../data/menu";
import { formatDA } from "../lib/format";

// Copie indépendante de la carte officielle fournie par le restaurant.
const SOURCE: Record<string, Array<[name: string, price: number, ar?: string]>> = {
  "Entrées chaudes": [
    ["Bourek", 250],
    ["Soupe de lentilles corail", 450],
    ["Soupe de champignons", 700],
  ],
  Burgers: [
    ["Chicken Burger", 750, "برغر دجاج"],
    ["Classic Meat Burger", 950, "برغر لحم"],
    ["Smoked Brisket Burger", 1350, "برغر بريسكت مدخّن"],
  ],
  "Viandes fumées": [
    ["Épaule d'agneau", 7000],
    ["Lamb Tchang", 7000],
    ["Collier d'agneau", 7000],
    ["Bouzelouf", 4500, "بوزلوف"],
  ],
  "Poulet & Pasta": [
    ["Plat de poulet grillé", 2100],
    ["Poulet fumé", 3300],
    ["Pasta Fettuccine Alfredo", 1500],
  ],
  Riz: [
    ["Riz blanc", 350, "أرز أبيض"],
    ["Riz jaune", 350, "أرز أصفر"],
  ],
  Desserts: [
    ["Crème brûlée", 400],
    ["Tiramisu", 600],
  ],
  Boissons: [
    ["Coca-Cola", 150],
    ["Pepsi", 150],
    ["7 Up", 150],
    ["Eau", 0],
    ["Café", 350],
  ],
};

test("categories match the source menu, in order", () => {
  assert.deepEqual(categories.map((c) => c.name), Object.keys(SOURCE));
});

test("every product, price and Arabic name matches the source menu — nothing added or omitted", () => {
  const expected = Object.entries(SOURCE).flatMap(([cat, items]) =>
    items.map(([name, price, ar]) => ({ cat, name, price, ar })),
  );
  const actual = products.map((p) => ({
    cat: categories.find((c) => c.id === p.category)!.name,
    name: p.name,
    price: p.price,
    ar: p.nameAr,
  }));
  assert.deepEqual(actual, expected);
  assert.equal(products.length, 22);
});

test("the three lamb dishes expose exactly Pack 2/3/4/6 at 7 000 / 8 000 / 9 000 / 12 000 DA", () => {
  for (const id of ["epaule-agneau", "lamb-tchang", "collier-agneau"]) {
    const p = getProduct(id)!;
    assert.deepEqual(
      p.packs?.map((pk) => [pk.label, pk.price]),
      [["Pack 2", 7000], ["Pack 3", 8000], ["Pack 4", 9000], ["Pack 6", 12000]],
    );
  }
  const withPacks = products.filter((p) => p.packs).map((p) => p.id);
  assert.deepEqual(withPacks, ["epaule-agneau", "lamb-tchang", "collier-agneau"]);
});

test("descriptions only where the source menu provides them", () => {
  const described = products.filter((p) => p.description).map((p) => [p.name, p.description]);
  assert.deepEqual(described, [
    ["Plat de poulet grillé", "Salade, pommes de terre et riz"],
    ["Poulet fumé", "Salade, pommes de terre et riz"],
  ]);
});

test("Eau is offered and labelled « Offert »", () => {
  const eau = getProduct("eau")!;
  assert.equal(eau.priceLabel, "Offert");
  assert.equal(eau.price, 0);
});

test("smoked meats carry the exact complimentary sides statement", () => {
  assert.equal(
    SMOKED_MEAT_INCLUDES,
    "Chaque plat de viande inclut toutes les entrées chaudes et froides offertes (riz, salade, houmous, metbal, aubergine, hmiss) et toutes les sauces Meat Love.",
  );
  assert.equal(categories.find((c) => c.id === "viandes-fumees")!.note, SMOKED_MEAT_INCLUDES);
});

test("prices are formatted in French typography", () => {
  assert.equal(formatDA(1350), "1 350 DA");
  assert.equal(formatDA(12000), "12 000 DA");
  assert.equal(formatDA(250), "250 DA");
});
