# Meat Love — site du restaurant

Site vitrine et carte interactive de **Meat Love** (viandes fumées, agneau, burgers, poulet grillé).
Next.js 16 (App Router) · TypeScript strict · Tailwind CSS 4 · Lucide.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
```

Production locale :

```bash
npm run build && npm run start
```

Contrôles qualité :

```bash
npm run lint       # ESLint
npm run typecheck  # types de routes + tsc
npm test           # vérification de la carte (noms, prix, packs, arabe) et du panier
```

## Pages

| Route             | Contenu                                                                 |
| ----------------- | ----------------------------------------------------------------------- |
| `/`               | Accueil : hero, signatures, fumoir & packs, aperçu de la carte, offerts, ambiance, histoire, accès |
| `/menu`           | Carte complète, navigation par catégorie, fiches produit, panier        |
| `/notre-histoire` | Page éditoriale (informations vérifiées uniquement)                     |
| `/contact`        | Coordonnées, horaires, réseaux, carte : affichés uniquement s'ils sont renseignés |

## Où modifier quoi

- **Carte, prix, packs** : `data/menu.ts`, la seule source utilisée par toutes les pages, le panier et les données structurées.
  `tests/menu.test.ts` contient une copie indépendante de la carte officielle : tout écart fait échouer `npm test`.
- **Coordonnées du restaurant** : `data/site.ts` (adresse, téléphone, horaires, réseaux, Google Maps).
  Une valeur laissée à `null` est masquée ; rien n'est inventé.
- **Variables d'environnement** (facultatives) :
  - `NEXT_PUBLIC_SITE_URL` : URL publique (SEO, sitemap, Open Graph). Ex. `https://meatlove.example`
  - `NEXT_PUBLIC_WHATSAPP_NUMBER` : numéro WhatsApp international (ex. `+213…`). Active l'envoi de la commande via WhatsApp.
  - `NEXT_PUBLIC_SHOW_SETUP_HINTS=false` : masque les encarts « à confirmer » destinés à la présentation.

## Photos

Aucune photo réelle n'a été fournie. Le site utilise une série d'illustrations au trait propre à la marque
(`components/illustrations/DishArt.tsx`), qui ne prétendent pas représenter les plats réels.

Pour utiliser les vraies photos, il suffit de déposer les fichiers puis de relancer `npm run dev` ou `npm run build` :

- `public/images/menu/<id-produit>.jpg|webp|png|avif` (ex. `smoked-brisket-burger.jpg`, `epaule-agneau.webp` ; les identifiants sont dans `data/menu.ts`)
- `public/images/gallery/*.jpg` : galerie d'ambiance de l'accueil (6 photos max, ordre alphabétique)
- `public/images/hero.jpg` : fond du hero

Le script `scripts/generate-image-manifest.mjs` les détecte automatiquement.

## Commande

- Le panier est entièrement fonctionnel : ajout, packs, quantités, suppression, sous-total, sauvegarde locale (`localStorage`).
- **Sans numéro WhatsApp configuré**, le panier propose de copier le récapitulatif et indique clairement que la commande
  n'est pas transmise au restaurant.
- **Avec `NEXT_PUBLIC_WHATSAPP_NUMBER`**, le bouton « Commander via WhatsApp » ouvre WhatsApp avec un message pré-rempli
  (articles, quantités, packs, prix, total). La commande n'est transmise qu'une fois le message envoyé par le client.
- Aucun paiement en ligne et aucun faux écran de confirmation.

## Déploiement

Aucune configuration d'hébergement n'existait dans le dépôt. Le site est 100 % statique et se déploie tel quel sur
**Vercel** (recommandé pour Next.js) :

1. Importer le dépôt GitHub sur vercel.com (framework détecté automatiquement).
2. Renseigner les variables d'environnement ci-dessus (`NEXT_PUBLIC_SITE_URL` au minimum).
3. Déployer, puis relier le nom de domaine du restaurant.

Toute plateforme qui exécute Node.js 20.9+ convient aussi : `npm run build` puis `npm run start`.
