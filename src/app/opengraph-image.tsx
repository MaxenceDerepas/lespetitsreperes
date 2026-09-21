import { ImageResponse } from 'next/og';
import { OgCard, loadOgFonts, loadOgLogo, ogContentType, ogSize } from '@/lib/og';

/** Carte de partage par défaut du site. */
export const alt = 'Les Petits Repères — des outils doux pour une vie de famille épanouie';
export const size = ogSize;
export const contentType = ogContentType;

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        logo={await loadOgLogo()}
        eyebrow="Fiches PDF à imprimer"
        title="Des outils doux pour une vie de famille"
        flourish="épanouie"
        subtitle="Routines, émotions, activités, recettes et organisation. Téléchargement immédiat, impression illimitée."
      />
    ),
    { ...size, fonts: await loadOgFonts() },
  );
}
