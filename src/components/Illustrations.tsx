/**
 * Grandes illustrations de marque, dessinées en SVG.
 *
 * HeroScene reprend la mise en scène de la photo de référence : un mur clair
 * avec une affiche encadrée, une branche d'eucalyptus dans un vase côtelé, une
 * tasse de café, la fiche « Ma routine du matin » posée sur la table, des
 * cartes à découper, deux carnets et un petit panier en osier.
 *
 * Tout est vectoriel : aucun appel réseau, netteté parfaite sur tous les
 * écrans, et la scène se recolore avec la charte si elle évolue. Pour passer à
 * de vraies photos plus tard, il suffit de remplacer ce composant par un
 * `next/image` — l'API ne change pas.
 */

/* --------------------------- Éléments réutilisables --------------------------- */

function EucalyptusStem({
  x,
  y,
  rotate = 0,
  scale = 1,
  leaves = 6,
}: {
  x: number
  y: number
  rotate?: number
  scale?: number
  leaves?: number
}) {
  const items = Array.from({ length: leaves }, (_, i) => i);
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path d="M0 0C6 -40 14 -78 26 -118" stroke="#8E9B79" strokeWidth="3" fill="none" strokeLinecap="round" />
      {items.map((i) => {
        const t = i / (leaves - 1);
        const px = 6 * t + 20 * t * t;
        const py = -20 - t * 100;
        const side = i % 2 === 0 ? 1 : -1;
        const rot = side === 1 ? -35 + t * 18 : 35 - t * 18;
        const r = 17 - t * 4;
        return (
          <g key={i} transform={`translate(${px + side * 14} ${py}) rotate(${rot})`}>
            <ellipse rx={r} ry={r * 0.62} fill={i % 3 === 0 ? '#AEBB95' : '#9AA983'} />
            <ellipse rx={r} ry={r * 0.62} fill="none" stroke="#7E8C68" strokeWidth="1.1" />
          </g>
        );
      })}
    </g>
  );
}

function RibbedVase({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 0h96v92a26 26 0 0 1-26 26H26A26 26 0 0 1 0 92z" fill="#FBF7F1" />
      <path d="M0 0h96v92a26 26 0 0 1-26 26H26A26 26 0 0 1 0 92z" fill="none" stroke="#E3D8C9" strokeWidth="2" />
      <g stroke="#EDE4D8" strokeWidth="3" strokeLinecap="round">
        <path d="M14 12v92M28 10v96M42 9v98M56 9v98M70 10v96M84 12v92" />
      </g>
      <ellipse cx="48" cy="0" rx="48" ry="9" fill="#F3ECE1" stroke="#E3D8C9" strokeWidth="2" />
    </g>
  );
}

function FramedPoster({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="0" width="212" height="268" rx="6" fill="#DDB98E" />
      <rect x="0" y="0" width="212" height="268" rx="6" stroke="#C9A171" strokeWidth="2.5" fill="none" />
      <rect x="13" y="13" width="186" height="242" rx="2" fill="#FDFAF4" />
      <path d="M106 44v18M99 52l7-8 7 8" stroke="#A5AE8A" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <g fill="#6B6152" fontFamily="var(--font-serif), Georgia, serif" fontSize="25" textAnchor="middle">
        <text x="106" y="112">Profite</text>
        <text x="106" y="147">des jolies</text>
        <text x="106" y="182">choses</text>
        <text x="106" y="217">de la vie</text>
      </g>
      <path
        d="M106 240s-8-4.8-8-9.4a4 4 0 0 1 8-1.6 4 4 0 0 1 8 1.6c0 4.6-8 9.4-8 9.4Z"
        fill="#E8A79C"
      />
    </g>
  );
}

function Mug({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M22 -34c6-9 2-16-2-22M46 -38c6-9 2-16-2-22"
        stroke="#DED3C4"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M0 0h84v42a30 30 0 0 1-30 30H30A30 30 0 0 1 0 42z" fill="#F4EADC" />
      <path d="M0 0h84v42a30 30 0 0 1-30 30H30A30 30 0 0 1 0 42z" fill="none" stroke="#E0D3C0" strokeWidth="2" />
      <path d="M84 12h12a17 17 0 0 1 0 34H84" fill="none" stroke="#F4EADC" strokeWidth="10" />
      <path d="M84 12h12a17 17 0 0 1 0 34H84" fill="none" stroke="#E0D3C0" strokeWidth="2" />
      <ellipse cx="42" cy="1" rx="41" ry="8.5" fill="#B98A5F" />
      <ellipse cx="42" cy="1" rx="41" ry="8.5" fill="none" stroke="#EFE3D3" strokeWidth="3" />
    </g>
  );
}

function RoutineSheet({ x, y, rotate = 0 }: { x: number; y: number; rotate?: number }) {
  const rows = [
    { color: '#E8837C', label: 78 },
    { color: '#E8B44A', label: 96 },
    { color: '#A5AE8A', label: 70 },
    { color: '#B9A7D6', label: 88 },
    { color: '#D98262', label: 64 },
  ];

  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`} filter="url(#heroShadow)">
      <rect x="0" y="0" width="264" height="214" rx="7" fill="#FFFFFF" />
      <rect x="0" y="0" width="264" height="214" rx="7" stroke="#EBE0D0" strokeWidth="1.6" fill="none" />

      {/* Titre manuscrit */}
      <text
        x="40"
        y="34"
        fill="#7C8A69"
        fontFamily="var(--font-script), cursive"
        fontSize="21"
      >
        Ma routine
      </text>
      <text
        x="112"
        y="52"
        fill="#C4694A"
        fontFamily="var(--font-serif), Georgia, serif"
        fontSize="19"
        letterSpacing="2"
      >
        DU MATIN
      </text>
      <g transform="translate(196 18) scale(0.42)">
        <path d="M6 20a14 14 0 0 1 28 0z" fill="#E8B44A" />
        <path d="M20 -4v6M6 3l3 4M34 3l-3 4" stroke="#E8B44A" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Lignes de la routine */}
      {rows.map((row, i) => (
        <g key={i} transform={`translate(0 ${72 + i * 26})`}>
          <circle cx="32" cy="0" r="8.5" fill={row.color} />
          <rect x="47" y="-7" width="14" height="14" rx="3" fill="#F3ECE1" />
          <rect x="68" y="-3" width={row.label} height="5" rx="2.5" fill="#E2D8C8" />
          <circle cx="232" cy="0" r="8" fill="none" stroke="#D8CCBA" strokeWidth="2" />
        </g>
      ))}

      <path
        d="M96 196c8-7 16-7 24 0s16 7 24 0"
        stroke="#E8B44A"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
}

function CutoutCards({ x, y }: { x: number; y: number }) {
  const tints = ['#F6DFA8', '#FBE0DC', '#DCE1D2', '#EDE6F6', '#F3D5C4', '#E8F0E2'];
  return (
    <g transform={`translate(${x} ${y})`} filter="url(#heroShadowSoft)">
      <rect x="-8" y="-8" width="148" height="104" rx="6" fill="#FFFFFF" />
      <rect x="-8" y="-8" width="148" height="104" rx="6" stroke="#EBE0D0" strokeWidth="1.4" fill="none" />
      {tints.map((tint, i) => (
        <g key={i} transform={`translate(${(i % 3) * 44} ${Math.floor(i / 3) * 44})`}>
          <rect x="0" y="0" width="38" height="38" rx="5" fill={tint} />
          <rect x="0" y="0" width="38" height="38" rx="5" stroke="#E0D4C2" strokeWidth="1.2" fill="none" />
          <circle cx="19" cy="15" r="6" fill="#FFFFFF" opacity="0.75" />
          <path d="M9 30c2.6-4.4 16.4-4.4 20 0" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.75" fill="none" />
        </g>
      ))}
    </g>
  );
}

function Notebook({ x, y, rotate, tint }: { x: number; y: number; rotate: number; tint: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`} filter="url(#heroShadowSoft)">
      <rect x="0" y="0" width="150" height="104" rx="7" fill={tint} />
      <rect x="0" y="0" width="150" height="104" rx="7" stroke="#B5C09C" strokeWidth="1.6" fill="none" />
      <g stroke="#F6F0E6" strokeWidth="3" strokeLinecap="round">
        <path d="M6 14h12M6 30h12M6 46h12M6 62h12M6 78h12M6 90h12" />
      </g>
      <text
        x="86"
        y="52"
        fill="#F6F0E6"
        fontFamily="var(--font-script), cursive"
        fontSize="19"
        textAnchor="middle"
      >
        petits pas
      </text>
      <path d="M52 62h68" stroke="#F6F0E6" strokeWidth="1.6" opacity="0.8" />
    </g>
  );
}

function Basket({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* Lapin en peluche */}
      <g transform="translate(34 -52)">
        <ellipse cx="34" cy="26" rx="26" ry="24" fill="#F0E4D2" />
        <ellipse cx="34" cy="26" rx="26" ry="24" fill="none" stroke="#DCCAB2" strokeWidth="2" />
        <path d="M20 8c-5-16-2-28 4-28s8 13 5 28z" fill="#F0E4D2" stroke="#DCCAB2" strokeWidth="2" />
        <path d="M48 8c5-16 2-28-4-28s-8 13-5 28z" fill="#F0E4D2" stroke="#DCCAB2" strokeWidth="2" />
        <circle cx="26" cy="24" r="2.4" fill="#8A7A66" />
        <circle cx="42" cy="24" r="2.4" fill="#8A7A66" />
        <path d="M30 32c2.4 2.6 5.6 2.6 8 0" stroke="#C99B8A" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      </g>
      {/* Panier */}
      <path d="M0 0h136l-16 92a12 12 0 0 1-12 10H28a12 12 0 0 1-12-10z" fill="#E0C49B" />
      <path d="M0 0h136l-16 92a12 12 0 0 1-12 10H28a12 12 0 0 1-12-10z" stroke="#C9A878" strokeWidth="2" fill="none" />
      <path d="M-4 0h144v16H-4z" fill="#D6B685" stroke="#C9A878" strokeWidth="2" />
      <g stroke="#C9A878" strokeWidth="2.6" opacity="0.85">
        <path d="M32 20l-8 78M60 20l-3 78M92 20l3 78M116 20l6 78" />
        <path d="M10 48h116M14 74h108" />
      </g>
    </g>
  );
}

/* --------------------------------- Hero ---------------------------------- */

export function HeroScene({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 900 700"
      fill="none"
      role="img"
      aria-label="Une table en bois clair devant un mur crème : une affiche encadrée « Profite des jolies choses de la vie », une branche d’eucalyptus dans un vase côtelé, une tasse de café, la fiche « Ma routine du matin » imprimée avec ses cartes à découper, deux carnets et un panier en osier"
      className={className}
    >
      <defs>
        <clipPath id="heroClip">
          <rect x="0" y="0" width="900" height="700" rx="26" />
        </clipPath>
        <linearGradient id="heroWall" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor="#FAF5EC" />
          <stop offset="100%" stopColor="#F3ECE0" />
        </linearGradient>
        <linearGradient id="heroWood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E9D7BC" />
          <stop offset="100%" stopColor="#DFC9A8" />
        </linearGradient>
        <radialGradient id="heroLight" cx="0.28" cy="0.1" r="0.9">
          <stop offset="0%" stopColor="#FFFDF7" stopOpacity="0.75" />
          <stop offset="60%" stopColor="#FFFBF2" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <filter id="heroShadow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#8A7154" floodOpacity="0.18" />
        </filter>
        <filter id="heroShadowSoft" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="7" stdDeviation="10" floodColor="#8A7154" floodOpacity="0.13" />
        </filter>
      </defs>

      <g clipPath="url(#heroClip)">
        {/* Mur et plan de travail */}
        <rect width="900" height="700" fill="url(#heroWall)" />
        <rect y="436" width="900" height="264" fill="url(#heroWood)" />
        <g stroke="#D6BD9B" strokeWidth="2.4" opacity="0.55">
          <path d="M0 470h900M0 522h900M0 580h900M0 642h900" />
        </g>
        <rect y="436" width="900" height="10" fill="#EFDFC5" />

        {/* Affiche encadrée */}
        <g filter="url(#heroShadowSoft)">
          <FramedPoster x={498} y={92} />
        </g>

        {/* Eucalyptus dans son vase */}
        <g>
          <EucalyptusStem x={228} y={318} rotate={-6} scale={1.05} leaves={6} />
          <EucalyptusStem x={252} y={322} rotate={12} scale={0.92} leaves={5} />
          <EucalyptusStem x={206} y={324} rotate={-22} scale={0.86} leaves={5} />
          <g filter="url(#heroShadowSoft)">
            <RibbedVase x={188} y={318} />
          </g>
        </g>

        {/* Panier et peluche */}
        <g filter="url(#heroShadowSoft)">
          <Basket x={724} y={324} />
        </g>

        {/* Tasse */}
        <g filter="url(#heroShadowSoft)">
          <Mug x={344} y={392} />
        </g>

        {/* Fiche routine, cartes et carnets */}
        <RoutineSheet x={300} y={452} rotate={-2.5} />
        <g transform="translate(596 470)">
          <CutoutCards x={0} y={0} />
        </g>
        <Notebook x={86} y={520} rotate={-9} tint="#A9B692" />
        <Notebook x={604} y={566} rotate={7} tint="#93A37C" />

        {/* Petites baies et feuilles posées */}
        <g fill="#D98262" opacity="0.9">
          <circle cx="470" cy="418" r="6" />
          <circle cx="492" cy="430" r="4" />
        </g>
        <g stroke="#9AA983" strokeWidth="2.6" fill="none">
          <path d="M840 470c-14-4-22-14-24-28 15 3 24 13 24 28Z" />
          <path d="M866 486c-2-14 5-25 18-30 3 15-4 26-18 30Z" />
        </g>

        {/* Lumière naturelle */}
        <rect width="900" height="700" fill="url(#heroLight)" />
        <rect x="1" y="1" width="898" height="698" rx="26" fill="none" stroke="#EADCC6" strokeWidth="2" />
      </g>
    </svg>
  );
}

/* ------------------------------- À propos -------------------------------- */

export function AboutVisual({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      role="img"
      aria-label="Illustration de deux enfants attablés en train de remplir une fiche de routine imprimée, à côté d’une tasse et d’un pot à crayons"
      className={className}
    >
      <defs>
        <clipPath id="aboutClip">
          <circle cx="200" cy="200" r="196" />
        </clipPath>
        <linearGradient id="aboutBg" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#FBF6EC" />
          <stop offset="100%" stopColor="#F1E7D6" />
        </linearGradient>
      </defs>

      <g clipPath="url(#aboutClip)">
        <rect width="400" height="400" fill="url(#aboutBg)" />
        <circle cx="96" cy="84" r="74" fill="#FFFFFF" opacity="0.45" />

        {/* Fenêtre suggérée */}
        <rect x="248" y="42" width="120" height="120" rx="8" fill="#FBF7EE" stroke="#E2D5C0" strokeWidth="3" />
        <path d="M308 42v120M248 102h120" stroke="#E2D5C0" strokeWidth="3" />

        {/* Table */}
        <path d="M0 268h400v132H0z" fill="#E6D3B6" />
        <path d="M0 268h400v10H0z" fill="#EFDFC5" />

        {/* Deux enfants de dos */}
        <g>
          <path d="M92 268c2-44 22-70 52-70s50 26 52 70z" fill="#A9B692" />
          <circle cx="144" cy="176" r="32" fill="#EFCDAE" />
          <path
            d="M112 172c0-24 14-40 32-40s32 16 32 40c0 7-4 10-7 7-5-5-13-9-25-9s-20 4-25 9c-3 3-7 0-7-7Z"
            fill="#7A6450"
          />
          <path d="M206 268c2-38 19-60 45-60s43 22 45 60z" fill="#D98262" />
          <circle cx="251" cy="188" r="27" fill="#F0D3B6" />
          <path
            d="M224 185c0-20 12-34 27-34s27 14 27 34c0 6-3 9-6 6-4-4-11-7-21-7s-17 3-21 7c-3 3-6 0-6-6Z"
            fill="#9A7A55"
          />
        </g>

        {/* Fiche posée entre eux */}
        <g transform="rotate(-5 200 330)">
          <rect x="110" y="292" width="180" height="104" rx="7" fill="#FFFFFF" stroke="#E7DBC8" strokeWidth="2" />
          <text x="126" y="316" fill="#7C8A69" fontFamily="var(--font-script), cursive" fontSize="17">
            Ma routine
          </text>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(0 ${336 + i * 20})`}>
              <circle cx="128" cy="0" r="6" fill={['#E8837C', '#E8B44A', '#A5AE8A'][i]} />
              <rect x="142" y="-3" width={92 - i * 14} height="5" rx="2.5" fill="#E4DACA" />
              <circle cx="266" cy="0" r="5.5" fill="none" stroke="#D8CCBA" strokeWidth="1.8" />
            </g>
          ))}
        </g>

        {/* Tasse et pot à crayons */}
        <g transform="translate(316 292)">
          <path d="M0 0h48v24a17 17 0 0 1-17 17H17A17 17 0 0 1 0 24z" fill="#F4EADC" stroke="#E0D3C0" strokeWidth="2" />
          <path d="M48 7h8a9 9 0 0 1 0 18h-8" fill="none" stroke="#F4EADC" strokeWidth="6" />
          <ellipse cx="24" cy="1" rx="23" ry="5" fill="#B98A5F" />
        </g>
        <g transform="translate(36 300)">
          {['#E8837C', '#E8B44A', '#A5AE8A', '#B9A7D6'].map((c, i) => (
            <g key={c} transform={`translate(${i * 11} ${-i * 4})`}>
              <rect x="0" y="-34" width="8" height="42" rx="4" fill={c} />
              <path d="M0-34l4-9 4 9z" fill="#EFE3D3" />
            </g>
          ))}
          <path d="M-8 4h68l-7 44a10 10 0 0 1-10 9H5a10 10 0 0 1-10-9z" fill="#EFE3D3" stroke="#DCCDB6" strokeWidth="2" />
        </g>
      </g>
      <circle cx="200" cy="200" r="194" fill="none" stroke="#FFFFFF" strokeWidth="9" />
      <circle cx="200" cy="200" r="198" fill="none" stroke="#E7D8C1" strokeWidth="2" />
    </svg>
  );
}
