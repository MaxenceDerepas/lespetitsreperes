import localFont from 'next/font/local';

/**
 * Typographies du site — auto-hébergées.
 *
 * Les fichiers .woff2 sont livrés avec le projet (`src/app/fonts/`) plutôt que
 * téléchargés depuis Google Fonts au moment du build. Trois raisons :
 *
 *  1. Confidentialité : aucune requête du visiteur vers un serveur tiers.
 *     C'est le point régulièrement soulevé par la CNIL à propos de Google Fonts,
 *     et cela évite d'avoir à le mentionner dans la politique de confidentialité.
 *  2. Performance : pas de DNS ni de CSS tiers bloquant, `preload` automatique
 *     géré par next/font, et aucun décalage de mise en page.
 *  3. Robustesse : le projet se construit et fonctionne sans accès à Internet.
 *
 * Seul le sous-ensemble « latin » est embarqué : il couvre l'intégralité du
 * français, ligature œ et guillemets compris (176 Ko au total pour les trois
 * familles).
 *
 *  - serif  : Cormorant Garamond — titres éditoriaux
 *  - sans   : Nunito Sans — corps de texte
 *  - script : Dancing Script — la signature manuscrite de la marque,
 *    reprise du bandeau d'accueil ; accents décoratifs, jamais de paragraphe
 *
 * Pour changer une police : déposer le .woff2 dans `src/app/fonts/` et mettre
 * le chemin à jour ci-dessous. Les familles de secours sont indiquées pour que
 * la mise en page reste correcte pendant le tout premier chargement.
 */

const serif = localFont({
  src: [
    { path: './fonts/cormorant-garamond-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/cormorant-garamond-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/cormorant-garamond-latin-600-normal.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-serif',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  adjustFontFallback: 'Times New Roman',
});

const sans = localFont({
  src: [
    { path: './fonts/nunito-sans-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/nunito-sans-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: './fonts/nunito-sans-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

const script = localFont({
  // Une seule graisse suffit pour quelques mots décoratifs : la plage
  // 400-700 évite que le navigateur ne fabrique un faux gras.
  src: [{ path: './fonts/dancing-script-latin-600-normal.woff2', weight: '400 700', style: 'normal' }],
  variable: '--font-script',
  display: 'swap',
  fallback: ['Segoe Script', 'cursive'],
  adjustFontFallback: false,
});

export const fontVariables = `${serif.variable} ${sans.variable} ${script.variable}`;
