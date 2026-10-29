"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { navLinks } from "./nav";
import { Wordmark } from "./Wordmark";
import { CartButton } from "@/components/cart/CartButton";
import { OrderButton } from "@/components/cart/OrderButton";
import { Sheet } from "@/components/ui/Sheet";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#contenu"
        className="fixed top-3 left-3 z-[70] -translate-y-24 rounded-full bg-ember px-5 py-3 font-display font-bold uppercase tracking-wider text-coal-950 focus:translate-y-0"
      >
        Aller au contenu
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled || menuOpen
            ? "border-b border-ivory/10 bg-coal-950/80 backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-coal-950/70 to-transparent",
        )}
      >
        <div className="mx-auto flex h-[var(--header-h)] max-w-[88rem] items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
          <Link href="/" className="shrink-0 rounded-md text-ivory" aria-label="Meat Love — accueil">
            <Wordmark priority className="h-12 transition-transform duration-500 ease-out-expo hover:scale-105 sm:h-[3.25rem] lg:h-14" />
          </Link>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative inline-flex min-h-11 items-center px-4 font-display text-[1.05rem] font-semibold uppercase tracking-[0.16em] transition-colors",
                        active ? "text-ivory" : "text-ash hover:text-ivory",
                      )}
                    >
                      {link.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-4 bottom-1.5 h-px origin-left bg-ember transition-transform duration-500 ease-out-expo",
                          active ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:block">
              <OrderButton>Commander</OrderButton>
            </div>
            <CartButton />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="grid size-12 place-items-center rounded-full border border-ivory/15 text-ivory transition-colors hover:border-ivory/50 lg:hidden"
              aria-label="Ouvrir le menu de navigation"
              aria-expanded={menuOpen}
            >
              <MenuIcon className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <Sheet open={menuOpen} onClose={() => setMenuOpen(false)} side="right" labelledBy="mobile-nav-title">
        <div className="relative flex h-full flex-col overflow-hidden px-6 pt-5 pb-[max(2rem,env(safe-area-inset-bottom))]">
          <div aria-hidden className="pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full bg-ember/20 blur-3xl" />
          <div className="flex items-center justify-between">
            <h2 id="mobile-nav-title" className="sr-only">
              Navigation
            </h2>
            <Wordmark className="h-14" />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="grid size-11 place-items-center rounded-full text-ash hover:bg-ivory/5 hover:text-ivory"
              aria-label="Fermer le menu de navigation"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>
          <nav aria-label="Navigation mobile" className="mt-14">
            <ul className="space-y-1">
              {navLinks.map((link, i) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-baseline gap-4 py-3 font-display text-5xl font-extrabold uppercase transition-colors",
                        active ? "text-ivory" : "text-ivory/55 hover:text-ivory",
                      )}
                    >
                      <span className="font-sans text-sm font-medium tabular-nums text-ember-bright">0{i + 1}</span>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="relative mt-auto space-y-4">
            <p className="font-serif text-2xl text-cream/80 italic">Le feu. La viande. L&apos;amour.</p>
            <OrderButton className="w-full" onClick={() => setMenuOpen(false)}>
              Commander
            </OrderButton>
          </div>
        </div>
      </Sheet>
    </>
  );
}
