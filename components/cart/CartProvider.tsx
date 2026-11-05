"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { track } from "@vercel/analytics";
import { getProduct } from "@/data/menu";
import {
  addItem as addCartItem,
  cartCount,
  cartSubtotal,
  parseStoredCart,
  removeItem as removeCartItem,
  resolveCart,
  setQuantity as setCartQuantity,
  type CartItem,
  type CartLine,
} from "@/lib/cart";

const STORAGE_KEY = "meatlove.cart.v1";

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (item: CartItem) => void;
  setQuantity: (key: string, quantity: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  /** Incrémenté à chaque ajout, pour animer le compteur. */
  pulse: number;
}

const CartContext = createContext<CartContextValue | null>(null);

function readStoredCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? parseStoredCart(JSON.parse(raw)) : [];
  } catch {
    // Stockage indisponible ou corrompu : on repart d'un panier vide.
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [pulse, setPulse] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const [hydrated, setHydrated] = useState(false);

  // Relit le panier sauvegardé après le premier rendu (évite les écarts d'hydratation).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- synchronisation unique avec localStorage
    setItems(readStoredCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Navigation privée / quota : le panier reste en mémoire pour la session.
    }
  }, [items, hydrated]);

  // Synchronise plusieurs onglets ouverts.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setItems(readStoredCart());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const add = useCallback((item: CartItem) => {
    setItems((current) => addCartItem(current, item));
    setPulse((n) => n + 1);
    const product = getProduct(item.productId);
    const pack = product?.packs?.find((p) => p.id === item.packId);
    track("add_to_cart", { product: item.productId, pack: item.packId ?? null, quantity: item.quantity });
    if (product) {
      setAnnouncement(`${item.quantity} × ${product.name}${pack ? ` (${pack.label})` : ""} ajouté au panier`);
    }
  }, []);

  // Masque la notification après quelques secondes.
  useEffect(() => {
    if (!announcement) return;
    const timer = window.setTimeout(() => setAnnouncement(""), 3200);
    return () => window.clearTimeout(timer);
  }, [announcement, pulse]);

  const value = useMemo<CartContextValue>(() => {
    const lines = resolveCart(items, getProduct);
    return {
      lines,
      count: cartCount(lines),
      subtotal: cartSubtotal(lines),
      isOpen,
      open: () => {
        setAnnouncement("");
        setIsOpen(true);
      },
      close: () => setIsOpen(false),
      add,
      setQuantity: (key, quantity) => setItems((current) => setCartQuantity(current, key, quantity)),
      remove: (key) => setItems((current) => removeCartItem(current, key)),
      clear: () => setItems([]),
      pulse,
    };
  }, [items, isOpen, add, pulse]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[55] flex justify-center px-4"
      >
        {announcement ? (
          <div
            key={pulse}
            className="toast pointer-events-auto flex max-w-md items-center gap-4 rounded-full border border-ivory/15 bg-coal-800/95 py-2 pr-2 pl-5 text-sm text-ivory shadow-2xl backdrop-blur"
          >
            <span className="min-w-0 truncate">{announcement}</span>
            <button
              type="button"
              onClick={() => {
                setAnnouncement("");
                setIsOpen(true);
              }}
              className="min-h-10 shrink-0 rounded-full bg-ember px-4 font-display font-bold uppercase tracking-[0.12em] text-coal-950 hover:bg-ember-bright"
            >
              Voir le panier
            </button>
          </div>
        ) : null}
      </div>
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within <CartProvider>");
  return context;
}
