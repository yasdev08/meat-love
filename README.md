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
- **Coordonnées du restaurant** : `data/site.ts` (téléphone, horaires, services, réseaux, Google Maps), repris du
  site officiel du restaurant. Une valeur absente est masquée ; rien n'est inventé.
- **Variables d'environnement** (facultatives) :
  - `NEXT_PUBLIC_SITE_URL` : URL publique (SEO, sitemap, Open Graph). Sur Vercel, l'URL de production est utilisée
    automatiquement si cette variable est absente.
  - `NEXT_PUBLIC_WHATSAPP_NUMBER` : numéro WhatsApp international (ex. `+213…`). Active l'envoi de la commande via WhatsApp.
  - `NEXT_PUBLIC_SHOW_SETUP_HINTS=true` : affiche les encarts « à compléter » (informations manquantes).

## Logo

Logo officiel fourni par le restaurant (tête de taureau), décliné dans `public/brand/` :

- `meat-love-logo-light.png` : version claire détourée pour fond sombre (en-tête, hero, pied de page, image de partage)
- `meat-love-logo-badge.png` : pastille ronde d'origine (données structurées)
- `app/icon.png`, `app/apple-icon.png` : icônes du site

Ces fichiers sont extraits d'une capture du logo. Une version vectorielle (SVG/PDF) fournie par le restaurant
donnera un rendu encore plus net.

## Photos

Les fiches produits utilisent des **photos d'illustration** libres de droits issues de
[Pixabay](https://pixabay.com/) (licence Pixabay : usage commercial autorisé, sans attribution obligatoire).
Elles portent la mention « Photo d'illustration » sur le site. Les plats sans photo (riz, boissons, Bouzelouf)
gardent les illustrations au trait de la maison (`components/illustrations/DishArt.tsx`).

Le fond du hero (`public/images/hero.jpg`) et la galerie (`public/images/gallery/`) sont des photos d'ambiance.

**Pour passer aux vraies photos du restaurant**, il suffit de remplacer les fichiers en gardant les mêmes noms,
puis de relancer `npm run build` :

- `public/images/menu/<id-produit>.jpg|webp|png|avif` (identifiants dans `data/menu.ts`)
- `public/images/gallery/*.jpg` (4 photos max, ordre alphabétique)
- `public/images/hero.jpg`

Le script `scripts/generate-image-manifest.mjs` les détecte automatiquement.

Crédits des photos Pixabay :

| Fichier | Photographe |
| --- | --- |
| `smoked-brisket-burger.jpg` | [m_krohn](https://pixabay.com/photos/burger-pulled-pork-grilled-6507710/) |
| `classic-meat-burger.jpg` | [chris_muschard](https://pixabay.com/photos/burger-food-hamburger-meal-bun-6942015/) |
| `chicken-burger.jpg` | [shouravsheikh](https://pixabay.com/photos/burger-spicy-healthy-food-chicken-4307719/) |
| `epaule-agneau.jpg` | [OrcaTec](https://pixabay.com/photos/flesh-poultry-meal-yummy-1450955/) |
| `lamb-tchang.jpg` | [limarga26](https://pixabay.com/photos/lamb-lamb-shank-steak-food-meal-3529588/) |
| `collier-agneau.jpg` | [2SIF](https://pixabay.com/photos/pulao-lamb-chop-pulao-lamb-chop-7262662/) |
| `poulet-fume.jpg` | [maliktabish](https://pixabay.com/photos/saji-roast-chicken-dinner-roasted-4954852/) |
| `plat-poulet-grille.jpg` | [Rierosa222](https://pixabay.com/photos/chicken-steak-menu-food-lunch-2509164/) |
| `pasta-fettuccine-alfredo.jpg` | [NickyZangess](https://pixabay.com/photos/pasta-fettuccine-noodles-cream-9783722/) |
| `soupe-lentilles-corail.jpg` | [Alanyadk](https://pixabay.com/photos/turkish-food-soup-meze-alanya-1379238/) |
| `soupe-champignons.jpg` | [ReinhardThrainer](https://pixabay.com/photos/soup-cream-soup-yummy-fresh-foam-4528707/) |
| `bourek.jpg` | [tarina](https://pixabay.com/photos/borek-turkish-snack-fried-1205461/) |
| `creme-brulee.jpg` | [freestocks-photos](https://pixabay.com/photos/food-drinks-cream-creme-brulee-2940496/) |
| `tiramisu.jpg` | [Slava_web-designer](https://pixabay.com/photos/tiramisu-dessert-cake-food-cream-8503073/) |

## Commande

1. Panier : ajout, packs, quantités, suppression, sous-total, sauvegarde locale (`localStorage`).
2. « Commander » : formulaire (livraison / à emporter / sur place, nom, téléphone algérien validé, adresse si
   livraison, heure souhaitée, remarque). Les coordonnées sont mémorisées pour la commande suivante.
3. Envoi : la messagerie SMS du client s'ouvre avec la commande complète adressée au 0797 98 11 97
   (`sms:`). La commande part quand le client appuie sur « Envoyer ». Boutons « Appeler » et « Copier » en secours.
4. Si `NEXT_PUBLIC_WHATSAPP_NUMBER` est défini, WhatsApp devient le canal principal (SMS en secours).

Le statut « ouvert / fermé » est calculé à l'heure d'Alger ; hors horaires, le formulaire le signale.
Aucun paiement en ligne et aucune fausse confirmation : le site indique clairement que l'envoi se fait depuis
le téléphone du client.

## Déploiement

Aucune configuration d'hébergement n'existait dans le dépôt. Le site est 100 % statique et se déploie tel quel sur
**Vercel** (recommandé pour Next.js) :

1. Importer le dépôt GitHub sur vercel.com (framework détecté automatiquement).
2. Renseigner les variables d'environnement ci-dessus (`NEXT_PUBLIC_SITE_URL` au minimum).
3. Déployer, puis relier le nom de domaine du restaurant.

Toute plateforme qui exécute Node.js 20.9+ convient aussi : `npm run build` puis `npm run start`.
