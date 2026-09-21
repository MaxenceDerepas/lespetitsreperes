import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

/**
 * Configuration ESLint au format « flat » (ESLint 9).
 *
 * `eslint-config-next` est encore livré à l'ancien format : FlatCompat fait le
 * pont. On active les règles Next.js, les Core Web Vitals et les règles
 * d'accessibilité JSX, qui relèvent la plupart des oublis d'alt, de label ou
 * d'attribut ARIA avant la mise en ligne.
 */

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

const config = [
  // next-env.d.ts est généré par Next.js à chaque build : on ne le corrige pas.
  { ignores: ['.next/**', 'node_modules/**', 'out/**', '.data/**', 'private/**', 'next-env.d.ts'] },
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'plugin:jsx-a11y/recommended'),
  {
    rules: {
      // Les visuels produits sont des SVG générés, pas des images bitmap :
      // la règle sur next/image ne s'applique pas ici.
      '@next/next/no-img-element': 'off',
    },
  },
];

export default config;
