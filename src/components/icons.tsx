import type { SVGProps } from 'react';
import type { Motif } from '@/lib/types';

/**
 * Jeu d'icônes maison.
 *
 * Toutes les icônes sont dessinées sur une grille 24×24, au trait, avec des
 * extrémités arrondies : c'est ce qui donne la cohérence « papeterie dessinée
 * à la main » de la marque. Aucun emoji système n'est utilisé dans l'interface.
 */

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ============================ MOTIFS DE MARQUE ============================ */

export const LeafIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21V11.5" />
    <path d="M12 11.5c0-4.4 2.8-7.9 7.5-8.5.6 4.9-2 9.4-7.5 10.2" />
    <path d="M12 14.5C8.4 14.2 5.9 11.4 5.5 7.2c3.6.5 6 3 6.5 6.6" />
  </Icon>
);

export const SunIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 3.2v1.8M12 19v1.8M3.2 12h1.8M19 12h1.8M5.8 5.8l1.3 1.3M16.9 16.9l1.3 1.3M18.2 5.8l-1.3 1.3M7.1 16.9l-1.3 1.3" />
  </Icon>
);

export const HeartIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 20s-7.2-4.3-7.2-9.2A4.1 4.1 0 0 1 12 8.4a4.1 4.1 0 0 1 7.2 2.4C19.2 15.7 12 20 12 20Z" />
  </Icon>
);

export const StarIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3.8c.8 4 1.7 4.9 5.7 5.7-4 .8-4.9 1.7-5.7 5.7-.8-4-1.7-4.9-5.7-5.7 4-.8 4.9-1.7 5.7-5.7Z" />
    <path d="M17.6 16.2c.4 1.8.8 2.2 2.6 2.6-1.8.4-2.2.8-2.6 2.6-.4-1.8-.8-2.2-2.6-2.6 1.8-.4 2.2-.8 2.6-2.6Z" />
  </Icon>
);

export const HouseIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 10.6 12 4l8 6.6" />
    <path d="M5.8 11.9V19a1 1 0 0 0 1 1h10.4a1 1 0 0 0 1-1v-7.1" />
    <path d="M10 20v-4.4a2 2 0 0 1 4 0V20" />
  </Icon>
);

export const PaletteIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3.6a8.4 8.4 0 0 0 0 16.8c1.3 0 2-.8 2-1.8s-.7-1.6-.7-2.4c0-.9.7-1.5 1.7-1.5h1.6a3.8 3.8 0 0 0 3.8-3.9C20.4 6.7 16.7 3.6 12 3.6Z" />
    <circle cx="8.6" cy="9.4" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="7.4" r="1" fill="currentColor" stroke="none" />
    <circle cx="15.6" cy="9.1" r="1" fill="currentColor" stroke="none" />
    <circle cx="7.9" cy="13.4" r="1" fill="currentColor" stroke="none" />
  </Icon>
);

export const ChefIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6.4 12.2a3.4 3.4 0 0 1 .7-6.5 3.6 3.6 0 0 1 6.6-1.3 3.4 3.4 0 0 1 3.9 7.8" />
    <path d="M6.4 12.2h11.2v3.2H6.4z" />
    <path d="M7.6 15.4 8 20h8l.4-4.6" />
  </Icon>
);

export const ToolsIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.4 8.6h15.2a1 1 0 0 1 1 1v8.6a1 1 0 0 1-1 1H4.4a1 1 0 0 1-1-1V9.6a1 1 0 0 1 1-1Z" />
    <path d="M9.2 8.6V6.4a1.4 1.4 0 0 1 1.4-1.4h2.8a1.4 1.4 0 0 1 1.4 1.4v2.2" />
    <path d="M3.4 13.2h17.2M11 12.2v2" />
  </Icon>
);

export const GiftIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.6 9.8h14.8v9.4a1 1 0 0 1-1 1H5.6a1 1 0 0 1-1-1z" />
    <path d="M3.6 6.6h16.8v3.2H3.6zM12 6.6V20" />
    <path d="M12 6.6S11.2 3.4 9 3.4a2 2 0 0 0 0 3.2M12 6.6s.8-3.2 3-3.2a2 2 0 0 1 0 3.2" />
  </Icon>
);

export const motifIcons: Record<Motif, (p: IconProps) => React.JSX.Element> = {
  leaf: LeafIcon,
  sun: SunIcon,
  heart: HeartIcon,
  star: StarIcon,
  house: HouseIcon,
  palette: PaletteIcon,
  chef: ChefIcon,
  tools: ToolsIcon,
  gift: GiftIcon,
};

export function MotifIcon({ motif, ...props }: IconProps & { motif: Motif }) {
  const Component = motifIcons[motif] ?? LeafIcon;
  return <Component {...props} />;
}

/* ================================ INTERFACE =============================== */

export const SearchIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="10.8" cy="10.8" r="6.2" />
    <path d="m15.4 15.4 4 4" />
  </Icon>
);

export const UserIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="8.6" r="3.6" />
    <path d="M5 20c.6-3.5 3.4-5.4 7-5.4s6.4 1.9 7 5.4" />
  </Icon>
);

export const CartIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.4 4.6h1.9l2.2 10.2a1.6 1.6 0 0 0 1.6 1.3h8.1a1.6 1.6 0 0 0 1.6-1.2l1.5-6.3H6.1" />
    <circle cx="9.6" cy="19.4" r="1.2" />
    <circle cx="17" cy="19.4" r="1.2" />
  </Icon>
);

export const MenuIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 7.4h16M4 12h16M4 16.6h16" />
  </Icon>
);

export const CloseIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6.4 6.4l11.2 11.2M17.6 6.4 6.4 17.6" />
  </Icon>
);

export const ChevronDownIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />
  </Icon>
);

export const ChevronRightIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m9.5 6.5 5.5 5.5-5.5 5.5" />
  </Icon>
);

export const ChevronLeftIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m14.5 6.5L9 12l5.5 5.5" />
  </Icon>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.5 12h15M14 6.5 19.5 12 14 17.5" />
  </Icon>
);

export const ArrowUpIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 19.5v-15M5.5 11 12 4.5 18.5 11" />
  </Icon>
);

export const CheckIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m5 12.8 4.3 4.2L19 7.4" />
  </Icon>
);

export const DownloadIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 4v10.4M7.8 10.6 12 14.8l4.2-4.2" />
    <path d="M4.8 17.6v1.4a1 1 0 0 0 1 1h12.4a1 1 0 0 0 1-1v-1.4" />
  </Icon>
);

export const MailIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.4" y="5.6" width="17.2" height="12.8" rx="1.6" />
    <path d="m4.4 7 7.6 5.4L19.6 7" />
  </Icon>
);

export const InstagramIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.8" y="3.8" width="16.4" height="16.4" rx="4.6" />
    <circle cx="12" cy="12" r="3.9" />
    <circle cx="16.8" cy="7.2" r="1" fill="currentColor" stroke="none" />
  </Icon>
);

export const FacebookIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M14.4 8.6h-1.3a1.6 1.6 0 0 0-1.6 1.6v1.2m0 0H9.9m1.6 0h2m-2 0v5.4" />
  </Icon>
);

export const PinterestIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M10.4 18.4 12 12m0 0c-.5-1 .2-2.3 1.4-2.3 1 0 1.7.8 1.7 1.9 0 1.6-1.1 2.9-2.4 2.9-.8 0-1.4-.4-1.6-1" />
  </Icon>
);

export const PlusIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 5.5v13M5.5 12h13" />
  </Icon>
);

export const MinusIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5.5 12h13" />
  </Icon>
);

export const TrashIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.6 7h14.8M9.6 7V5.4a1 1 0 0 1 1-1h2.8a1 1 0 0 1 1 1V7" />
    <path d="M6.6 7l.8 11.6a1 1 0 0 0 1 .9h7.2a1 1 0 0 0 1-.9L17.4 7" />
    <path d="M10.4 10.6v5.6M13.6 10.6v5.6" />
  </Icon>
);

export const LockIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="5" y="10.6" width="14" height="9.4" rx="1.8" />
    <path d="M8.2 10.6V8a3.8 3.8 0 0 1 7.6 0v2.6" />
    <circle cx="12" cy="15.3" r="1" fill="currentColor" stroke="none" />
  </Icon>
);

export const PrinterIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M7 9.4V4.6h10v4.8" />
    <rect x="3.8" y="9.4" width="16.4" height="6.6" rx="1.4" />
    <path d="M7 14.4h10v5H7z" />
  </Icon>
);

export const InfinityIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M8.4 8.6c-2 0-3.6 1.5-3.6 3.4s1.6 3.4 3.6 3.4c1.5 0 2.4-1 3.6-2.5 1.2-1.5 2.1-2.5 3.6-2.5 2 0 3.6 1.5 3.6 3.4" />
    <path d="M19.2 12c0-1.9-1.6-3.4-3.6-3.4-1.5 0-2.4 1-3.6 2.5-1.2 1.5-2.1 2.5-3.6 2.5-2 0-3.6-1.5-3.6-3.4" />
  </Icon>
);

export const FileIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M13.6 3.6H7a1.6 1.6 0 0 0-1.6 1.6v13.6A1.6 1.6 0 0 0 7 20.4h10a1.6 1.6 0 0 0 1.6-1.6V8.6z" />
    <path d="M13.6 3.6v5h5" />
    <path d="M8.8 13.4h6.4M8.8 16.4h4.2" />
  </Icon>
);

export const SparkleIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 4.4c.7 3.3 1.5 4.1 4.8 4.8-3.3.7-4.1 1.5-4.8 4.8-.7-3.3-1.5-4.1-4.8-4.8 3.3-.7 4.1-1.5 4.8-4.8Z" />
    <path d="M17.4 15.4c.3 1.4.6 1.7 2 2-1.4.3-1.7.6-2 2-.3-1.4-.6-1.7-2-2 1.4-.3 1.7-.6 2-2Z" />
    <path d="M6.6 16.2c.2 1 .4 1.2 1.4 1.4-1 .2-1.2.4-1.4 1.4-.2-1-.4-1.2-1.4-1.4 1-.2 1.2-.4 1.4-1.4Z" />
  </Icon>
);

export const FilterIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4.4 6.6h15.2M7 12h10M10 17.4h4" />
  </Icon>
);

export const StarFilledIcon = ({ size = 16, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M12 2.8l2.72 5.86 6.42.78-4.72 4.4 1.24 6.36L12 17.1l-5.66 3.1 1.24-6.36-4.72-4.4 6.42-.78z" />
  </svg>
);

export const HeartFilledIcon = ({ size = 18, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M12 20.8S2.6 15.1 2.6 9.3A4.9 4.9 0 0 1 12 6.6a4.9 4.9 0 0 1 9.4 2.7c0 5.8-9.4 11.5-9.4 11.5Z" />
  </svg>
);

export const CardsIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="2.8" y="6.4" width="18.4" height="11.2" rx="1.8" />
    <path d="M2.8 10h18.4" />
    <path d="M6 13.8h3.4" />
  </Icon>
);

/* ======================= BANDEAU D'ACCUEIL ======================= */

/** Deux adultes et un enfant — « pour petits et grands ». */
export const FamilyIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="7" cy="6" r="2.6" />
    <circle cx="17" cy="6.5" r="2.3" />
    <circle cx="12" cy="12.5" r="1.9" />
    <path d="M3 20v-3a4 4 0 0 1 4-4 4 4 0 0 1 1.6.34" />
    <path d="M21 20v-2.7a3.7 3.7 0 0 0-3.7-3.7 3.7 3.7 0 0 0-1.6.36" />
    <path d="M9 20v-1.6a3 3 0 0 1 6 0V20" />
  </Icon>
);

/** Arc-en-ciel à trois arches — « partager des moments précieux ». */
export const RainbowIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2.5 19a9.5 9.5 0 0 1 19 0" />
    <path d="M6 19a6 6 0 0 1 12 0" />
    <path d="M9.5 19a2.5 2.5 0 0 1 5 0" />
  </Icon>
);
