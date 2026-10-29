import Link from "next/link";
import { categories } from "@/data/menu";
import { site } from "@/data/site";
import { navLinks } from "./nav";
import { Wordmark } from "./Wordmark";
import { SocialIcon, socialLabel } from "./SocialIcon";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-ivory/10 bg-coal-950">
      <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[70rem] -translate-x-1/2 rounded-[100%] bg-ember/15 blur-3xl" />
      <div className="relative mx-auto max-w-[88rem] px-4 pt-20 pb-10 sm:px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Wordmark className="h-28 sm:h-32" />
            <p className="mt-6 font-serif text-3xl leading-tight italic text-cream">Le feu. La viande. L&apos;amour.</p>
            <p className="mt-4 text-ash">Produits frais du jour, pain brioché maison et braise allumée à midi.</p>
          </div>

          <nav aria-label="Pied de page">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.3em] text-ember-bright">Navigation</h2>
            <ul className="mt-5 space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex min-h-10 items-center text-cream/80 transition-colors hover:text-ivory">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.3em] text-ember-bright">La carte</h2>
            <ul className="mt-5 space-y-1">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/menu#${category.id}`}
                    className="inline-flex min-h-10 items-center text-cream/80 transition-colors hover:text-ivory"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.3em] text-ember-bright">Nous trouver</h2>
            <ul className="mt-5 space-y-3 text-cream/80">
              {site.address ? (
                <li>
                  {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.city}
                </li>
              ) : null}
              {site.phone ? (
                <li>
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-ivory">
                    {site.phone}
                  </a>
                </li>
              ) : null}
              <li>
                <Link href="/contact" className="inline-flex min-h-10 items-center underline-offset-4 hover:text-ivory hover:underline">
                  Contact &amp; accès
                </Link>
              </li>
            </ul>
            {site.socials.length > 0 ? (
              <ul className="mt-6 flex gap-3">
                {site.socials.map((social) => (
                  <li key={social.url}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid size-11 place-items-center rounded-full border border-ivory/15 text-cream transition-colors hover:border-ember hover:text-ember-bright"
                      aria-label={`${site.name} sur ${socialLabel[social.network]}`}
                    >
                      <SocialIcon network={social.network} className="size-5" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <div aria-hidden className="mt-20 select-none overflow-hidden">
          <p className="font-display text-[clamp(4rem,19vw,18rem)] leading-[0.8] font-black tracking-tight text-ivory/[0.04] uppercase">
            Meat Love
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-ivory/10 pt-6 text-sm text-smoke sm:flex-row sm:items-center sm:justify-between">
          <p>© Meat Love. Tous droits réservés.</p>
          <p>Prix en dinars algériens (DA).</p>
        </div>
      </div>
    </footer>
  );
}
