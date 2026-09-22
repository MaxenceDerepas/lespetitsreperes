import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

/**
 * Directives d'indexation.
 * Tout ce qui touche au panier, au paiement, au compte et surtout aux
 * téléchargements est exclu des moteurs de recherche.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/panier',
          '/commande',
          '/compte',
          '/connexion',
          '/creer-un-compte',
          '/mot-de-passe-oublie',
          '/telechargements/',
          '/admin',
        ],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
