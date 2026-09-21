/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Les PDF de `private/files/` sont lus au moment de la requête, jamais
  // importés : sans cette ligne, un hébergeur serverless (Vercel, Netlify) ne
  // les embarquerait pas dans la fonction et le téléchargement renverrait 503.
  outputFileTracingIncludes: {
    '/api/download/[token]': ['./private/files/**/*'],
  },
  // Articles retirés du blog : on renvoie l'ancienne adresse vers l'article
  // qui traite le même sujet, plutôt que de laisser une page 404 — les liens
  // déjà partagés et l'historique de référencement restent valables.
  async redirects() {
    return [
      {
        source: '/blog/organiser-la-semaine-en-vingt-minutes-le-dimanche',
        destination: '/blog/rituel-du-dimanche-soir-preparer-la-semaine',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Les fichiers PDF ne sont jamais servis statiquement : ils passent
        // toujours par /api/download/[token]. On empêche l'indexation de ces URLs.
        source: '/api/download/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

export default nextConfig;
