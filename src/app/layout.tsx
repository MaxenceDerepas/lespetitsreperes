import type { Metadata, Viewport } from 'next';
import './globals.css';
import { fontVariables } from './fonts';
import { site } from '@/lib/site';
import { CartProvider } from '@/components/cart-context';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — fiches et packs PDF à imprimer pour les familles`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    'activités à imprimer enfant',
    'fiches activités enfant PDF',
    'routine enfant à imprimer',
    'semainier enfant à imprimer',
    'outils émotions enfant',
    'recettes enfant à imprimer',
    'supports autonomie enfant',
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — des outils doux pour une vie de famille épanouie`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — des outils doux pour les familles`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'shopping',
};

export const viewport: Viewport = {
  themeColor: '#FEFBF6',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'OnlineStore',
    name: site.name,
    url: site.url,
    slogan: site.promise,
    description: site.description,
    email: site.email,
    areaServed: 'FR',
    sameAs: [site.instagram],
    // Google exige un logo matriciel (112 px minimum) pour afficher la marque
    // dans le panneau de connaissance et les résultats enrichis.
    logo: { '@type': 'ImageObject', url: `${site.url}/marque/logo-512.png`, width: 512, height: 512 },
    image: `${site.url}/opengraph-image`,
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Carte bancaire, Apple Pay, Google Pay',
    founder: { '@type': 'Person', name: site.founder.name },
  };

  return (
    <html lang="fr" className={fontVariables}>
      <body className="flex min-h-screen flex-col bg-ivory font-sans antialiased">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-sage-dark focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Aller au contenu principal
        </a>

        <CartProvider>
          <Header />
          <main id="contenu" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>

        <script
          type="application/ld+json"
          // Données structurées de la boutique — améliore l'affichage dans les moteurs.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
