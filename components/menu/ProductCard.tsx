"use client";

import { ArrowUpRight, Plus } from "lucide-react";
import { isOrderable, type Product } from "@/data/menu";
import { formatDA } from "@/lib/format";
import { cn } from "@/lib/cn";
import { useCart } from "@/components/cart/CartProvider";
import { DishVisual } from "@/components/DishVisual";
import { ArabicName, Price } from "@/components/Price";
import { useProductDialog } from "./ProductDialog";

interface ProductCardProps {
  product: Product;
  variant?: "card" | "feature" | "row";
  className?: string;
  priority?: boolean;
}

function QuickAdd({ product, className }: { product: Product; className?: string }) {
  const { add } = useCart();
  const { showProduct } = useProductDialog();
  if (!isOrderable(product)) return null;
  const needsChoice = Boolean(product.packs?.length);
  return (
    <button
      type="button"
      onClick={() => (needsChoice ? showProduct(product.id) : add({ productId: product.id, quantity: 1 }))}
      className={cn(
        "relative z-10 inline-flex min-h-11 items-center gap-2 rounded-full bg-ivory px-4 font-display text-sm font-bold uppercase tracking-[0.14em] text-coal-950 transition-[background-color,transform] duration-300 hover:bg-ember-bright active:scale-95",
        className,
      )}
      aria-label={needsChoice ? `Choisir un pack — ${product.name}` : `Ajouter ${product.name} au panier`}
    >
      <Plus className="size-4" aria-hidden />
      {needsChoice ? "Choisir" : "Ajouter"}
    </button>
  );
}

export function ProductCard({ product, variant = "card", className, priority }: ProductCardProps) {
  const { showProduct } = useProductDialog();
  const open = () => showProduct(product.id);

  if (variant === "row") {
    return (
      <article className={cn("group relative flex items-center gap-4 rounded-2xl border border-ivory/10 bg-coal-900/60 p-3 pr-4 transition-colors hover:border-ivory/25", className)}>
        <DishVisual product={product} label={false} sizes="80px" className="size-[4.5rem] shrink-0 rounded-xl sm:size-20" />
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-xl leading-tight font-bold uppercase break-words">
            <button type="button" onClick={open} className="text-left after:absolute after:inset-0 after:rounded-2xl">
              {product.name}
            </button>
          </h3>
          {product.nameAr ? <ArabicName text={product.nameAr} className="block text-sm text-ash" /> : null}
          <Price product={product} className={cn("mt-1 block font-display text-lg font-bold", product.priceLabel ? "text-glow uppercase tracking-[0.18em]" : "text-cream")} />
        </div>
        <QuickAdd product={product} className="px-3" />
      </article>
    );
  }

  if (variant === "feature") {
    return (
      <article
        className={cn(
          "group relative grid overflow-hidden rounded-[1.75rem] border border-ivory/10 bg-coal-900 transition-colors hover:border-ember/40 md:grid-cols-[1.1fr_1fr]",
          className,
        )}
      >
        <DishVisual product={product} dramatic priority={priority} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3] md:aspect-auto md:min-h-[26rem]" />
        <div className="flex flex-col gap-6 p-6 sm:p-8 lg:p-10">
          <div>
            <h3 className="font-display text-4xl leading-[0.92] font-extrabold uppercase sm:text-5xl">
              <button type="button" onClick={open} className="text-left after:absolute after:inset-0">
                {product.name}
              </button>
            </h3>
            {product.nameAr ? <ArabicName text={product.nameAr} className="mt-2 block text-lg text-cream/75" /> : null}
            <Price product={product} className="mt-4 block font-display text-2xl font-bold text-glow" />
          </div>
          {product.packs ? (
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ivory/10 bg-ivory/10">
              {product.packs.map((pack) => (
                <div key={pack.id} className="bg-coal-900 px-4 py-3">
                  <dt className="font-display text-sm font-bold uppercase tracking-[0.2em] text-ash">{pack.label}</dt>
                  <dd className="font-display text-xl font-bold tabular-nums">{formatDA(pack.price)}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          <div className="mt-auto flex items-center justify-between gap-4">
            <span className="inline-flex items-center gap-1.5 text-sm text-ash transition-colors group-hover:text-ivory">
              Voir le détail <ArrowUpRight className="size-4" aria-hidden />
            </span>
            <QuickAdd product={product} />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-ivory/10 bg-coal-900 transition-[border-color,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:border-ivory/25",
        className,
      )}
    >
      <DishVisual product={product} priority={priority} sizes="(min-width: 1280px) 30vw, (min-width: 640px) 50vw, 100vw" className="aspect-[4/3]" />
      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex-1">
          <h3 className="font-display text-[1.75rem] leading-[0.95] font-extrabold uppercase break-words">
            <button type="button" onClick={open} className="text-left after:absolute after:inset-0">
              {product.name}
            </button>
          </h3>
          {product.nameAr ? <ArabicName text={product.nameAr} className="mt-2 block text-base text-cream/75" /> : null}
          {product.description ? <p className="mt-2 text-cream/75">{product.description}</p> : null}
        </div>
        <div className="flex items-center justify-between gap-3">
          <Price product={product} className="font-display text-2xl font-bold text-glow" />
          <QuickAdd product={product} />
        </div>
      </div>
    </article>
  );
}
