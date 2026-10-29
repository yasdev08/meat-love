import type { Product } from "@/data/menu";
import { formatDA } from "@/lib/format";
import { cn } from "@/lib/cn";

export function Price({ product, className }: { product: Product; className?: string }) {
  if (product.priceLabel) {
    return <span className={cn("tabular-nums", className)}>{product.priceLabel}</span>;
  }
  return (
    <span className={cn("whitespace-nowrap tabular-nums", className)}>
      {product.packs?.length ? (
        <span className="mr-1.5 font-sans text-[0.62em] font-semibold uppercase tracking-[0.2em] text-ash">dès</span>
      ) : null}
      {formatDA(product.price)}
    </span>
  );
}

export function ArabicName({ text, className }: { text: string; className?: string }) {
  return (
    <span lang="ar" dir="rtl" className={cn("font-arabic text-left", className)}>
      {text}
    </span>
  );
}
