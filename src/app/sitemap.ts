import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { categories, getAllProducts } from '@/lib/catalog';
import { getAllPosts } from '@/lib/blog';

/**
 * Plan du site, généré automatiquement depuis le catalogue et le blog :
 * ajouter un produit ou un article suffit, rien à maintenir ici.
 * Les pages privées (panier, paiement, compte, téléchargements) en sont exclues.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/boutique`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${site.url}/categories`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site.url}/a-propos`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${site.url}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${site.url}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${site.url}/cgv`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${site.url}/confidentialite`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${site.url}/mentions-legales`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const productPages: MetadataRoute.Sitemap = getAllProducts().map((product) => ({
    url: `${site.url}/boutique/${product.slug}`,
    lastModified: new Date(product.createdAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${site.url}/categories/${category.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const postPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...staticPages, ...productPages, ...categoryPages, ...postPages];
}
