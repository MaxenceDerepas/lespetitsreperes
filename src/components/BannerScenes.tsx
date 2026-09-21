import type { Motif } from '@/lib/types';
import { CategoryIllustration } from './CategoryIcons';

/**
 * Illustrations des bandeaux de titre, dessinées en SVG.
 *
 * Les pages Blog, Boutique et À propos utilisent les dessins fournis par la
 * cliente. Les autres pages reçoivent une scène vectorielle construite ici,
 * dans le même univers : mur crème avec un petit cadre et une tache de
 * lumière, un plan de travail clair, une plante en eucalyptus, un pot à
 * crayons, un cœur tracé à la main — et, posé sur la table, l'objet qui
 * raconte la page (une enveloppe pour le contact, un panier en osier pour le
 * panier, une pochette de fiches pour les téléchargements…).
 *
 * Le décor est strictement commun à toutes les scènes : seul l'objet central
 * change. C'est ce qui donne l'impression d'une même illustration déclinée
 * plutôt que d'images choisies au hasard.
 *
 * Tout est vectoriel : aucune requête réseau, netteté parfaite, et la scène
 * se recolore avec la charte si elle évolue. Le cadre 16/10 est le même que
 * celui des dessins, pour que les bandeaux gardent la même hauteur d'une page
 * à l'autre.
 */

/* ------------------------------- Palette -------------------------------- */

const C = {
  paper: '#FDF9F2',
  blob: '#F7EADC',
  desk: '#FAEDDC',
  deskEdge: '#EFDCC5',
  white: '#FFFFFF',
  line: '#E0D2BD',
  sage: '#9AA983',
  sageLight: '#B5C09C',
  sageInk: '#7E8C68',
  sagePale: '#DCE4D2',
  clay: '#DFA184',
  clayInk: '#C4694A',
  blush: '#F6DCD1',
  coral: '#E8837C',
  sand: '#F0E0C8',
  gold: '#E8B44A',
  wood: '#DDB98E',
};

const DESK_Y = 318;

/* ---------------------------- Petits éléments ---------------------------- */

function Eucalyptus({ x, y, rotate = 0, scale = 1, leaves = 6 }: {
  x: number
  y: number
  rotate?: number
  scale?: number
  leaves?: number
}) {
  const items = Array.from({ length: leaves }, (_, i) => i);
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path d="M0 0C5 -32 12 -62 21 -94" stroke={C.sageInk} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {items.map((i) => {
        const t = i / (leaves - 1);
        const px = 5 * t + 16 * t * t;
        const py = -16 - t * 80;
        const side = i % 2 === 0 ? 1 : -1;
        const rot = side === 1 ? -34 + t * 18 : 34 - t * 18;
        const r = 15 - t * 4;
        return (
          <g key={i} transform={`translate(${px + side * 12} ${py}) rotate(${rot})`}>
            <ellipse rx={r} ry={r * 0.62} fill={i % 3 === 0 ? C.sageLight : C.sage} />
            <ellipse rx={r} ry={r * 0.62} fill="none" stroke={C.sageInk} strokeWidth="1" />
          </g>
        );
      })}
    </g>
  );
}

/** Pot en terre cuite posé sur le plan de travail. */
function PottedPlant({ x, scale = 1 }: { x: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${DESK_Y}) scale(${scale})`}>
      <Eucalyptus x={34} y={-66} rotate={-6} scale={1} />
      <Eucalyptus x={56} y={-62} rotate={16} scale={0.78} leaves={5} />
      <Eucalyptus x={14} y={-62} rotate={-24} scale={0.7} leaves={5} />
      <path d="M2 -66h76l-10 56a12 12 0 0 1-12 10H24a12 12 0 0 1-12-10z" fill={C.blush} />
      <path d="M2 -66h76l-10 56a12 12 0 0 1-12 10H24a12 12 0 0 1-12-10z" fill="none" stroke={C.clay} strokeWidth="2" />
      <path d="M-4 -72h88v14H-4z" fill={C.sand} stroke={C.clay} strokeWidth="2" />
      <path d="M40 -32c-5-4.2-5-10 0-13.2 5 3.2 5 9 0 13.2Z" fill="none" stroke={C.clay} strokeWidth="1.8" />
    </g>
  );
}

/** Pot à crayons — le même que sur les dessins de la cliente. */
function PencilCup({ x, scale = 1 }: { x: number; scale?: number }) {
  const pencils = [
    { dx: 8, h: 54, rot: -9, color: C.sage },
    { dx: 22, h: 66, rot: -3, color: C.clay },
    { dx: 36, h: 58, rot: 4, color: C.gold },
    { dx: 48, h: 48, rot: 10, color: C.sageLight },
  ];
  return (
    <g transform={`translate(${x} ${DESK_Y}) scale(${scale})`}>
      {pencils.map((p, i) => (
        <g key={i} transform={`translate(${p.dx} -34) rotate(${p.rot})`}>
          <rect x="-4" y={-p.h} width="8" height={p.h} rx="3" fill={p.color} />
          <path d={`M-4 ${-p.h}l4-9 4 9z`} fill={C.sand} />
        </g>
      ))}
      <path d="M0 -38h58l-6 30a10 10 0 0 1-10 8H16a10 10 0 0 1-10-8z" fill={C.blush} />
      <path d="M0 -38h58l-6 30a10 10 0 0 1-10 8H16a10 10 0 0 1-10-8z" fill="none" stroke={C.clay} strokeWidth="2" />
      <path d="M29 -18c-4-3.4-4-8 0-10.6 4 2.6 4 7.2 0 10.6Z" fill="none" stroke={C.clay} strokeWidth="1.6" />
    </g>
  );
}

/** Le petit cœur tracé à la main, présent sur toutes les illustrations. */
function Heart({ x, y, size = 1, color = C.coral }: { x: number; y: number; size?: number; color?: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${size})`}
      d="M0 16C0 16-14 7.6-14 -1.4A8 8 0 0 1 0 -6a8 8 0 0 1 14 4.6C14 7.6 0 16 0 16Z"
      fill="none"
      stroke={color}
      strokeWidth="2.6"
      strokeLinejoin="round"
    />
  );
}

/** Petit cadre accroché au mur, avec une brindille dessinée. */
function WallFrame({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M46 -22v18" stroke={C.wood} strokeWidth="2" strokeLinecap="round" />
      <circle cx="46" cy="-24" r="3.4" fill={C.wood} />
      <rect width="92" height="112" rx="5" fill={C.sand} stroke={C.wood} strokeWidth="2.4" />
      <rect x="9" y="9" width="74" height="94" rx="2" fill={C.white} />
      <path d="M46 84V44" stroke={C.sageInk} strokeWidth="2" strokeLinecap="round" />
      <path d="M46 44c0-10 6-17 16-18 1 10-5 19-16 20" fill={C.sageLight} stroke={C.sageInk} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M46 58c-8-1-13-7-14-16 8 1 13 7 14 16" fill={C.sage} stroke={C.sageInk} strokeWidth="1.6" strokeLinejoin="round" />
    </g>
  );
}

/** Brindille posée sur la table, à droite. */
function Twig({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 0C22 -6 44 -18 64 -40" stroke={C.sageInk} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {[
        { t: 0.22, side: 1 },
        { t: 0.46, side: -1 },
        { t: 0.68, side: 1 },
        { t: 0.9, side: -1 },
      ].map(({ t, side }, i) => {
        const px = 64 * t;
        const py = -40 * t * t - 8 * t;
        const r = 13 - t * 3;
        return (
          <g key={i} transform={`translate(${px + side * 9} ${py - 6}) rotate(${side === 1 ? -40 : 28})`}>
            <ellipse rx={r} ry={r * 0.6} fill={i % 2 ? C.sageLight : C.sage} />
            <ellipse rx={r} ry={r * 0.6} fill="none" stroke={C.sageInk} strokeWidth="1" />
          </g>
        );
      })}
    </g>
  );
}

/* ------------------------- Objets propres aux pages ----------------------- */

/** Enveloppe ouverte posée sur la table, avec une carte qui dépasse. */
function Envelope() {
  const top = DESK_Y - 126;
  return (
    <g transform={`translate(246 ${top})`}>
      <g transform="translate(30 -58) rotate(-4)" filter="url(#bnShadow)">
        <rect width="146" height="104" rx="5" fill={C.white} stroke={C.line} strokeWidth="1.4" />
        <text x="73" y="42" textAnchor="middle" fill={C.sageInk} fontFamily="var(--font-script), cursive" fontSize="25">
          Bonjour
        </text>
        <path d="M44 62h58" stroke={C.sand} strokeWidth="5" strokeLinecap="round" />
        <path d="M54 76h38" stroke={C.sand} strokeWidth="5" strokeLinecap="round" />
      </g>
      <g filter="url(#bnShadow)">
        <path d="M0 0h200v114a10 10 0 0 1-10 10H10a10 10 0 0 1-10-10z" fill={C.sand} />
        <path d="M0 0h200v114a10 10 0 0 1-10 10H10a10 10 0 0 1-10-10z" fill="none" stroke={C.clay} strokeWidth="2" />
        <path d="M0 6l100 72L200 6" fill="none" stroke={C.clay} strokeWidth="2" strokeLinejoin="round" />
        <path d="M0 122l76-56M200 122l-76-56" fill="none" stroke={C.clay} strokeWidth="1.6" opacity="0.6" />
      </g>
    </g>
  );
}

/** Deux bulles de conversation au-dessus d'un carnet. */
function Bubbles() {
  return (
    <g>
      <g filter="url(#bnShadow)">
        <g transform="translate(216 96)">
          <rect width="198" height="110" rx="30" fill={C.white} stroke={C.line} strokeWidth="1.6" />
          <path d="M46 108l-9 30 36-28z" fill={C.white} stroke={C.line} strokeWidth="1.6" strokeLinejoin="round" />
          <g fill={C.sand}>
            <rect x="34" y="36" width="130" height="8" rx="4" />
            <rect x="34" y="58" width="98" height="8" rx="4" />
          </g>
          <circle cx="152" cy="62" r="5.5" fill={C.sageLight} />
        </g>
        <g transform="translate(316 172)">
          <rect width="152" height="88" rx="26" fill={C.sagePale} stroke={C.sageInk} strokeWidth="1.4" />
          <path d="M114 86l14 26-40-24z" fill={C.sagePale} stroke={C.sageInk} strokeWidth="1.4" strokeLinejoin="round" />
          <g fill={C.white} opacity="0.9">
            <rect x="28" y="28" width="96" height="8" rx="4" />
            <rect x="28" y="48" width="66" height="8" rx="4" />
          </g>
        </g>
      </g>
      {/* Le carnet posé sur la table, sous les bulles */}
      <g transform={`translate(252 ${DESK_Y - 44}) rotate(-3)`} filter="url(#bnShadow)">
        <rect width="168" height="44" rx="6" fill={C.white} stroke={C.line} strokeWidth="1.4" />
        <rect x="18" y="16" width="86" height="7" rx="3.5" fill={C.sand} />
        <circle cx="140" cy="22" r="8" fill={C.gold} opacity="0.7" />
      </g>
    </g>
  );
}

/** Panier en osier, deux fiches dépassant. */
function Basket() {
  const top = DESK_Y - 128;
  return (
    <g transform={`translate(252 ${top})`}>
      <g transform="translate(22 -78) rotate(-7)" filter="url(#bnShadow)">
        <rect width="96" height="84" rx="5" fill={C.white} stroke={C.line} strokeWidth="1.4" />
        <circle cx="28" cy="28" r="10" fill={C.gold} opacity="0.75" />
        <rect x="16" y="52" width="64" height="6" rx="3" fill={C.sand} />
        <rect x="16" y="66" width="44" height="6" rx="3" fill={C.sand} />
      </g>
      <g transform="translate(96 -70) rotate(7)" filter="url(#bnShadow)">
        <rect width="90" height="76" rx="5" fill={C.white} stroke={C.line} strokeWidth="1.4" />
        <path d="M24 44c7-8 14-8 21 0s14 8 21 0" stroke={C.sage} strokeWidth="3" fill="none" strokeLinecap="round" />
        <rect x="18" y="56" width="54" height="6" rx="3" fill={C.sand} />
      </g>
      <g filter="url(#bnShadow)">
        <path d="M0 0h172l-19 116a14 14 0 0 1-14 12H33a14 14 0 0 1-14-12z" fill={C.sand} />
        <path d="M0 0h172l-19 116a14 14 0 0 1-14 12H33a14 14 0 0 1-14-12z" fill="none" stroke={C.clay} strokeWidth="2" />
        <path d="M-6 -8h184v18H-6z" fill={C.blush} stroke={C.clay} strokeWidth="2" />
        <g stroke={C.clay} strokeWidth="1.8" opacity="0.65">
          <path d="M42 14l-9 104M78 14l-3 104M118 14l3 104M152 14l8 104" />
          <path d="M12 54h148M17 90h138" />
        </g>
      </g>
    </g>
  );
}

/** Carnet ouvert posé à plat. */
function OpenNotebook() {
  return (
    <g transform={`translate(212 ${DESK_Y - 136})`} filter="url(#bnShadow)">
      <path d="M0 16c36-15 72-15 108 0v120c-36-13-72-13-108 0z" fill={C.white} stroke={C.line} strokeWidth="1.6" />
      <path d="M216 16c-36-15-72-15-108 0v120c36-13 72-13 108 0z" fill={C.white} stroke={C.line} strokeWidth="1.6" />
      <path d="M108 16v120" stroke={C.line} strokeWidth="1.6" />
      <g fill={C.sand}>
        <rect x="24" y="46" width="64" height="6" rx="3" />
        <rect x="24" y="64" width="56" height="6" rx="3" />
        <rect x="24" y="82" width="64" height="6" rx="3" />
        <rect x="24" y="100" width="42" height="6" rx="3" />
        <rect x="130" y="64" width="64" height="6" rx="3" />
        <rect x="130" y="82" width="48" height="6" rx="3" />
      </g>
      <circle cx="162" cy="42" r="11" fill={C.gold} opacity="0.7" />
      <Heart x={162} y={94} size={0.5} />
    </g>
  );
}

/** Pochette de fiches, avec une fiche qui en sort. */
function Pouch() {
  const top = DESK_Y - 104;
  return (
    <g transform={`translate(240 ${top})`}>
      <g transform="translate(36 -108) rotate(-5)" filter="url(#bnShadow)">
        <rect width="128" height="150" rx="6" fill={C.white} stroke={C.line} strokeWidth="1.4" />
        <rect x="24" y="24" width="62" height="7" rx="3.5" fill={C.sageLight} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(24 ${54 + i * 22})`}>
            <rect y="-6" width="12" height="12" rx="3" fill="none" stroke={C.line} strokeWidth="1.4" />
            <rect x="22" y="-3" width={64 - i * 10} height="6" rx="3" fill={C.sand} />
          </g>
        ))}
      </g>
      <g filter="url(#bnShadow)">
        <path d="M0 0h196v94a10 10 0 0 1-10 10H10a10 10 0 0 1-10-10z" fill={C.sand} />
        <path d="M0 0h196v94a10 10 0 0 1-10 10H10a10 10 0 0 1-10-10z" fill="none" stroke={C.clay} strokeWidth="2" />
        <path d="M0 0l42-30h112l42 30" fill={C.blush} stroke={C.clay} strokeWidth="2" strokeLinejoin="round" />
        <g transform="translate(98 52)" stroke={C.sageInk} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M0 -20v28M-12 -2l12 12 12-12" />
        </g>
      </g>
    </g>
  );
}

/** Deux feuilles imprimées posées à plat. */
function PaperStack() {
  const rows = [0, 1, 2, 3];
  const sheet = (accent: string, width: number, height: number) => (
    <>
      <rect width={width} height={height} rx="6" fill={C.white} />
      <rect width={width} height={height} rx="6" fill="none" stroke={C.line} strokeWidth="1.4" />
      <rect x="20" y="20" width={width * 0.4} height="7" rx="3.5" fill={accent} />
      {rows.map((i) => (
        <g key={i} transform={`translate(20 ${48 + i * 20})`}>
          <rect y="-6" width="12" height="12" rx="3" fill="none" stroke={C.line} strokeWidth="1.4" />
          <rect x="22" y="-3" width={width * 0.42 - i * 12} height="6" rx="3" fill={C.sand} />
        </g>
      ))}
    </>
  );

  return (
    <g>
      <g transform={`translate(214 ${DESK_Y - 142}) rotate(-5)`} filter="url(#bnShadow)">
        {sheet(C.sageLight, 156, 140)}
      </g>
      <g transform={`translate(286 ${DESK_Y - 134}) rotate(5)`} filter="url(#bnShadow)">
        {sheet(C.clay, 152, 134)}
      </g>
    </g>
  );
}

/** Cartes à découper étalées sur la table. */
function CutoutCards() {
  const tints = [C.sand, C.blush, C.sagePale, C.blush, C.sagePale, C.sand];
  return (
    <g>
      <g transform={`translate(212 ${DESK_Y - 164}) rotate(-4)`} filter="url(#bnShadow)">
        <rect width="216" height="156" rx="7" fill={C.white} stroke={C.line} strokeWidth="1.5" />
        {tints.map((tint, i) => (
          <g key={i} transform={`translate(${22 + (i % 3) * 61} ${22 + Math.floor(i / 3) * 64})`}>
            <rect width="52" height="52" rx="8" fill={tint} />
            <rect width="52" height="52" rx="8" fill="none" stroke={C.line} strokeWidth="1.2" />
            <circle cx="26" cy="19" r="7.5" fill={C.white} opacity="0.85" />
            <path d="M13 36c4 6 22 6 26 0" stroke={C.white} strokeWidth="3.4" strokeLinecap="round" fill="none" opacity="0.85" />
          </g>
        ))}
      </g>
      <g transform={`translate(430 ${DESK_Y - 96}) rotate(9)`} filter="url(#bnShadow)">
        <rect width="74" height="74" rx="8" fill={C.white} stroke={C.line} strokeWidth="1.4" />
        <circle cx="37" cy="28" r="10" fill={C.gold} opacity="0.7" />
        <path d="M20 52c8 9 26 9 34 0" stroke={C.sage} strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}

/** Fiche imprimée portant l'illustration de la catégorie. */
function CategorySheet({ motif }: { motif: Motif }) {
  return (
    <g>
      <g transform={`translate(216 ${DESK_Y - 170}) rotate(-3)`} filter="url(#bnShadow)">
        <rect width="204" height="162" rx="8" fill={C.white} stroke={C.line} strokeWidth="1.6" />
        <rect x="28" y="130" width="148" height="7" rx="3.5" fill={C.sand} />
      </g>
      <g transform={`translate(258 ${DESK_Y - 158})`}>
        <CategoryIllustration motif={motif} size={116} />
      </g>
      <g transform={`translate(404 ${DESK_Y - 232}) rotate(10)`} filter="url(#bnShadow)">
        <rect width="80" height="80" rx="8" fill={C.sagePale} stroke={C.sageInk} strokeWidth="1.2" />
        <circle cx="40" cy="30" r="11" fill={C.white} opacity="0.9" />
        <path d="M19 58c9 10 33 10 42 0" stroke={C.white} strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.9" />
      </g>
      <g transform={`translate(412 ${DESK_Y - 112}) rotate(-8)`} filter="url(#bnShadow)">
        <rect width="74" height="74" rx="8" fill={C.blush} stroke={C.clay} strokeWidth="1.2" />
        <circle cx="37" cy="28" r="10" fill={C.white} opacity="0.9" />
        <path d="M18 52c8 9 30 9 38 0" stroke={C.white} strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.9" />
      </g>
    </g>
  );
}

/* --------------------------------- Scène --------------------------------- */

export type BannerSceneVariant =
  | 'contact'
  | 'faq'
  | 'categories'
  | 'legal'
  | 'panier'
  | 'compte'
  | 'telechargements';

const SCENE_LABEL: Record<BannerSceneVariant, string> = {
  contact: 'Une enveloppe ouverte et une carte « Bonjour » posées sur une table claire, près d’une plante',
  faq: 'Deux bulles de conversation au-dessus d’un carnet posé sur une table claire',
  categories: 'Une planche de cartes à découper posée sur une table claire, près d’une plante',
  legal: 'Deux feuilles imprimées posées sur une table claire, près d’une plante',
  panier: 'Un panier en osier et deux fiches imprimées, posés sur une table claire',
  compte: 'Un carnet ouvert posé sur une table claire, près d’une plante',
  telechargements: 'Une fiche imprimée qui sort d’une pochette, posée sur une table claire',
};

/**
 * Scène de bandeau.
 *
 * `motif` n'est utilisé que par les pages catégorie : l'illustration de la
 * catégorie est alors posée sur la fiche, au centre de la scène.
 */
export function BannerScene({
  variant,
  motif,
  label,
  className = '',
}: {
  variant: BannerSceneVariant
  motif?: Motif
  /** Remplace la description lue par les lecteurs d'écran. */
  label?: string
  className?: string
}) {
  const objects: Record<BannerSceneVariant, React.JSX.Element> = {
    contact: <Envelope />,
    faq: <Bubbles />,
    categories: motif ? <CategorySheet motif={motif} /> : <CutoutCards />,
    legal: <PaperStack />,
    panier: <Basket />,
    compte: <OpenNotebook />,
    telechargements: <Pouch />,
  };

  return (
    <svg
      viewBox="0 0 640 400"
      fill="none"
      role="img"
      aria-label={label ?? SCENE_LABEL[variant]}
      className={`h-auto w-full ${className}`}
    >
      <defs>
        <filter id="bnShadow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="8" stdDeviation="11" floodColor="#8A7154" floodOpacity="0.12" />
        </filter>
        <radialGradient id="bnBlob" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={C.blob} stopOpacity="0.85" />
          <stop offset="70%" stopColor={C.blob} stopOpacity="0.45" />
          <stop offset="100%" stopColor={C.blob} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bnDesk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.desk} />
          <stop offset="100%" stopColor={C.paper} />
        </linearGradient>
        {/* Le plan de travail s'efface sur les bords : aucune arête visible
            entre la scène et le crème du bandeau. */}
        <linearGradient id="bnDeskEdges" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000000" />
          <stop offset="14%" stopColor="#FFFFFF" />
          <stop offset="88%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
        <mask id="bnDeskMask">
          <rect width="640" height="400" fill="url(#bnDeskEdges)" />
        </mask>
      </defs>

      {/* Mur et halo de lumière */}
      <rect width="640" height="400" fill={C.paper} />
      <ellipse cx="392" cy="150" rx="266" ry="176" fill="url(#bnBlob)" />

      {/* Plan de travail */}
      <g mask="url(#bnDeskMask)">
        <path d={`M0 ${DESK_Y}h640v${400 - DESK_Y}H0z`} fill="url(#bnDesk)" />
        <path d={`M0 ${DESK_Y}h640`} stroke={C.deskEdge} strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Décor commun à toutes les pages */}
      <WallFrame x={36} y={52} />
      <Heart x={168} y={74} size={0.8} />
      <PottedPlant x={30} scale={0.9} />
      <PencilCup x={140} scale={0.92} />
      <Twig x={536} y={DESK_Y - 6} />
      <Heart x={566} y={132} size={0.6} color={C.clay} />

      {/* L'objet qui raconte la page */}
      {objects[variant]}
    </svg>
  );
}
