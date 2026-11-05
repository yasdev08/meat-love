import Image from "next/image";
import type { Product } from "@/data/menu";
import { productPhoto } from "@/lib/images";
import { cn } from "@/lib/cn";
import { DishArt } from "./illustrations/DishArt";

interface DishVisualProps {
  product: Product;
  className?: string;
  /** Taille de rendu indicative pour next/image. */
  sizes?: string;
  priority?: boolean;
  /** Variante plus spectaculaire (grands formats). */
  dramatic?: boolean;
  /** Affiche la mention « Photo d'illustration » (désactiver sur les vignettes). */
  label?: boolean;
}

/**
 * Visuel d'un plat : la photo réelle si elle a été déposée dans
 * public/images/menu/<id>.*, sinon l'illustration au trait de la maison.
 */
export function DishVisual({ product, className, sizes = "(min-width: 1024px) 33vw, 100vw", priority, dramatic, label = true }: DishVisualProps) {
  const photo = productPhoto(product.id);

  return (
    <div className={cn("relative isolate overflow-hidden bg-coal-850", className)}>
      {photo ? (
        <>
          <Image
            src={photo}
            alt={`${product.name} — photo d'illustration`}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-coal-950/70 via-transparent to-transparent" />
          {label ? (
            <span className="absolute top-3 left-3 rounded-full bg-coal-950/65 px-2.5 py-1 text-[0.65rem] tracking-wide text-cream/80 backdrop-blur">
              Photo d&apos;illustration
            </span>
          ) : null}
        </>
      ) : (
        <>
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 -z-10",
              "bg-[radial-gradient(ellipse_at_50%_115%,color-mix(in_oklab,var(--color-ember)_42%,transparent)_0%,transparent_62%)]",
              dramatic && "animate-flicker",
            )}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgb(244_236_224/0.06),transparent_45%)]"
          />
          <div aria-hidden="true" className="absolute inset-x-[12%] bottom-[8%] h-px ember-rule opacity-40" />
          <DishArt
            visual={product.visual}
            className="dish-art absolute inset-0 m-auto h-[78%] w-[78%] text-cream/85 transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.05] group-hover:-translate-y-1"
          />
        </>
      )}
    </div>
  );
}
