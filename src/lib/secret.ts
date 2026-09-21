/**
 * Secret de signature des liens de téléchargement et des cookies de session.
 *
 * En développement, une valeur de repli permet de lancer le projet sans rien
 * configurer. En production, cette valeur de repli est publique — elle est
 * dans le code source — donc n'importe qui pourrait fabriquer un lien de
 * téléchargement valide et récupérer les PDF sans payer.
 *
 * On refuse donc catégoriquement de signer quoi que ce soit en production
 * tant que `DOWNLOAD_TOKEN_SECRET` n'est pas défini. Mieux vaut une erreur
 * franche au premier téléchargement qu'une boutique silencieusement ouverte.
 *
 * Générer une valeur :  openssl rand -hex 32
 */

const DEV_FALLBACK = 'dev-secret-a-remplacer-en-production';

/** Valeurs d'exemple qui ne doivent jamais servir de secret réel. */
const PLACEHOLDERS = new Set([DEV_FALLBACK, 'change-moi-en-production', 'changeme', '']);

export function signingSecret(): string {
  const fromEnv = process.env.DOWNLOAD_TOKEN_SECRET;
  if (fromEnv && !PLACEHOLDERS.has(fromEnv.trim())) return fromEnv;

  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'DOWNLOAD_TOKEN_SECRET est absent (ou laissé à la valeur d’exemple). ' +
        'Sans lui, les liens de téléchargement seraient falsifiables. ' +
        'Définissez-le avant de mettre le site en ligne : openssl rand -hex 32',
    );
  }

  return DEV_FALLBACK;
}
