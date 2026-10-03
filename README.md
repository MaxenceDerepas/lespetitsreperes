# Les Petits Repères

Boutique en ligne de fichiers PDF à imprimer pour accompagner le quotidien des
familles — routines, rituels, émotions, activités, recettes et outils
d'organisation.

> « Des outils doux et concrets pour une vie de famille plus sereine. »

---

## Démarrer

```bash
npm install
npm run dev          # http://localhost:3000
```

Un `.env.local` est déjà présent, avec un secret de signature généré pour vous,
et les PDF de démonstration sont déjà dans `private/files/` — il n'y a rien à
configurer pour voir le site tourner. (`npm run seed:pdf` les régénère au
besoin, `.env.example` documente toutes les variables.)

Le site **fonctionne immédiatement, sans aucune clé d'API**. Tout ce qui n'est
pas configuré bascule automatiquement en mode démonstration :

| Absent de `.env.local` | Comportement |
| --- | --- |
| `STRIPE_SECRET_KEY` | Le paiement est simulé : la commande est enregistrée comme payée, les téléchargements fonctionnent, aucun débit réel. |
| `EMAIL_API_KEY` | Les emails sont écrits dans la console du serveur au lieu d'être envoyés. |
| `DATABASE_URL` | Les commandes sont stockées dans `./.data/orders.json`. |
| `STORAGE_URL` | Les PDF sont lus depuis `./private/files/` — c'est le mode normal, voir « Où sont les PDF ». |
| `ADMIN_PASSWORD` | L'espace `/admin` reste fermé. |

Chaque bascule est signalée dans l'interface, pour qu'aucun mode démonstration
ne passe inaperçu en production.

---

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 3.4** — palette et typographies dans `tailwind.config.ts`
- **Stripe Checkout** pour le paiement (aucune donnée bancaire sur ce site)
- **Resend** (ou tout équivalent) pour les emails transactionnels
- Aucune autre dépendance : illustrations en SVG, markdown du blog rendu par un
  convertisseur maison de 60 lignes, panier en React Context.

Le poids du JavaScript partagé est d'environ 102 kB, et toutes les pages
publiques sont pré-rendues statiquement.

---

## Structure

```
src/
├── app/
│   ├── page.tsx                      Accueil
│   ├── boutique/                     Boutique + fiche produit [slug]
│   ├── categories/                   Liste + page de catégorie [slug]
│   ├── panier/                       Panier
│   ├── commande/                     Paiement + confirmation
│   ├── telechargements/[orderId]/    Page de téléchargement (lien de l'email)
│   ├── compte/                       Espace client (commandes, factures, fichiers)
│   ├── connexion/                    Connexion par lien email
│   ├── blog/                         Journal + article [slug]
│   ├── a-propos, contact, faq/       Pages éditoriales
│   ├── cgv, confidentialite,
│   │   mentions-legales/             Pages légales
│   ├── admin/                        Administration
│   └── api/                          checkout, promo, webhook Stripe,
│                                     download, contact, newsletter
├── components/                       Composants d'interface et illustrations SVG
└── lib/
    ├── catalog.ts                    Produits et catégories  ← à éditer
    ├── blog.ts                       Articles                ← à éditer
    ├── faq.ts, testimonials.ts       Contenus éditoriaux     ← à éditer
    ├── promo.ts                      Codes promotionnels     ← à éditer
    ├── site.ts                       Marque, coordonnées, mentions légales
    ├── orders.ts                     Persistance des commandes
    ├── tokens.ts                     Liens de téléchargement signés
    ├── storage.ts                    Accès au stockage privé des PDF
    ├── stripe.ts, email.ts, auth.ts  Intégrations
private/files/                        Les PDF vendus (jamais servis directement)
scripts/generate-demo-pdfs.mjs        Générateur de PDF de démonstration
```

---

## Ajouter un produit

1. Déposer le PDF dans `private/files/`.
2. Dupliquer un bloc dans le tableau `products` de `src/lib/catalog.ts`, puis
   ajuster : `slug`, `name`, `priceCents` (en centimes), `category`, `type`,
   `ages`, `pages`, `format`, `description`, `contents`, `motif`, `accent`,
   `file`.
3. C'est tout : la boutique, les filtres, le plan du site, les données
   structurées et les visuels produits se mettent à jour automatiquement.

`motif` choisit l'illustration (`leaf`, `sun`, `heart`, `star`, `house`,
`palette`, `chef`, `tools`, `gift`) et `accent` la teinte (`sage`,
`terracotta`, `gold`, `peach`, `sand`, `sageLight`). Le visuel du produit — les
quatre vues de la fiche produit — est généré à partir de ces deux valeurs.

---

## Activer les paiements réels

1. Créer un compte Stripe, récupérer les clés de test sur
   <https://dashboard.stripe.com/test/apikeys>.
2. Les renseigner dans `.env.local` :
   ```
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```
3. Écouter le webhook en local :
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
   Copier le `whsec_...` affiché dans `STRIPE_WEBHOOK_SECRET`.
4. Tester avec la carte `4242 4242 4242 4242`, n'importe quelle date future et
   n'importe quel CVC.

Le webhook est la **seule** source de vérité du paiement : la page de retour du
client ne délivre rien par elle-même. Les prix et les codes promo sont
systématiquement recalculés côté serveur depuis le catalogue — un panier
modifié dans le navigateur ne change pas le montant facturé.

En production, déclarer le endpoint `https://votre-domaine.fr/api/stripe/webhook`
dans le tableau de bord Stripe, sur les événements
`checkout.session.completed`, `checkout.session.expired`,
`payment_intent.payment_failed` et `charge.refunded`.

---

## Sécurité des fichiers

Les PDF ne sont jamais accessibles par une URL publique.

Un lien de téléchargement est une chaîne signée en HMAC-SHA256 contenant
l'identifiant de commande, l'identifiant du produit et une date d'expiration.
Il est donc :

- **impossible à deviner** — 256 bits de signature dérivés d'un secret serveur ;
- **infalsifiable** — modifier l'expiration invalide la signature ;
- **temporaire** — `DOWNLOAD_LINK_TTL_HOURS`, 72 h par défaut ;
- **lié à une commande** — aucun accès croisé entre clients ;
- **non indexable** — `X-Robots-Tag: noindex` et `Cache-Control: no-store`.

À chaque appel, `/api/download/[token]` revérifie la signature, l'expiration, le
statut `paid` de la commande, la présence du produit dans cette commande et le
compteur de téléchargements (`DOWNLOAD_MAX_COUNT`, 10 par défaut ; `0` pour
illimité).

Un lien expiré ne bloque jamais l'accès : un lien neuf est généré à chaque
affichage de l'espace client.

### Trois verrous, pas un seul

1. **Le fichier** — les PDF vivent dans `private/files/` (ou un bucket privé),
   jamais dans `public/`. Aucune URL ne les atteint directement.
2. **Le lien** — seul `/api/download/[token]` sert un fichier, et seulement
   après les cinq vérifications ci-dessus.
3. **L'affichage** — `DownloadList` refuse de fabriquer un lien tant que la
   commande n'est pas `paid`, et `sendOrderEmail` refuse de partir. Même une
   page ajoutée plus tard ne peut pas laisser fuiter un lien par distraction.

Et surtout : **c'est le webhook Stripe qui décide qu'une commande est payée**,
jamais la page de retour du client, qui peut être ouverte, rechargée ou
fabriquée à la main.

### Où sont les PDF

**Dans le dépôt, sous `private/files/`, et c'est voulu.** Vercel n'a pas de
disque persistant : un fichier absent du dépôt n'existe pas en production. Les
PDF sont donc versionnés et embarqués dans la fonction de téléchargement par
`outputFileTracingIncludes` (`next.config.mjs`).

Être dans le dépôt ne les rend pas publics. `private/` n'est pas `public/` :
Next.js ne sert jamais ce dossier en statique, et la suite de sécurité vérifie
qu'un appel direct à `/private/files/<nom>.pdf` répond 404. Le dépôt GitHub est
privé, et le seul chemin vers un fichier reste `/api/download/[token]`, avec sa
signature, son expiration, sa vérification de commande payée et son compteur.

Ce que cela coûte : ajouter ou corriger un PDF demande un commit et un
déploiement, et chaque version reste dans l'historique Git. À quelques
méga-octets par correction, et avec une recommandation GitHub de rester sous
1 Go, il y a de la marge pour des années. La limite Vercel est de 250 Mo
décompressés par fonction ; le dossier pèse aujourd'hui une soixantaine de
méga-octets.

| Hébergement | PDF dans le dépôt | Bucket privé (Supabase, S3…) |
| --- | --- | --- |
| Vercel, Netlify (serverless) | ✅ en place — aucun service externe, aucun coût | possible, utile seulement si le dépôt devient lourd |
| VPS, serveur dédié, o2switch, Coolify… | ✅ fonctionne aussi — pensez à la sauvegarde | possible, inutile |

Le jour où le dépôt deviendrait trop lourd, la bascule tient en trois variables :
`STORAGE_URL`, `STORAGE_BUCKET` et `SUPABASE_SERVICE_ROLE_KEY`.
`src/lib/storage.ts` les détecte tout seul et retombe sur le disque local si la
lecture distante échoue. Le bucket devra être **privé** — un bucket public
annulerait tout le dispositif.

⚠️ Ce choix suppose un **dépôt privé**. Si le dépôt devait un jour être rendu
public, il faudrait d'abord sortir les PDF de l'historique.

Enfin, les PDF ne sont qu'une moitié du problème : `.data/orders.json` ne
survit pas non plus à un déploiement. Il faut une vraie base avant d'ouvrir la
vente (section « Passer sur une base de données »).

### Le secret de signature

Sans `DOWNLOAD_TOKEN_SECRET`, la signature retomberait sur une valeur de
développement présente dans le code source — donc publique, donc falsifiable.
`src/lib/secret.ts` refuse catégoriquement de signer en production tant que la
variable n'est pas définie (ou si elle est restée à la valeur d'exemple) :

```bash
openssl rand -hex 32   # → DOWNLOAD_TOKEN_SECRET
```

### Tests

`node tests/securite.mjs` (serveur lancé sur le port indiqué en tête du
fichier) rejoue 23 contrôles : accès direct aux PDF, traversée de répertoire,
token forgé, signature modifiée, produit substitué, expiration rallongée,
commande inexistante, lien expiré, **commande non payée**, limite de
téléchargements, espace client et administration, robots.txt.

---

## Passer sur une base de données

`src/lib/orders.ts` est le seul fichier à réécrire. Le schéma correspondant :

```sql
create table orders (
  id                text primary key,
  reference         text not null unique,
  email             text not null,
  first_name        text,
  last_name         text,
  subtotal_cents    integer not null,
  discount_cents    integer not null default 0,
  total_cents       integer not null,
  promo_code        text,
  status            text not null default 'pending',
  stripe_session_id text,
  demo              boolean not null default false,
  newsletter        boolean not null default false,
  created_at        timestamptz not null default now(),
  paid_at           timestamptz
);

create table order_items (
  order_id    text not null references orders(id) on delete cascade,
  product_id  text not null,
  slug        text not null,
  name        text not null,
  price_cents integer not null,
  quantity    integer not null default 1,
  file        text not null,
  downloads   integer not null default 0,
  primary key (order_id, product_id)
);

create index orders_email_idx on orders (email);
```

Le catalogue peut rester en TypeScript (c'est plus rapide, versionné et
suffisant pour une petite boutique) ; si vous le passez en base, seules les
fonctions d'accès en bas de `src/lib/catalog.ts` sont à réécrire.

---

## Authentification

L'espace client utilise un lien de connexion envoyé par email (« lien
magique ») : aucun mot de passe à créer, à retenir ni à stocker. Le cookie de
session est `httpOnly`, signé, valable 30 jours.

Pour passer à Auth.js ou Supabase Auth, seule la fonction `getSessionEmail()`
de `src/lib/auth.ts` est à réécrire : tout le site passe par elle.

---

## Le logo

Le fichier de référence est `public/marque/logo.png` — le médaillon original,
détouré pour se poser sur n'importe quel fond du site. Les variantes
(`logo-512.png`, `logo-256.png`, `logo-fond-ivoire.png`) en sont dérivées.

Il est affiché tel quel par `src/components/Logo.tsx` : **jamais redessiné,
jamais recoloré, jamais recomposé en texte**. Pour le remplacer, il suffit de
déposer un nouveau fichier au même endroit.

Deux exceptions, où le médaillon complet serait illisible :

- le favicon (`src/app/icon.svg`), qui reprend le soleil levant seul ;
- `LogoMark`, le même soleil en SVG, utilisé sur la facture imprimable.

---

## Le bandeau d'accueil

`src/components/HeroBanner.tsx` reprend le visuel fourni par la cliente.

Les deux photos (`public/bandeau/gauche.jpg` et `droite.jpg`) sont découpées
dans le visuel d'origine ; **tout le reste est du texte HTML** : le titre, les
quatre promesses, les familles de fiches, la phrase de la pastille rose et la
barre de bénéfices. Poser simplement l'image entière aurait coûté cher — un
titre en pixels n'est lu ni par Google, ni par un lecteur d'écran, et un
bandeau de 2242 × 886 devient une bande de 90 px sur un téléphone.

Deux retouches ont été faites sur les photos, à conserver si elles sont
regénérées : la pastille rose de droite a été effacée (elle est redessinée en
CSS pour rester centrée sur sa phrase à toutes les largeurs), et le texte
d'origine a été retiré du fond.

Sous 1024 px, les photos disparaissent et le contenu se recentre : c'est voulu,
une photo de 17 rem n'apporte rien sur un écran de téléphone.

Un bouton « Découvrir la boutique » a été ajouté sous le bandeau. Il n'est pas
dans le visuel d'origine, mais un accueil sans porte d'entrée vers la boutique
fait perdre des ventes.

---

## Les titres du site

Tous les titres passent par **une seule classe**, `.title` dans
`src/app/globals.css` : la typographie manuscrite du bandeau d'accueil
(Dancing Script), en vert sauge. Pour changer l'allure des titres de tout le
site, il n'y a que cet endroit à modifier.

Les tailles correspondantes (`display-sm` à `display-xl` dans
`tailwind.config.ts`) sont calibrées pour cette fonte : une écriture liée a
une hauteur d'œil plus petite qu'un serif, il lui faut environ 18 % de corps
en plus et des interlignes plus larges, sinon les jambages d'une ligne
touchent la ligne suivante.

Trois rôles typographiques, repris tels quels du bandeau d'accueil :

| Fonte | Usage |
| --- | --- |
| Dancing Script | tous les titres et sous-titres |
| Cormorant Garamond | la ligne d'accroche en capitales, et les prix |
| Nunito Sans | tout le texte courant, les boutons, la navigation |

Les prix restent en serif volontairement : une écriture manuscrite rend mal
les chiffres, et un montant doit se lire sans hésitation.

---

## Direction artistique

| Rôle | Couleur |
| --- | --- |
| Fond principal | `#FEFBF6` ivoire |
| Vert sauge (titres, navigation, icônes) | `#788568` |
| Vert doux | `#A5AE8A` |
| Terracotta (boutons, prix, accents) | `#D98262` |
| Pêche | `#F3D5C4` |
| Beige sable | `#E8D8C5` |
| Doré | `#D9A45B` |
| Brun chaud (texte) | `#66584B` |
| Gris beige (texte secondaire) | `#91877B` |
| Moutarde (soleil, étoiles) | `#E8B44A` |
| Corail (cœurs, émotions) | `#E8837C` |
| Lilas (accents) | `#B9A7D6` |
| Rose poudré (encarts) | `#FBEEEA` |

Typographies : **Cormorant Garamond** pour les titres, **Nunito Sans** pour le
texte, **Caveat** pour quelques accents décoratifs uniquement — jamais pour un
paragraphe ni une information importante.

Les trois polices sont **livrées avec le projet** (`src/app/fonts/`, 176 Ko de
.woff2, sous-ensemble latin) et servies par `next/font/local`. Aucune requête
vers Google depuis le navigateur du visiteur — ce qui règle au passage la
question soulevée par la CNIL à propos de Google Fonts — et le projet se
construit sans accès à Internet.

Pour changer une police : déposer le `.woff2` dans `src/app/fonts/` et mettre le
chemin à jour dans `src/app/fonts.ts`.

Toutes les illustrations sont des SVG écrits à la main dans `src/components/` —
aucune image bitmap, aucune banque d'images :

- `Logo.tsx` — le nom en trois couleurs, le soleil, la brindille, le cadre ovale ;
- `CategoryIcons.tsx` — les icônes illustrées et colorées des catégories ;
- `Illustrations.tsx` — la scène du hero (affiche encadrée, eucalyptus, tasse,
  fiche imprimée, carnets, panier) et le visuel de la page « À propos » ;
- `ProductVisual.tsx` — les mockups des fiches. La mise en page dépend du motif
  du produit : liste de routine, tableau d'émotions, planning de la semaine,
  cartes à découper, recette, pack — et le titre dessiné reprend le nom du
  produit, en manuscrit puis en capitales.

---

## Accessibilité et SEO

- Structure sémantique, un seul `h1` par page, hiérarchie de titres cohérente.
- Navigation complète au clavier, `focus-visible` visible partout, lien
  d'évitement vers le contenu.
- `aria-expanded`, `aria-controls` et `aria-current` sur les composants
  interactifs ; `role="alert"` sur les messages d'erreur.
- Contrastes vérifiés automatiquement : **tous les textes du site passent le
  niveau AA du WCAG**. Deux couleurs de la charte ont dû être assombries pour
  cela — le gris beige des textes secondaires, et le terracotta dès qu'il porte
  du texte ou remplit un bouton. Les valeurs d'origine restent disponibles et
  commentées dans `tailwind.config.ts`.
- `prefers-reduced-motion` respecté : toutes les animations sont désactivées.
- Données structurées : `OnlineStore` (avec `logo` et `image`), `WebSite` +
  `SearchAction`, `Product` (avec `image`, `priceValidUntil`, `AggregateRating`
  et `Review`), `ItemList` sur la boutique et les catégories, `BlogPosting`
  (avec `image`), `FAQPage`, `BreadcrumbList`.
- `sitemap.xml` et `robots.txt` générés ; panier, paiement, compte,
  téléchargements et administration exclus de l'indexation.
- **Titres et descriptions calibrés** : titre ≤ 60 caractères, description
  entre 120 et 158. Les pages générées (produits, articles, catégories)
  passent par `src/lib/seo.ts`, qui coupe sur un mot entier et n'ajoute le nom
  de la marque que s'il reste de la place.
- **Images de partage** générées à la volée en 1200 × 630 (`src/lib/og.tsx`) :
  une par produit, par article et par catégorie, plus une carte par défaut.
  Elles servent aussi d'`image` aux données structurées — sans elle, Google
  refuse les résultats enrichis produit.
- L'audit `node tests/seo.mjs` remonte **0 point à corriger** sur les 13 pages
  publiques.

---

## Scripts

| Commande | Effet |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm start` | Serveur de production |
| `npm run lint` | ESLint (règles Next.js, Core Web Vitals et accessibilité JSX) |
| `npm run typecheck` | Vérification TypeScript sans émission |
| `npm run seed:pdf` | Génère les PDF de démonstration |
| `node tests/securite.mjs` | 23 contrôles de sécurité du téléchargement |
| `node tests/seo.mjs` | Audit SEO des pages publiques |

---

## À faire avant la mise en ligne

Fait :

- [x] SIRET, SIREN, adresse et gérante renseignés dans `src/lib/site.ts`
- [x] CGV, mentions légales et politique de confidentialité fournies par
      l'éditrice ; `LegalNotice` supprimé
- [x] Vrais PDF en place, recompressés (220 Mo → 40 Mo)
- [x] Avis produits vérifiés (achat obligatoire, modération dans /admin)
- [x] Instagram et adresse de contact renseignés

Reste à faire, du plus bloquant au moins urgent :

- [ ] **Stripe** : `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`,
      `STRIPE_WEBHOOK_SECRET`. Sans elles, le tunnel va au bout sans débit.
- [ ] **Envoi des emails** : `EMAIL_API_KEY` (Resend) et un domaine vérifié
      chez eux ; `EMAIL_FROM` doit être une adresse de ce domaine, pas Gmail.
- [ ] **Stockage privé des PDF** : `STORAGE_URL`, `STORAGE_BUCKET`,
      `SUPABASE_SERVICE_ROLE_KEY`. En hébergement serverless, `private/files/`
      n'est pas déployé et le disque n'est pas inscriptible.
- [ ] **Base de données** : `DATABASE_URL`, puis remplacer le corps de
      `orders.ts`, `accounts.ts` et `reviews.ts` par des requêtes SQL. Les
      fichiers JSON de `.data/` sont perdus à chaque déploiement.
- [ ] `DOWNLOAD_TOKEN_SECRET` : en générer un pour la production
      (`openssl rand -hex 32`), différent de celui de développement.
- [ ] `ADMIN_PASSWORD` : sans lui, `/admin` reste fermé et les avis ne
      peuvent pas être publiés.
- [ ] `NEXT_PUBLIC_SITE_URL` sur le domaine de production.
- [ ] Remplacer les sept témoignages de `src/lib/testimonials.ts`, qui sont
      inventés, par de vrais retours — ou supprimer la section.
- [ ] Supprimer les PDF de démonstration restants dans `private/files/`
      (`cartes-activites-calmes.pdf`, `rituel-du-soir.pdf`, `semainier-famille.pdf`,
      `routine-du-matin.pdf`, `tableau-des-emotions.pdf`,
      `tableau-des-petites-missions.pdf`, `pack-complet-famille-sereine.pdf`).
- [ ] Pages légales : elles désignent Systeme.io comme hébergeur et comme
      site. À corriger si c'est ce site-ci qui est mis en ligne.
- [ ] Adhérer à un médiateur de la consommation et renseigner son nom dans
      les CGV (obligatoire pour vendre à des particuliers).
