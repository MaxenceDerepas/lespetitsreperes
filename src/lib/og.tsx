import { readFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * Cartes de partage (Open Graph).
 *
 * Elles sont générées à la volée en 1200 × 630 par `next/og`, dans la
 * typographie et les couleurs de la marque. Deux bénéfices :
 *
 *  1. un aperçu soigné quand un lien est partagé sur les réseaux, dans un
 *     message ou dans une conversation ;
 *  2. une vraie URL d'image à fournir aux données structurées — sans elle,
 *     Google refuse les résultats enrichis produit (prix, étoiles).
 *
 * Les polices sont des versions allégées (sous-ensemble latin) placées dans
 * `src/app/og-fonts/`. Elles ne sont lues que côté serveur, à la génération :
 * elles ne sont jamais envoyées au navigateur du visiteur.
 *
 * Note typographique : le site affiche ses titres en Cormorant Garamond, mais
 * le moteur de rendu des cartes (satori) place mal les accents de cette fonte —
 * l'accent de « Repères » se retrouve au-dessus du « p ». EB Garamond, de la
 * même famille de Garamond et très proche à l'œil, est rendue correctement :
 * c'est elle qui sert uniquement ici, pour les images de partage.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

const fontDir = path.join(process.cwd(), 'src', 'app', 'og-fonts');

/**
 * Le logo de la marque, encodé en base64 pour être intégré directement dans
 * la carte : le moteur de rendu ne peut pas aller chercher une URL relative.
 * Lu une seule fois, puis gardé en mémoire.
 */
let logoDataUrl: string | null = null;

export async function loadOgLogo(): Promise<string> {
  if (!logoDataUrl) {
    const file = await readFile(
      path.join(process.cwd(), 'public', 'marque', 'logo-512.png'),
    );
    logoDataUrl = `data:image/png;base64,${file.toString('base64')}`;
  }
  return logoDataUrl;
}

export async function loadOgFonts() {
  const [serif, sans, sansBold, script] = await Promise.all([
    readFile(path.join(fontDir, 'garamond-600.ttf')),
    readFile(path.join(fontDir, 'nunito-400.ttf')),
    readFile(path.join(fontDir, 'nunito-600.ttf')),
    readFile(path.join(fontDir, 'script-600.ttf')),
  ]);

  return [
    { name: 'Garamond', data: serif, weight: 600 as const, style: 'normal' as const },
    { name: 'Nunito', data: sans, weight: 400 as const, style: 'normal' as const },
    { name: 'Nunito', data: sansBold, weight: 600 as const, style: 'normal' as const },
    { name: 'Script', data: script, weight: 600 as const, style: 'normal' as const },
  ];
}

/* --------------------------- Ornements ---------------------------- */

const sprigSvg =
  `data:image/svg+xml;base64,${Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 96" fill="none">
      <path d="M8 10c30 14 58 36 82 66" stroke="#A5AE8A" stroke-width="3.4" stroke-linecap="round"/>
      <g fill="#A5AE8A">
        <ellipse cx="22" cy="8" rx="17" ry="9.5" transform="rotate(-24 22 8)"/>
        <ellipse cx="54" cy="22" rx="18" ry="10" transform="rotate(-16 54 22)"/>
        <ellipse cx="82" cy="44" rx="18" ry="10" transform="rotate(-6 82 44)"/>
        <ellipse cx="32" cy="38" rx="15" ry="8.5" transform="rotate(28 32 38)"/>
        <ellipse cx="62" cy="62" rx="16" ry="9" transform="rotate(34 62 62)"/>
        <ellipse cx="92" cy="78" rx="15" ry="8.5" transform="rotate(16 92 78)"/>
      </g>
    </svg>`,
  ).toString('base64')}`;

const rainbowSvg = `data:image/svg+xml;base64,${Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 84" fill="none">
    <path d="M8 76a72 72 0 0 1 144 0" stroke="#E8B44A" stroke-width="13" fill="none" stroke-linecap="round"/>
    <path d="M32 76a48 48 0 0 1 96 0" stroke="#E8837C" stroke-width="13" fill="none" stroke-linecap="round"/>
    <path d="M56 76a24 24 0 0 1 48 0" stroke="#A5AE8A" stroke-width="13" fill="none" stroke-linecap="round"/>
  </svg>`,
).toString('base64')}`;

/* ----------------------------- Carte ------------------------------ */

export interface OgCardProps {
  /** Logo encodé, fourni par `loadOgLogo()`. */
  logo: string
  /** Petite ligne en capitales au-dessus du titre. */
  eyebrow?: string
  title: string
  subtitle?: string
  /** Pastille en bas à droite : le prix, ou « Nouveau ». */
  badge?: string
  /** Mot manuscrit sous le titre, pour les cartes éditoriales. */
  flourish?: string
}

export function OgCard({ logo, eyebrow, title, subtitle, badge, flourish }: OgCardProps) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '48px 72px 52px',
        backgroundColor: '#FDF8F1',
        fontFamily: 'Nunito',
        position: 'relative',
      }}
    >
      {/* Aplats décoratifs */}
      <div
        style={{
          position: 'absolute',
          top: -140,
          right: -120,
          width: 460,
          height: 460,
          borderRadius: 999,
          backgroundColor: '#FAEDE2',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -170,
          left: -110,
          width: 380,
          height: 380,
          borderRadius: 999,
          backgroundColor: '#EDF0E6',
        }}
      />
      <img src={sprigSvg} width={150} height={90} alt="" style={{ position: 'absolute', top: 54, right: 92 }} />
      {/* L'arc-en-ciel laisse la place à la pastille de prix quand il y en a une. */}
      {!badge && (
        <img src={rainbowSvg} width={132} height={70} alt="" style={{ position: 'absolute', bottom: 54, right: 86 }} />
      )}

      {/* Marque — le logo original, jamais une reconstitution */}
      <div style={{ display: 'flex', flexShrink: 0 }}>
        <img src={logo} width={150} height={150} alt="" />
      </div>

      {/* Contenu */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: 800,
          paddingTop: 10,
          paddingBottom: 18,
        }}
      >
        {eyebrow && (
          <span
            style={{
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: '#5F6B51',
              marginBottom: 18,
            }}
          >
            {eyebrow}
          </span>
        )}

        <span
          style={{
            fontFamily: 'Garamond',
            fontSize: title.length > 60 ? 50 : title.length > 40 ? 60 : 70,
            lineHeight: 1.08,
            color: '#5F6B51',
          }}
        >
          {title}
        </span>

        {flourish && (
          <span style={{ fontFamily: 'Script', fontSize: 52, color: '#B05836', marginTop: 4 }}>
            {flourish}
          </span>
        )}

        {subtitle && (
          <span style={{ fontSize: 22, lineHeight: 1.45, color: '#756759', marginTop: 18 }}>
            {subtitle}
          </span>
        )}
      </div>

      {/* Pied */}
      <div style={{ display: 'flex', flexShrink: 0, alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 22, color: '#736860' }}>lespetitsreperes.fr</span>
        {badge && (
          <span
            style={{
              display: 'flex',
              fontSize: 26,
              fontWeight: 600,
              color: '#FFFFFF',
              backgroundColor: '#B05836',
              padding: '12px 28px',
              borderRadius: 999,
            }}
          >
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
