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

## Ajouter un produit

1. Déposer le PDF ici.
2. Renseigner son nom exact dans le champ `file` du produit, dans
   `src/lib/catalog.ts`.

Le nom du fichier n'apparaît jamais côté navigateur.

## Fichiers de démonstration

`npm run seed:pdf` génère un PDF de test par produit pour que le parcours
d'achat soit utilisable immédiatement. Ajouter `--force` pour écraser.

Ces fichiers de test sont ignorés par Git (voir `.gitignore`) : vos vrais PDF ne
seront donc jamais poussés par accident dans le dépôt.

## En production

Pour un hébergement sans disque persistant (Vercel, par exemple), utiliser un
bucket **privé** et renseigner dans `.env.local` :

```
STORAGE_URL=https://<projet>.supabase.co
STORAGE_BUCKET=produits-pdf
SUPABASE_SERVICE_ROLE_KEY=...
```

Le bucket doit rester privé : la clé de service ne quitte jamais le serveur, et
`src/lib/storage.ts` lit le fichier puis le renvoie en flux au client.
