import type { AccentKey, Motif } from '@/lib/types';

/**
 * Visuels produits générés en SVG.
 *
 * Chaque produit est illustré par un mockup dessiné de la fiche elle-même :
 * titre manuscrit, pastilles numérotées colorées, vignettes, cases à cocher.
 * La mise en page dépend du motif du produit — liste de routine, tableau
 * d'émotions, planning de la semaine, cartes à découper, recette, pack de
 * plusieurs fiches — de sorte que deux produits ne se ressemblent jamais.
 *
 * Quatre vues sont disponibles pour la fiche produit : aperçu, zoom sur les
 * illustrations, exemple imprimé et mise en situation.
 *
 * Avantages sur des images bitmap : cohérence graphique totale, poids
 * négligeable, netteté sur tous les écrans, aucun appel réseau. Pour passer à
 * de vraies photos, remplacer l'intérieur de <ProductVisual /> par next/image.
 */

const palettes: Record<AccentKey, { bg: string; mid: string; ink: string; soft: string }> = {
  sage: { bg: '#EDF0E6', mid: '#A5AE8A', ink: '#5F6B51', soft: '#DCE1D2' },
  terracotta: { bg: '#FBEBE2', mid: '#E9A88E', ink: '#B05836', soft: '#F3D5C4' },
  gold: { bg: '#FAF0DF', mid: '#E3C48C', ink: '#8A6320', soft: '#F2E2C6' },
  peach: { bg: '#FCEDE4', mid: '#F0C4AC', ink: '#B4653F', soft: '#F8DECE' },
  sand: { bg: '#F7EFE4', mid: '#DCC5A9', ink: '#7E6647', soft: '#EFE2D0' },
  sageLight: { bg: '#F1F3EA', mid: '#B9C1A2', ink: '#65704F', soft: '#E3E8D8' },
};

/** Teintes des pastilles, reprises de la palette illustrative. */
const dots = ['#E8837C', '#E8B44A', '#A5AE8A', '#B9A7D6', '#D98262', '#8FB3C9'];

export type VisualVariant = 'sheet' | 'zoom' | 'printed' | 'lifestyle';

export const visualVariants: { id: VisualVariant; label: string }[] = [
  { id: 'sheet', label: 'Aperçu de la fiche' },
  { id: 'zoom', label: 'Zoom sur les illustrations' },
  { id: 'printed', label: 'Exemple imprimé' },
  { id: 'lifestyle', label: 'Mise en situation' },
];

type Layout = 'list' | 'grid' | 'planner' | 'cards' | 'recipe' | 'stack';

const layoutByMotif: Record<Motif, Layout> = {
  house: 'list',
  star: 'list',
  heart: 'grid',
  palette: 'cards',
  chef: 'recipe',
  tools: 'planner',
  gift: 'stack',
  leaf: 'list',
  sun: 'list',
};

interface Props {
  motif: Motif
  accent: AccentKey
  variant?: VisualVariant
  /** Nom du produit, repris comme titre sur la fiche dessinée. */
  title?: string
  /** Texte alternatif : décrit ce que l'on voit, pour les lecteurs d'écran. */
  alt: string
  className?: string
}

/**
 * Compose le titre dessiné sur la fiche à partir du nom du produit :
 * une première partie manuscrite, une seconde en capitales.
 * Les mots outils sont écartés et la longueur est bornée, pour que le titre
 * tienne toujours dans la largeur de la feuille.
 */
const stopWords = new Set([
  'et', 'de', 'des', 'du', 'la', 'le', 'les', 'aux', 'à', 'en', 'pour', 'un', 'une', 'd’un', 'd’une',
]);

function splitTitle(name?: string): [string, string] {
  if (!name) return ['Ma fiche', 'À IMPRIMER'];

  const words = name.replace(/[,’']/g, ' ').split(/\s+/).filter(Boolean);
  const content = words.filter((w) => !stopWords.has(w.toLowerCase()));
  if (content.length === 0) return [name, 'À IMPRIMER'];
  if (content.length === 1) return [content[0], 'À IMPRIMER'];

  // Deux mots manuscrits seulement si le nom est vraiment long.
  const scriptCount = content.length >= 4 ? 2 : 1;
  const script = content.slice(0, scriptCount).join(' ');
  const rest = content.slice(scriptCount);
  const twoWords = rest.slice(0, 2).join(' ');
  const caps = (twoWords.length <= 16 ? twoWords : rest[rest.length - 1]).toUpperCase();

  return [script, caps];
}

/** Taille de police adaptée à la longueur, pour ne jamais déborder. */
function fitSize(text: string, base: number, maxChars: number): number {
  if (text.length <= maxChars) return base;
  return Math.max(base * 0.55, (base * maxChars) / text.length);
}

/* ------------------------------ Contenus ------------------------------- */

function SheetHeader({
  title,
  p,
  width,
}: {
  title?: string
  p: (typeof palettes)[AccentKey]
  width: number
}) {
  const [script, caps] = splitTitle(title);
  const centre = width / 2;

  return (
    <g>
      {/* Brindille, en haut à gauche */}
      <g transform="translate(96 108)">
        <path d="M0 0c22 6 42 18 58 34" stroke="#A5AE8A" strokeWidth="4" fill="none" strokeLinecap="round" />
        <g fill="#A5AE8A">
          <ellipse cx="6" cy="-6" rx="18" ry="10" transform="rotate(-26 6 -6)" />
          <ellipse cx="34" cy="10" rx="17" ry="9.5" transform="rotate(-14 34 10)" />
          <ellipse cx="20" cy="22" rx="15" ry="8.5" transform="rotate(30 20 22)" />
          <ellipse cx="54" cy="32" rx="15" ry="8.5" transform="rotate(8 54 32)" />
        </g>
      </g>

      {/* Soleil, en haut à droite */}
      <g transform={`translate(${width - 118} 120)`}>
        <circle r="26" fill="#E8B44A" />
        <path
          d="M0 -44v11M0 33v11M-44 0h11M33 0h11M-31 -31l8 8M23 23l8 8M31 -31l-8 8M-23 23l-8 8"
          stroke="#E8B44A"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>

      {/* Titre */}
      <text
        x={centre - 24}
        y="150"
        textAnchor="middle"
        fill={p.ink}
        fontFamily="var(--font-script), cursive"
        fontSize={fitSize(script, 60, 11)}
      >
        {script}
      </text>
      <text
        x={centre + 24}
        y="206"
        textAnchor="middle"
        fill="#B05836"
        fontFamily="var(--font-serif), Georgia, serif"
        fontSize={fitSize(caps, 44, 11)}
        letterSpacing="3"
      >
        {caps}
      </text>
    </g>
  );
}

function ListBody({ p }: { p: (typeof palettes)[AccentKey] }) {
  return (
    <g>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i} transform={`translate(0 ${280 + i * 94})`}>
          <circle cx="132" cy="0" r="24" fill={dots[i % dots.length]} />
          <text
            x="132"
            y="9"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="var(--font-sans), sans-serif"
            fontSize="24"
            fontWeight="700"
          >
            {i + 1}
          </text>
          <rect x="176" y="-25" width="50" height="50" rx="12" fill={p.soft} />
          <circle cx="201" cy="-6" r="10" fill="#FFFFFF" opacity="0.8" />
          <path d="M188 10c6-9 20-9 26 0" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" opacity="0.8" fill="none" />
          <rect x="248" y="-8" width={300 - i * 26} height="14" rx="7" fill="#E7DDCD" />
          <circle cx="632" cy="0" r="22" fill="none" stroke="#D9CDBA" strokeWidth="5" />
        </g>
      ))}
    </g>
  );
}

function GridBody({ p }: { p: (typeof palettes)[AccentKey] }) {
  const faces = [
    { c: '#E8B44A', mouth: 'smile' },
    { c: '#E8837C', mouth: 'flat' },
    { c: '#8FB3C9', mouth: 'sad' },
    { c: '#A5AE8A', mouth: 'smile' },
    { c: '#B9A7D6', mouth: 'flat' },
    { c: '#D98262', mouth: 'sad' },
    { c: '#E8B44A', mouth: 'sad' },
    { c: '#A5AE8A', mouth: 'smile' },
    { c: '#E8837C', mouth: 'smile' },
    { c: '#B9A7D6', mouth: 'sad' },
    { c: '#8FB3C9', mouth: 'smile' },
    { c: '#D98262', mouth: 'flat' },
  ];

  return (
    <g transform="translate(118 266)">
      {faces.map((face, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        return (
          <g key={i} transform={`translate(${col * 176} ${row * 128})`}>
            <rect x="0" y="0" width="156" height="110" rx="18" fill={p.bg} />
            <rect x="0" y="0" width="156" height="110" rx="18" stroke={p.mid} strokeWidth="2.6" fill="none" />
            <circle cx="78" cy="44" r="25" fill={face.c} />
            <circle cx="70" cy="40" r="3.4" fill="#FFFFFF" />
            <circle cx="86" cy="40" r="3.4" fill="#FFFFFF" />
            {face.mouth === 'smile' && (
              <path d="M68 50c5 6 15 6 20 0" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" fill="none" />
            )}
            {face.mouth === 'flat' && (
              <path d="M68 52h20" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" />
            )}
            {face.mouth === 'sad' && (
              <path d="M68 54c5-6 15-6 20 0" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" fill="none" />
            )}
            <rect x="46" y="84" width="64" height="9" rx="4.5" fill="#E7DDCD" />
          </g>
        );
      })}
    </g>
  );
}

function PlannerBody({ p }: { p: (typeof palettes)[AccentKey] }) {
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  return (
    <g transform="translate(112 268)">
      {days.map((day, i) => (
        <g key={i} transform={`translate(0 ${i * 78})`}>
          <rect x="0" y="0" width="74" height="60" rx="14" fill={dots[i % dots.length]} opacity="0.9" />
          <text
            x="37"
            y="40"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="var(--font-serif), Georgia, serif"
            fontSize="30"
          >
            {day}
          </text>
          <rect x="94" y="6" width="248" height="14" rx="7" fill="#E7DDCD" />
          <rect x="94" y="34" width={186 - i * 12} height="14" rx="7" fill="#EFE7DA" />
          <rect x="374" y="0" width="182" height="60" rx="14" fill={p.bg} />
          <rect x="374" y="0" width="182" height="60" rx="14" stroke={p.mid} strokeWidth="2.4" fill="none" />
        </g>
      ))}
    </g>
  );
}

function CardsBody({ p }: { p: (typeof palettes)[AccentKey] }) {
  const tints = ['#F6DFA8', '#FBE0DC', '#DCE1D2', '#EDE6F6', '#F3D5C4', '#DDEAF1', '#E8F0E2', '#FAE5D8', '#EAE3F4'];
  return (
    <g transform="translate(116 264)">
      {tints.map((tint, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        return (
          <g key={i} transform={`translate(${col * 180} ${row * 172})`}>
            <rect x="0" y="0" width="158" height="150" rx="16" fill={tint} />
            <rect
              x="0"
              y="0"
              width="158"
              height="150"
              rx="16"
              stroke={p.mid}
              strokeWidth="2.4"
              strokeDasharray="9 8"
              fill="none"
            />
            <circle cx="79" cy="60" r="28" fill="#FFFFFF" opacity="0.72" />
            <path
              d="M64 58c0-9 7-15 15-15s15 6 15 15"
              stroke={p.ink}
              strokeWidth="3.4"
              fill="none"
              strokeLinecap="round"
            />
            <rect x="34" y="104" width="90" height="10" rx="5" fill="#FFFFFF" opacity="0.85" />
            <rect x="50" y="124" width="58" height="10" rx="5" fill="#FFFFFF" opacity="0.6" />
          </g>
        );
      })}
    </g>
  );
}

function RecipeBody({ p }: { p: (typeof palettes)[AccentKey] }) {
  return (
    <g>
      {/* Ingrédients */}
      <g transform="translate(118 268)">
        <rect x="0" y="0" width="244" height="318" rx="20" fill={p.bg} />
        <rect x="0" y="0" width="244" height="318" rx="20" stroke={p.mid} strokeWidth="2.6" fill="none" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i} transform={`translate(28 ${44 + i * 46})`}>
            <circle cx="0" cy="0" r="13" fill={dots[i % dots.length]} />
            <rect x="26" y="-6" width={160 - i * 14} height="12" rx="6" fill="#FFFFFF" />
          </g>
        ))}
      </g>
      {/* Étapes illustrées */}
      <g transform="translate(392 268)">
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(0 ${i * 82})`}>
            <rect x="0" y="0" width="66" height="66" rx="16" fill={p.soft} />
            <circle cx="33" cy="26" r="12" fill="#FFFFFF" opacity="0.85" />
            <path d="M18 46c8-11 22-11 30 0" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity="0.85" fill="none" />
            <text
              x="-4"
              y="44"
              fill={p.ink}
              fontFamily="var(--font-script), cursive"
              fontSize="30"
              textAnchor="end"
            >
              {i + 1}
            </text>
            <rect x="82" y="16" width={168 - i * 16} height="12" rx="6" fill="#E7DDCD" />
            <rect x="82" y="40" width={122 - i * 12} height="12" rx="6" fill="#EFE7DA" />
          </g>
        ))}
      </g>
    </g>
  );
}

function StackBody({ p }: { p: (typeof palettes)[AccentKey] }) {
  return (
    <g transform="translate(112 268)">
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        return (
          <g key={i} transform={`translate(${col * 280} ${row * 132})`}>
            <rect x="0" y="0" width="254" height="112" rx="16" fill="#FFFFFF" />
            <rect x="0" y="0" width="254" height="112" rx="16" stroke={p.mid} strokeWidth="2.4" fill="none" />
            <rect x="0" y="0" width="254" height="30" rx="16" fill={dots[i % dots.length]} opacity="0.85" />
            <rect x="0" y="22" width="254" height="8" fill={dots[i % dots.length]} opacity="0.85" />
            <rect x="22" y="52" width="150" height="11" rx="5.5" fill="#E7DDCD" />
            <rect x="22" y="76" width="106" height="11" rx="5.5" fill="#EFE7DA" />
            <circle cx="214" cy="70" r="20" fill={p.bg} />
          </g>
        );
      })}
    </g>
  );
}

function SheetBody({ layout, p }: { layout: Layout; p: (typeof palettes)[AccentKey] }) {
  if (layout === 'grid') return <GridBody p={p} />;
  if (layout === 'planner') return <PlannerBody p={p} />;
  if (layout === 'cards') return <CardsBody p={p} />;
  if (layout === 'recipe') return <RecipeBody p={p} />;
  if (layout === 'stack') return <StackBody p={p} />;
  return <ListBody p={p} />;
}

/** La feuille complète, utilisée par toutes les vues. */
function Sheet({
  layout,
  p,
  title,
  width = 760,
  height = 960,
}: {
  layout: Layout
  p: (typeof palettes)[AccentKey]
  title?: string
  width?: number
  height?: number
}) {
  return (
    <g>
      <rect x="0" y="0" width={width} height={height} rx="14" fill="#FFFDF9" />
      <rect x="0" y="0" width={width} height={height} rx="14" stroke="#EDE2D2" strokeWidth="3" fill="none" />
      <SheetHeader title={title} p={p} width={width} />
      <SheetBody layout={layout} p={p} />
      {/* Petit arc-en-ciel de pied de page */}
      <g transform={`translate(${width / 2 - 56} ${height - 74})`}>
        <path d="M0 26a56 56 0 0 1 112 0" stroke="#E8B44A" strokeWidth="9" fill="none" strokeLinecap="round" />
        <path d="M18 26a38 38 0 0 1 76 0" stroke="#E8837C" strokeWidth="9" fill="none" strokeLinecap="round" />
        <path d="M36 26a20 20 0 0 1 40 0" stroke="#A5AE8A" strokeWidth="9" fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}

/* --------------------------------- Vues ---------------------------------- */

function SheetView({ layout, p, title }: { layout: Layout; p: (typeof palettes)[AccentKey]; title?: string }) {
  return (
    <g>
      <g transform="translate(24 22) rotate(-1.6 380 480)" opacity="0.5">
        <rect x="0" y="0" width="760" height="960" rx="14" fill="#F1E8DA" />
      </g>
      <g transform="translate(20 20)" filter="url(#lprShadow)">
        <Sheet layout={layout} p={p} title={title} />
      </g>
    </g>
  );
}

function ZoomView({ layout, p, title }: { layout: Layout; p: (typeof palettes)[AccentKey]; title?: string }) {
  return (
    <g>
      <g transform="translate(-160 -150) scale(1.42)" filter="url(#lprShadow)">
        <Sheet layout={layout} p={p} title={title} />
      </g>
      <circle cx="400" cy="500" r="330" fill="none" stroke={p.mid} strokeWidth="4" strokeDasharray="14 16" opacity="0.5" />
    </g>
  );
}

function PrintedView({ layout, p, title }: { layout: Layout; p: (typeof palettes)[AccentKey]; title?: string }) {
  return (
    <g>
      <g transform="rotate(-7 400 520) translate(56 96) scale(0.82)" filter="url(#lprShadowSoft)">
        <rect x="0" y="0" width="760" height="960" rx="14" fill="#FBF4E9" stroke="#EDE2D2" strokeWidth="3" />
      </g>
      <g transform="rotate(3.5 400 520) translate(108 64) scale(0.82)" filter="url(#lprShadowSoft)">
        <rect x="0" y="0" width="760" height="960" rx="14" fill="#FDF8F0" stroke="#EDE2D2" strokeWidth="3" />
      </g>
      <g transform="translate(60 44) scale(0.84)" filter="url(#lprShadow)">
        <Sheet layout={layout} p={p} title={title} />
      </g>
      {/* Crayons posés à côté */}
      <g transform="translate(620 690) rotate(-16)">
        {['#E8837C', '#E8B44A', '#A5AE8A', '#B9A7D6'].map((c, i) => (
          <g key={c} transform={`translate(${i * 26} ${i * 8})`}>
            <rect x="0" y="0" width="16" height="200" rx="8" fill={c} />
            <path d="M0 200l8 22 8-22z" fill="#EFE3D3" />
            <path d="M4 214l4 8 4-8z" fill="#7C6E60" />
          </g>
        ))}
      </g>
    </g>
  );
}

function LifestyleView({ layout, p, title }: { layout: Layout; p: (typeof palettes)[AccentKey]; title?: string }) {
  return (
    <g>
      <rect x="0" y="0" width="800" height="1000" fill="#EBD9BE" />
      <g stroke="#DFC9A8" strokeWidth="7" opacity="0.75">
        <path d="M0 190h800M0 470h800M0 760h800" />
      </g>
      <ellipse cx="400" cy="560" rx="352" ry="312" fill="#FBF5EB" />

      <g transform="rotate(-5 400 520) translate(178 216) scale(0.58)" filter="url(#lprShadow)">
        <Sheet layout={layout} p={p} title={title} />
      </g>

      {/* Tasse */}
      <g transform="translate(596 742)">
        <path d="M0 0h96v48a34 34 0 0 1-34 34H34A34 34 0 0 1 0 48z" fill="#F4EADC" stroke="#E0D3C0" strokeWidth="3" />
        <path d="M96 12h14a20 20 0 0 1 0 40H96" fill="none" stroke="#F4EADC" strokeWidth="11" />
        <ellipse cx="48" cy="1" rx="47" ry="9" fill="#B98A5F" />
      </g>

      {/* Crayons */}
      <g transform="translate(96 150) rotate(14)">
        {['#E8B44A', '#A5AE8A', '#E8837C'].map((c, i) => (
          <g key={c} transform={`translate(${i * 24} ${i * 6})`}>
            <rect x="0" y="0" width="15" height="150" rx="7.5" fill={c} />
            <path d="M0 150l7.5 20 7.5-20z" fill="#EFE3D3" />
          </g>
        ))}
      </g>

      {/* Feuillage */}
      <g stroke="#9AA983" strokeWidth="5" fill="none">
        <path d="M104 830c-24-6-38-24-40-50 26 5 41 23 40 50Z" />
        <path d="M150 856c-5-26 9-46 34-54 5 27-9 47-34 54Z" />
        <path d="M690 190c24-6 38-24 40-50-26 5-41 23-40 50Z" />
      </g>
    </g>
  );
}

/* -------------------------------- Composant ------------------------------- */

export function ProductVisual({
  motif,
  accent,
  variant = 'sheet',
  title,
  alt,
  className = '',
}: Props) {
  const p = palettes[accent] ?? palettes.sage;
  const layout = layoutByMotif[motif] ?? 'list';

  // Un `alt` vide signale un visuel purement décoratif : il est alors masqué
  // aux lecteurs d'écran plutôt qu'annoncé comme une image sans nom.
  const decorative = alt.trim().length === 0;

  return (
    <svg
      viewBox="0 0 800 1000"
      fill="none"
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : alt}
      aria-hidden={decorative ? true : undefined}
      focusable="false"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id="lprShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="14" stdDeviation="18" floodColor="#8A7154" floodOpacity="0.16" />
        </filter>
        <filter id="lprShadowSoft" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#8A7154" floodOpacity="0.1" />
        </filter>
        <linearGradient id={`lprBg-${accent}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.bg} />
          <stop offset="100%" stopColor="#FEFBF6" />
        </linearGradient>
      </defs>

      {variant !== 'lifestyle' && (
        <>
          <rect width="800" height="1000" fill={`url(#lprBg-${accent})`} />
          <circle cx="104" cy="120" r="150" fill="#FFFFFF" opacity="0.45" />
          <circle cx="716" cy="884" r="180" fill={p.soft} opacity="0.35" />
        </>
      )}

      {variant === 'sheet' && <SheetView layout={layout} p={p} title={title} />}
      {variant === 'zoom' && <ZoomView layout={layout} p={p} title={title} />}
      {variant === 'printed' && <PrintedView layout={layout} p={p} title={title} />}
      {variant === 'lifestyle' && <LifestyleView layout={layout} p={p} title={title} />}
    </svg>
  );
}

export function accentPalette(accent: AccentKey) {
  return palettes[accent] ?? palettes.sage;
}
