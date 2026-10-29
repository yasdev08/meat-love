import type { Metadata } from "next";
import { Flame } from "lucide-react";
import { categories, productsIn, SMOKED_MEAT_SIDES, type Category } from "@/data/menu";
import { cn } from "@/lib/cn";
import { CategoryNav } from "@/components/menu/CategoryNav";
import { ProductCard } from "@/components/menu/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { RestaurantJsonLd } from "@/components/seo/RestaurantJsonLd";

export const metadata: Metadata = {
  title: "Menu — viandes fumées, burgers, poulet & desserts",
  description:
    "La carte complète Meat Love : épaule d'agneau, Lamb Tchang et collier d'agneau fumés en packs, Smoked Brisket Burger, poulet fumé, entrées chaudes, desserts et boissons. Prix en dinars algériens.",
  alternates: { canonical: "/menu" },
  openGraph: { title: "Le menu Meat Love", url: "/menu" },
};

const container = "mx-auto w-full max-w-[88rem] px-4 sm:px-6 lg:px-10";

function CategoryHeader({ category, index }: { category: Category; index: number }) {
  return (
    <Reveal className="flex flex-col gap-3 border-b border-ivory/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="font-sans text-sm tabular-nums text-ember-bright">0{index + 1} / 0{categories.length}</p>
        <h2 className="mt-3 font-display text-[clamp(2.8rem,8vw,6rem)] leading-[0.88] font-black uppercase">{category.name}</h2>
      </div>
      <p className="font-serif text-2xl text-cream/70 italic">{category.tagline}</p>
    </Reveal>
  );
}

function SmokedMeats({ category, index }: { category: Category; index: number }) {
  const items = productsIn(category.id);
  const cuts = items.filter((p) => p.packs);
  const others = items.filter((p) => !p.packs);
  return (
    <section id={category.id} aria-label={category.name} className="relative scroll-mt-40 overflow-hidden bg-coal-900 py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute -top-60 left-1/2 h-[40rem] w-[70rem] -translate-x-1/2 rounded-[100%] bg-ember/15 blur-[120px]" />
      <div className={cn(container, "relative")}>
        <CategoryHeader category={category} index={index} />
        {category.note ? (
          <Reveal className="mt-10 grid gap-6 rounded-[1.75rem] border border-ember/30 bg-ember/[0.06] p-6 sm:p-8 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-10">
            <div className="flex items-center gap-3">
              <span className="grid size-14 place-items-center rounded-full bg-ember text-coal-950">
                <Flame className="size-6" aria-hidden />
              </span>
              <span className="font-display text-sm font-bold uppercase tracking-[0.26em] text-glow">Inclus &amp; offert</span>
            </div>
            <div>
              <p className="font-serif text-2xl leading-snug text-ivory sm:text-[1.75rem]">{category.note}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Accompagnements offerts">
                {SMOKED_MEAT_SIDES.map((side) => (
                  <li key={side} className="rounded-full border border-ivory/15 px-3.5 py-1.5 text-sm capitalize text-cream">
                    {side}
                  </li>
                ))}
                <li className="rounded-full border border-ivory/15 px-3.5 py-1.5 text-sm text-cream">Sauces Meat Love</li>
              </ul>
            </div>
          </Reveal>
        ) : null}
        <div className="mt-10 space-y-6">
          {cuts.map((product, i) => (
            <Reveal key={product.id} delay={i * 80}>
              <ProductCard product={product} variant="feature" priority={i === 0} />
            </Reveal>
          ))}
          <div className="grid gap-6 md:grid-cols-2">
            {others.map((product) => (
              <Reveal key={product.id}>
                <ProductCard product={product} variant="row" className="p-4" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StandardCategory({ category, index }: { category: Category; index: number }) {
  const items = productsIn(category.id);
  const compact = category.id === "boissons" || category.id === "riz";
  return (
    <section id={category.id} aria-label={category.name} className="scroll-mt-40 py-20 sm:py-24">
      <div className={container}>
        <CategoryHeader category={category} index={index} />
        {compact ? (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((product, i) => (
              <Reveal as="li" key={product.id} delay={(i % 3) * 80}>
                <ProductCard product={product} variant="row" />
              </Reveal>
            ))}
          </ul>
        ) : (
          <ul className={cn("mt-10 grid gap-6 sm:grid-cols-2", items.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3")}>
            {items.map((product, i) => (
              <Reveal as="li" key={product.id} delay={(i % 3) * 100}>
                <ProductCard product={product} className="h-full" />
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default function MenuPage() {
  return (
    <>
      <RestaurantJsonLd />
      <header id="carte" className="relative overflow-hidden pt-[calc(var(--header-h)+4rem)] pb-14 sm:pb-20">
        <div aria-hidden className="pointer-events-none absolute -top-40 right-[-15%] h-[36rem] w-[36rem] rounded-full bg-ember/20 blur-[120px]" />
        <div className={cn(container, "relative")}>
          <Reveal>
            <Eyebrow>La carte Meat Love</Eyebrow>
            <h1 className="mt-6 font-display text-[clamp(4rem,14vw,10rem)] leading-[0.82] font-black uppercase">
              Le <span className="font-serif font-normal normal-case italic text-ember-bright">menu</span>
            </h1>
          </Reveal>
          <Reveal delay={120} className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-end">
            <p className="max-w-xl text-lg leading-relaxed text-cream/80">
              Viandes fumées, agneau, burgers, poulet grillé et fumé. Touchez un plat pour le détail, puis
              ajoutez-le à votre commande.
            </p>
            <p className="text-sm text-ash lg:text-right">Prix en dinars algériens (DA).</p>
          </Reveal>
        </div>
      </header>

      <CategoryNav categories={categories} />

      {categories.map((category, index) =>
        category.id === "viandes-fumees" ? (
          <SmokedMeats key={category.id} category={category} index={index} />
        ) : (
          <StandardCategory key={category.id} category={category} index={index} />
        ),
      )}
    </>
  );
}
