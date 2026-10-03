# Fichiers PDF des produits — dossier privé

Ce dossier contient les fichiers vendus sur la boutique. Il est **volontairement
placé hors de `public/`** : aucun serveur web ne le sert directement.

La seule façon d'accéder à un fichier est la route `/api/download/[token]`, qui
vérifie, dans cet ordre :

1. la signature HMAC-SHA256 du lien (impossible à forger sans le secret serveur) ;
2. la date d'expiration incluse dans le lien ;
3. l'existence de la commande **et** son statut `paid` ;
4. la présence du produit dans cette commande précise ;
5. le compteur de téléchargements de la ligne de commande.

## Ces fichiers sont versionnés — et c'est voulu

Contrairement à l'usage habituel, les PDF de ce dossier **sont committés dans
Git**. C'est ce qui les fait partir avec le déploiement : Vercel n'a pas de
disque persistant, et un fichier absent du dépôt n'existe tout simplement pas en
production.

Deux garde-fous rendent cela sûr :

- `private/` n'est pas `public/` : Next.js ne sert jamais ce dossier en statique,
  quelle que soit l'URL demandée. Les tests de sécurité le vérifient
  (`/private/files/<nom>.pdf` répond 404).
- `outputFileTracingIncludes`, dans `next.config.mjs`, embarque explicitement ce
  dossier dans la fonction `/api/download/[token]` — et seulement dans celle-là.

Être dans le dépôt ne les rend donc pas publics : le dépôt GitHub est privé, et
le site ne les expose que derrière la vérification ci-dessus.

### Ce qu'il faut surveiller

Chaque version d'un PDF reste dans l'historique Git pour toujours. À raison de
quelques méga-octets par correction, le dépôt grossit lentement mais sûrement.
GitHub recommande de rester sous 1 Go ; au rythme actuel il y a de la marge pour
des années. Si le jour vient où le dépôt devient lourd, le passage à un stockage
objet privé ne demande qu'une chose : renseigner les trois variables décrites
plus bas. `src/lib/storage.ts` bascule tout seul.

Côté Vercel, la limite est de 250 Mo décompressés par fonction. Le dossier pèse
aujourd'hui une soixantaine de méga-octets.

## Ajouter un produit

1. Déposer le PDF ici.
2. Renseigner son nom exact dans le champ `file` du produit, dans
   `src/lib/catalog.ts`.
3. Committer le PDF avec le reste.

Le nom du fichier n'apparaît jamais côté navigateur.

## Mettre un PDF à jour

Remplacer le fichier, committer, déployer. Les commandes déjà passées continuent
de fonctionner : elles référencent le nom du fichier, pas son contenu, et
recevront donc la nouvelle version.

## Fichiers de démonstration

`npm run seed:pdf` génère un PDF de test pour les produits qui n'en ont pas
encore. **Le script ignore les fichiers existants** ; `--force` les écrase, donc
à n'utiliser que sur un dossier vide — vos vrais PDF sont ici.

## Passer à un stockage objet, plus tard

`src/lib/storage.ts` lit d'abord ce dossier, et bascule sur un bucket privé dès
que les trois variables suivantes sont renseignées :

```
STORAGE_URL=https://<projet>.supabase.co
STORAGE_BUCKET=produits-pdf
SUPABASE_SERVICE_ROLE_KEY=...
```

Le bucket doit rester privé : la clé de service ne quitte jamais le serveur, et
le fichier est lu puis renvoyé en flux au client, sans jamais exposer son URL.
