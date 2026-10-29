import type { PackOption, Product } from "../data/menu";

export interface CartItem {
  productId: string;
  /** Identifiant du pack choisi, pour les produits qui en proposent. */
  packId?: string;
  quantity: number;
}

export interface CartLine {
  key: string;
  product: Product;
  pack?: PackOption;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export const MAX_QUANTITY = 20;

export function lineKey(productId: string, packId?: string): string {
  return packId ? `${productId}::${packId}` : productId;
}

export function clampQuantity(quantity: number): number {
  if (!Number.isFinite(quantity)) return 1;
  return Math.min(MAX_QUANTITY, Math.max(1, Math.round(quantity)));
}

/** Prix unitaire d'un produit, selon le pack éventuellement sélectionné. */
export function unitPrice(product: Product, packId?: string): number | null {
  if (product.packs?.length) {
    const pack = product.packs.find((p) => p.id === packId);
    return pack ? pack.price : null;
  }
  return product.price;
}

/**
 * Transforme les articles bruts (ex. relus depuis localStorage) en lignes
 * chiffrées. Les prix proviennent toujours du menu : un article inconnu,
 * offert ou avec un pack invalide est ignoré.
 */
export function resolveCart(
  items: readonly CartItem[],
  findProduct: (id: string) => Product | undefined,
): CartLine[] {
  const lines = new Map<string, CartLine>();
  for (const item of items) {
    const product = findProduct(item.productId);
    if (!product || product.price <= 0) continue;
    const hasPacks = Boolean(product.packs?.length);
    if (hasPacks !== Boolean(item.packId)) continue;
    const price = unitPrice(product, item.packId);
    if (price === null) continue;

    const key = lineKey(product.id, item.packId);
    const existing = lines.get(key);
    const quantity = clampQuantity((existing?.quantity ?? 0) + item.quantity);
    lines.set(key, {
      key,
      product,
      pack: product.packs?.find((p) => p.id === item.packId),
      quantity,
      unitPrice: price,
      lineTotal: price * quantity,
    });
  }
  return [...lines.values()];
}

export function cartSubtotal(lines: readonly CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.lineTotal, 0);
}

export function cartCount(lines: readonly CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

export function addItem(items: readonly CartItem[], item: CartItem): CartItem[] {
  const key = lineKey(item.productId, item.packId);
  const index = items.findIndex((i) => lineKey(i.productId, i.packId) === key);
  if (index === -1) return [...items, { ...item, quantity: clampQuantity(item.quantity) }];
  return items.map((i, n) =>
    n === index ? { ...i, quantity: clampQuantity(i.quantity + item.quantity) } : i,
  );
}

export function setQuantity(items: readonly CartItem[], key: string, quantity: number): CartItem[] {
  if (quantity <= 0) return removeItem(items, key);
  return items.map((i) =>
    lineKey(i.productId, i.packId) === key ? { ...i, quantity: clampQuantity(quantity) } : i,
  );
}

export function removeItem(items: readonly CartItem[], key: string): CartItem[] {
  return items.filter((i) => lineKey(i.productId, i.packId) !== key);
}

/** Valide une valeur inconnue (localStorage) et ne garde que des articles bien formés. */
export function parseStoredCart(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((entry): CartItem[] => {
    if (typeof entry !== "object" || entry === null) return [];
    const { productId, packId, quantity } = entry as Record<string, unknown>;
    if (typeof productId !== "string" || typeof quantity !== "number") return [];
    if (packId !== undefined && typeof packId !== "string") return [];
    return [{ productId, packId, quantity: clampQuantity(quantity) }];
  });
}
