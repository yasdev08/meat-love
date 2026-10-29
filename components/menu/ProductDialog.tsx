"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { Check, Flame, X } from "lucide-react";
import { getCategory, getProduct, isOrderable, SMOKED_MEAT_SIDES, type Product } from "@/data/menu";
import { formatDA } from "@/lib/format";
import { cn } from "@/lib/cn";
import { useCart } from "@/components/cart/CartProvider";
import { DishVisual } from "@/components/DishVisual";
import { ArabicName, Price } from "@/components/Price";
import { Sheet } from "@/components/ui/Sheet";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { buttonClass } from "@/components/ui/Button";

interface ProductDialogContextValue {
  showProduct: (productId: string) => void;
}

const ProductDialogContext = createContext<ProductDialogContextValue | null>(null);

export function ProductDialogProvider({ children }: { children: ReactNode }) {
  const [productId, setProductId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const showProduct = useCallback((id: string) => {
    setProductId(id);
    setOpen(true);
  }, []);
  const value = useMemo(() => ({ showProduct }), [showProduct]);
  const product = productId ? getProduct(productId) : undefined;

  return (
    <ProductDialogContext.Provider value={value}>
      {children}
      <Sheet open={open} onClose={() => setOpen(false)} side="center" labelledBy="product-dialog-title">
        {/* La clé réinitialise pack et quantité à chaque nouveau produit. */}
        {product ? <ProductDetails key={product.id} product={product} onDone={() => setOpen(false)} /> : null}
      </Sheet>
    </ProductDialogContext.Provider>
  );
}

export function useProductDialog(): ProductDialogContextValue {
  const context = useContext(ProductDialogContext);
  if (!context) throw new Error("useProductDialog must be used within <ProductDialogProvider>");
  return context;
}

function ProductDetails({ product, onDone }: { product: Product; onDone: () => void }) {
  const { add, open: openCart } = useCart();
  const [packId, setPackId] = useState(product.packs?.[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const category = getCategory(product.category);
  const pack = product.packs?.find((p) => p.id === packId);
  const unit = pack?.price ?? product.price;
  const orderable = isOrderable(product);

  return (
    <div className="grid md:grid-cols-[1.05fr_1fr]">
      <div className="relative">
        <DishVisual
          product={product}
          dramatic
          sizes="(min-width: 768px) 480px, 100vw"
          className="aspect-[16/10] md:aspect-auto md:h-full md:min-h-[34rem]"
        />
        <button
          type="button"
          onClick={onDone}
          className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-coal-950/70 text-ivory backdrop-blur transition-colors hover:bg-coal-950 md:hidden"
          aria-label="Fermer"
        >
          <X className="size-5" aria-hidden />
        </button>
      </div>

      <div className="flex flex-col gap-6 p-6 sm:p-8 md:max-h-[88dvh] md:overflow-y-auto">
        <div className="flex items-start justify-between gap-4">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-ember-bright">{category.name}</p>
          <button
            type="button"
            onClick={onDone}
            className="-mt-2 -mr-2 hidden size-11 place-items-center rounded-full text-ash transition-colors hover:bg-ivory/5 hover:text-ivory md:grid"
            aria-label="Fermer"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <div>
          <h2 id="product-dialog-title" className="font-display text-4xl leading-[0.95] font-extrabold uppercase sm:text-5xl">
            {product.name}
          </h2>
          {product.nameAr ? <ArabicName text={product.nameAr} className="mt-3 block text-xl text-cream/80" /> : null}
          {product.description ? <p className="mt-4 text-lg text-cream/80">{product.description}</p> : null}
          {!product.packs ? <Price product={product} className="mt-5 block font-display text-3xl font-bold text-glow" /> : null}
        </div>

        {category.note ? (
          <div className="rounded-2xl border border-ember/30 bg-ember/[0.07] p-5">
            <p className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.22em] text-glow">
              <Flame className="size-4" aria-hidden /> Inclus avec ce plat
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-cream/90">{category.note}</p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Accompagnements offerts">
              {SMOKED_MEAT_SIDES.map((side) => (
                <li key={side} className="rounded-full border border-ivory/15 px-3 py-1 text-sm capitalize text-cream">
                  {side}
                </li>
              ))}
              <li className="rounded-full border border-ivory/15 px-3 py-1 text-sm text-cream">Sauces Meat Love</li>
            </ul>
          </div>
        ) : null}

        {product.packs ? (
          <fieldset>
            <legend className="font-display text-sm font-bold uppercase tracking-[0.22em] text-ash">Choisir un pack</legend>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {product.packs.map((option) => {
                const selected = option.id === packId;
                return (
                  <label
                    key={option.id}
                    className={cn(
                      "relative flex cursor-pointer flex-col gap-1 rounded-2xl border p-4 transition-[border-color,background-color] duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-glow",
                      selected ? "border-ember bg-ember/10" : "border-ivory/12 hover:border-ivory/35",
                    )}
                  >
                    <input
                      type="radio"
                      name={`pack-${product.id}`}
                      value={option.id}
                      checked={selected}
                      onChange={() => setPackId(option.id)}
                      className="sr-only"
                    />
                    <span className="font-display text-xl font-bold uppercase tracking-wide">{option.label}</span>
                    <span className={cn("tabular-nums", selected ? "text-glow" : "text-cream/80")}>{formatDA(option.price)}</span>
                    {selected ? (
                      <Check className="absolute top-3.5 right-3.5 size-4 text-ember-bright" aria-hidden />
                    ) : null}
                  </label>
                );
              })}
            </div>
          </fieldset>
        ) : null}

        <div className="sticky bottom-0 -mx-6 -mb-6 mt-auto flex flex-col gap-4 border-t border-ivory/10 bg-coal-900/95 px-6 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] backdrop-blur sm:-mx-8 sm:-mb-8 sm:px-8 sm:pb-8">
          {orderable ? (
            <>
              <div className="flex items-center justify-between gap-4">
                <span className="font-display text-sm font-bold uppercase tracking-[0.22em] text-ash">Quantité</span>
                <QuantityStepper value={quantity} onChange={setQuantity} label={`Quantité pour ${product.name}`} />
              </div>
              <button
                type="button"
                className={buttonClass("primary", "w-full justify-between")}
                onClick={() => {
                  add({ productId: product.id, packId, quantity });
                  onDone();
                  openCart();
                }}
              >
                <span>Ajouter au panier</span>
                <span className="tabular-nums">{formatDA(unit * quantity)}</span>
              </button>
            </>
          ) : (
            <p className="rounded-2xl border border-ivory/10 p-4 text-center text-cream/80">
              <span className="font-display text-lg font-bold uppercase tracking-[0.2em] text-glow">Offert</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
