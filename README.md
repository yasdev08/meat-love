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

Aucune photo réelle n'a été fournie. Le site utilise une série d'illustrations au trait propre à la marque
(`components/illustrations/DishArt.tsx`), qui ne prétendent pas représenter les plats réels.

Pour utiliser les vraies photos, il suffit de déposer les fichiers puis de relancer `npm run dev` ou `npm run build` :

- `public/images/menu/<id-produit>.jpg|webp|png|avif` (ex. `smoked-brisket-burger.jpg`, `epaule-agneau.webp` ; les identifiants sont dans `data/menu.ts`)
- `public/images/gallery/*.jpg` : galerie d'ambiance de l'accueil (6 photos max, ordre alphabétique)
- `public/images/hero.jpg` : fond du hero

Le script `scripts/generate-image-manifest.mjs` les détecte automatiquement.

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
