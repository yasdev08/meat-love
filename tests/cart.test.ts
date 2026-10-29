import { test } from "node:test";
import assert from "node:assert/strict";
import { getProduct } from "../data/menu";
import {
  addItem,
  cartCount,
  cartSubtotal,
  lineKey,
  parseStoredCart,
  removeItem,
  resolveCart,
  setQuantity,
  type CartItem,
} from "../lib/cart";
import { buildOrderMessage, buildWhatsAppUrl } from "../lib/order";

const resolve = (items: CartItem[]) => resolveCart(items, getProduct);

test("adds items, merges identical lines and keeps packs separate", () => {
  let items: CartItem[] = [];
  items = addItem(items, { productId: "smoked-brisket-burger", quantity: 2 });
  items = addItem(items, { productId: "smoked-brisket-burger", quantity: 1 });
  items = addItem(items, { productId: "epaule-agneau", packId: "pack-2", quantity: 1 });
  items = addItem(items, { productId: "epaule-agneau", packId: "pack-6", quantity: 1 });
  const lines = resolve(items);
  assert.equal(lines.length, 3);
  assert.equal(lines[0].quantity, 3);
  assert.equal(lines[1].unitPrice, 7000);
  assert.equal(lines[2].unitPrice, 12000);
  assert.equal(cartSubtotal(lines), 3 * 1350 + 7000 + 12000);
  assert.equal(cartCount(lines), 5);
});

test("pack selection drives the price for each lamb dish", () => {
  const expected = { "pack-2": 7000, "pack-3": 8000, "pack-4": 9000, "pack-6": 12000 };
  for (const productId of ["epaule-agneau", "lamb-tchang", "collier-agneau"]) {
    for (const [packId, price] of Object.entries(expected)) {
      const [line] = resolve([{ productId, packId, quantity: 2 }]);
      assert.equal(line.unitPrice, price);
      assert.equal(line.lineTotal, price * 2);
    }
  }
});

test("updates quantities and removes lines", () => {
  let items: CartItem[] = [{ productId: "tiramisu", quantity: 1 }];
  const key = lineKey("tiramisu");
  items = setQuantity(items, key, 4);
  assert.equal(cartSubtotal(resolve(items)), 2400);
  items = setQuantity(items, key, 0);
  assert.deepEqual(items, []);
  items = removeItem([{ productId: "cafe", quantity: 1 }], lineKey("cafe"));
  assert.equal(cartSubtotal(resolve(items)), 0);
});

test("ignores tampered or invalid stored data", () => {
  const stored = parseStoredCart([
    { productId: "eau", quantity: 3 }, // offert : pas de ligne payante
    { productId: "epaule-agneau", quantity: 1 }, // pack manquant
    { productId: "epaule-agneau", packId: "pack-99", quantity: 1 },
    { productId: "bourek", packId: "pack-2", quantity: 1 }, // pas de pack pour ce produit
    { productId: "inconnu", quantity: 1 },
    { productId: "bourek", quantity: 500 },
    "garbage",
    null,
  ]);
  const lines = resolve(stored);
  assert.equal(lines.length, 1);
  assert.equal(lines[0].quantity, 20);
  assert.deepEqual(parseStoredCart("nope"), []);
});

test("order message lists names, quantities, packs, prices and total — and is URL-encoded", () => {
  const lines = resolve([
    { productId: "collier-agneau", packId: "pack-4", quantity: 1 },
    { productId: "chicken-burger", quantity: 2 },
  ]);
  const message = buildOrderMessage(lines);
  assert.equal(
    message,
    [
      "Bonjour Meat Love, je souhaite commander :",
      "",
      "• 1 × Collier d'agneau — Pack 4 : 9 000 DA",
      "• 2 × Chicken Burger : 1 500 DA",
      "",
      "Total : 10 500 DA",
    ].join("\n"),
  );
  // Numéro factice, uniquement pour vérifier l'encodage.
  const url = buildWhatsAppUrl("+213 000 00 00 00", message)!;
  assert.ok(url.startsWith("https://wa.me/213000000000?text="));
  assert.equal(decodeURIComponent(url.split("?text=")[1]), message);
  assert.equal(buildWhatsAppUrl("abc", message), null);
});
