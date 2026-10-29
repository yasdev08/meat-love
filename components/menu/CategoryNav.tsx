"use client";

import { useEffect, useRef, useState } from "react";
import type { Category } from "@/data/menu";
import { cn } from "@/lib/cn";

/** Navigation des catégories, collante, avec suivi de la section visible. */
export function CategoryNav({ categories }: { categories: readonly Category[] }) {
  const [active, setActive] = useState(categories[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id as Category["id"]);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [categories]);

  // Garde la puce active visible dans la barre défilante (mobile).
  useEffect(() => {
    const list = listRef.current;
    const chip = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !chip) return;
    const left = chip.offsetLeft - list.clientWidth / 2 + chip.clientWidth / 2;
    list.scrollTo({ left, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="Catégories du menu"
      className="sticky top-[var(--header-h)] z-40 border-y border-ivory/10 bg-coal-950/85 backdrop-blur-xl"
    >
      <ul ref={listRef} className="no-scrollbar mx-auto flex max-w-[88rem] gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-10">
        {categories.map((category) => {
          const isActive = category.id === active;
          return (
            <li key={category.id} data-id={category.id} className="shrink-0">
              <a
                href={`#${category.id}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => setActive(category.id)}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full border px-5 font-display text-[0.95rem] font-bold uppercase tracking-[0.14em] whitespace-nowrap transition-colors duration-300",
                  isActive ? "border-ember bg-ember text-coal-950" : "border-ivory/15 text-cream hover:border-ivory/40 hover:text-ivory",
                )}
              >
                {category.name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
