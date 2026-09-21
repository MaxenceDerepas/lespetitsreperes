import type { Motif } from '@/lib/types';

/**
 * Icônes illustrées des catégories.
 *
 * Contrairement au jeu d'icônes d'interface (traits fins, monochromes), ces
 * illustrations sont pleines et colorées : ce sont elles qui donnent le côté
 * « papeterie » de la page d'accueil. Chaque catégorie a sa teinte, prise dans
 * la palette de la marque, avec un contour brun chaud très léger qui les
 * rattache les unes aux autres.
 *
 * Grille 48 × 48, dessinées pour être lisibles dès 32 px.
 */

type Props = { size?: number; className?: string };

function Frame({ size = 44, className = '', children }: Props & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {children}
    </svg>
  );
}

/** Routines — une petite maison au toit terracotta. */
export function HouseIllustration(props: Props) {
  return (
    <Frame {...props}>
      <path d="M8 22.5 24 9l16 13.5" fill="#D98262" />
      <path d="M6.5 23.2 24 8.2l17.5 15" stroke="#C4694A" strokeWidth="2.4" strokeLinejoin="round" fill="none" />
      <path d="M11 22.8h26V38a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2z" fill="#F6E7D8" />
      <path d="M11 22.8h26V38a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2z" stroke="#C9A78C" strokeWidth="1.6" />
      <path d="M20 40v-7.4a4 4 0 0 1 8 0V40z" fill="#A5AE8A" />
      <path d="M20 40v-7.4a4 4 0 0 1 8 0V40" stroke="#788568" strokeWidth="1.4" fill="none" />
      <circle cx="26.6" cy="35.6" r="0.9" fill="#F6E7D8" />
      <path d="M31 13.5h3.4v5.2L31 16z" fill="#C4694A" />
    </Frame>
  );
}

/** Rituels — une étoile moutarde. */
export function StarIllustration(props: Props) {
  return (
    <Frame {...props}>
      <path
        d="M24 7.5 29 19l12.4 1-9.4 8.2 2.9 12.2L24 34l-10.9 6.4L16 28.2 6.6 20 19 19z"
        fill="#E8B44A"
      />
      <path
        d="M24 7.5 29 19l12.4 1-9.4 8.2 2.9 12.2L24 34l-10.9 6.4L16 28.2 6.6 20 19 19z"
        stroke="#C08F2C"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M20.5 22.5a5 5 0 0 0 7 0" stroke="#C08F2C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </Frame>
  );
}

/** Émotions — un cœur corail. */
export function HeartIllustration(props: Props) {
  return (
    <Frame {...props}>
      <path
        d="M24 41S7 31 7 19.8A8.4 8.4 0 0 1 24 16a8.4 8.4 0 0 1 17 3.8C41 31 24 41 24 41Z"
        fill="#E8837C"
      />
      <path
        d="M24 41S7 31 7 19.8A8.4 8.4 0 0 1 24 16a8.4 8.4 0 0 1 17 3.8C41 31 24 41 24 41Z"
        stroke="#B1443C"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M14.5 19.5c.6-2.4 2.3-3.9 4.8-4.2" stroke="#FBE0DC" strokeWidth="2.2" strokeLinecap="round" />
    </Frame>
  );
}

/** Activités — une palette de peinture. */
export function PaletteIllustration(props: Props) {
  return (
    <Frame {...props}>
      <path
        d="M24 7c9.4 0 17 6.6 17 15.2 0 4.4-3.4 7.6-7.6 7.6h-3.2c-2 0-3.4 1.2-3.4 3 0 1.6 1.4 2.6 1.4 4.6 0 2-1.4 3.6-4.2 3.6C13.6 41 7 33.4 7 24S13.6 7 24 7Z"
        fill="#F6E7D8"
      />
      <path
        d="M24 7c9.4 0 17 6.6 17 15.2 0 4.4-3.4 7.6-7.6 7.6h-3.2c-2 0-3.4 1.2-3.4 3 0 1.6 1.4 2.6 1.4 4.6 0 2-1.4 3.6-4.2 3.6C13.6 41 7 33.4 7 24S13.6 7 24 7Z"
        stroke="#C9A78C"
        strokeWidth="1.8"
        fill="none"
      />
      <circle cx="16" cy="17.5" r="2.7" fill="#E8837C" />
      <circle cx="24.5" cy="14" r="2.7" fill="#E8B44A" />
      <circle cx="32.5" cy="18" r="2.7" fill="#A5AE8A" />
      <circle cx="14.5" cy="27" r="2.7" fill="#B9A7D6" />
    </Frame>
  );
}

/** Recettes — une toque de cuisinier. */
export function ChefIllustration(props: Props) {
  return (
    <Frame {...props}>
      <path
        d="M12.5 26a6.8 6.8 0 0 1 1.4-13 7.2 7.2 0 0 1 13.2-2.6A6.8 6.8 0 0 1 35.5 26z"
        fill="#FDF7EF"
      />
      <path
        d="M12.5 26a6.8 6.8 0 0 1 1.4-13 7.2 7.2 0 0 1 13.2-2.6A6.8 6.8 0 0 1 35.5 26z"
        stroke="#C9A78C"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M12.5 26h23v5.6h-23z" fill="#A5AE8A" />
      <path d="M12.5 26h23v5.6h-23z" stroke="#788568" strokeWidth="1.6" fill="none" />
      <path d="M14.8 31.6 15.6 40h16.8l.8-8.4" fill="#FDF7EF" />
      <path d="M14.8 31.6 15.6 40h16.8l.8-8.4" stroke="#C9A78C" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
    </Frame>
  );
}

/** Outils — une petite mallette. */
export function ToolsIllustration(props: Props) {
  return (
    <Frame {...props}>
      <rect x="6.5" y="17" width="35" height="22" rx="3" fill="#E8B44A" />
      <rect x="6.5" y="17" width="35" height="22" rx="3" stroke="#C08F2C" strokeWidth="1.8" fill="none" />
      <path d="M18 17v-3.6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V17" stroke="#C08F2C" strokeWidth="2.2" fill="none" strokeLinejoin="round" />
      <path d="M6.5 26h35" stroke="#C08F2C" strokeWidth="1.8" />
      <rect x="20.6" y="23" width="6.8" height="6" rx="1.6" fill="#FDF7EF" stroke="#C08F2C" strokeWidth="1.6" />
    </Frame>
  );
}

/** Packs — un cadeau. */
export function GiftIllustration(props: Props) {
  return (
    <Frame {...props}>
      <rect x="8" y="20.5" width="32" height="19.5" rx="2.4" fill="#F3D5C4" />
      <rect x="8" y="20.5" width="32" height="19.5" rx="2.4" stroke="#C4694A" strokeWidth="1.8" fill="none" />
      <rect x="5.6" y="14" width="36.8" height="7.6" rx="2.2" fill="#D98262" />
      <rect x="5.6" y="14" width="36.8" height="7.6" rx="2.2" stroke="#C4694A" strokeWidth="1.8" fill="none" />
      <path d="M24 14v26" stroke="#C4694A" strokeWidth="2.2" />
      <path
        d="M24 14s-1.8-7-5.8-7a3.6 3.6 0 0 0 0 7M24 14s1.8-7 5.8-7a3.6 3.6 0 0 1 0 7"
        stroke="#C4694A"
        strokeWidth="2.2"
        fill="none"
        strokeLinejoin="round"
      />
    </Frame>
  );
}

/** Feuille — utilisée comme motif générique. */
export function LeafIllustration(props: Props) {
  return (
    <Frame {...props}>
      <path d="M24 41V21" stroke="#788568" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M24 22c0-8.6 5.6-14.8 15-16 1.4 9.6-4.4 17.4-15 19z" fill="#A5AE8A" />
      <path d="M24 22c0-8.6 5.6-14.8 15-16 1.4 9.6-4.4 17.4-15 19z" stroke="#788568" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
      <path d="M24 29C16.6 28.4 11.6 23 10.6 15c7.4 1 12.4 6.2 13.4 14z" fill="#C7CFB4" />
      <path d="M24 29C16.6 28.4 11.6 23 10.6 15c7.4 1 12.4 6.2 13.4 14z" stroke="#788568" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
    </Frame>
  );
}

/** Soleil — utilisé comme motif générique. */
export function SunIllustration(props: Props) {
  return (
    <Frame {...props}>
      <circle cx="24" cy="24" r="10" fill="#E8B44A" />
      <circle cx="24" cy="24" r="10" stroke="#C08F2C" strokeWidth="1.8" fill="none" />
      <path
        d="M24 5.5v4.8M24 37.7v4.8M5.5 24h4.8M37.7 24h4.8M11 11l3.4 3.4M33.6 33.6 37 37M37 11l-3.4 3.4M14.4 33.6 11 37"
        stroke="#E8B44A"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </Frame>
  );
}

export const categoryIllustrations: Record<Motif, (p: Props) => React.JSX.Element> = {
  house: HouseIllustration,
  star: StarIllustration,
  heart: HeartIllustration,
  palette: PaletteIllustration,
  chef: ChefIllustration,
  tools: ToolsIllustration,
  gift: GiftIllustration,
  leaf: LeafIllustration,
  sun: SunIllustration,
};

export function CategoryIllustration({ motif, ...props }: Props & { motif: Motif }) {
  const Component = categoryIllustrations[motif] ?? LeafIllustration;
  return <Component {...props} />;
}
