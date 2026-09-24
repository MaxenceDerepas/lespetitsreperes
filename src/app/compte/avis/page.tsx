import Link from 'next/link';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getSessionEmail } from '@/lib/auth';
import { getAccount } from '@/lib/accounts';
import { getProductById } from '@/lib/catalog';
import {
  bodyMaxLength,
  bodyMinLength,
  getReviewsByCustomer,
  purchasedProductIds,
} from '@/lib/reviews';
import { formatDate } from '@/lib/format';
import { PageBanner } from '@/components/PageBanner';
import { BannerScene } from '@/components/BannerScenes';
import { AccountNav } from '@/components/AccountNav';
import { ReviewForm } from '@/components/ReviewForm';
import { Stars } from '@/components/Stars';
import { ButtonLink } from '@/components/Button';

export const metadata: Metadata = {
  title: 'Mes avis',
  robots: { index: false, follow: false },
};

const etats = {
  pending: { label: 'En attente de relecture', classe: 'bg-sand/60 text-ink-soft' },
  published: { label: 'Publié sur la fiche', classe: 'bg-sage-pale/70 text-sage-dark' },
  rejected: { label: 'Non retenu', classe: 'bg-peach/50 text-terracotta-deep' },
} as const;

export default async function ReviewsPage() {
  const email = await getSessionEmail();
  if (!email) redirect('/connexion');

  const account = getAccount(email);
  const achetes = purchasedProductIds(email);
  const mesAvis = getReviewsByCustomer(email);
  const dejaNotes = new Set(mesAvis.map((avis) => avis.productId));
  const aNoter = achetes.filter((id) => !dejaNotes.has(id));

  return (
    <>
      <PageBanner
        compact
        title="Mes avis"
        subtitle="Votre retour aide les autres familles à choisir — et nous aide à faire mieux."
        crumbs={[{ label: 'Mon compte', href: '/compte' }, { label: 'Mes avis' }]}
        scene={<BannerScene variant="compte" />}
      />

      <div className="shell grid gap-8 py-10 lg:grid-cols-[16rem_1fr] lg:gap-12 lg:py-14">
        <AccountNav current="/compte/avis" email={email} />

        <div className="max-w-2xl">
          {achetes.length === 0 ? (
            <div className="rounded-card border border-dashed border-sage/30 bg-white/60 px-6 py-12 text-center">
              <h2 className="title text-display-sm">Rien à noter pour l’instant</h2>
              <p className="mx-auto mt-2.5 max-w-sm text-[0.92rem] leading-relaxed text-ink-soft">
                Vous pourrez donner votre avis sur chaque fichier après votre premier achat.
              </p>
              <ButtonLink href="/boutique" className="mt-6">
                Découvrir la boutique
              </ButtonLink>
            </div>
          ) : (
            <>
              {aNoter.length > 0 && (
                <section aria-labelledby="a-noter">
                  <h2 id="a-noter" className="title-editorial text-editorial-lg">
                    Donner mon avis
                  </h2>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">
                    Vous n’êtes pas obligée de remplir quoi que ce soit : c’est seulement si vous
                    en avez envie.
                  </p>

                  <ul className="mt-6 space-y-6">
                    {aNoter.map((productId) => {
                      const product = getProductById(productId);
                      if (!product) return null;
                      return (
                        <li key={productId}>
                          <ReviewForm
                            productId={product.id}
                            productName={product.name}
                            defaultName={account?.firstName ?? ''}
                            bodyMinLength={bodyMinLength}
                            bodyMaxLength={bodyMaxLength}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </section>
              )}

              {mesAvis.length > 0 && (
                <section className={aNoter.length > 0 ? 'mt-12' : ''} aria-labelledby="deja">
                  <h2 id="deja" className="title-editorial text-editorial-lg">
                    Vos avis déposés
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {mesAvis.map((avis) => {
                      const product = getProductById(avis.productId);
                      const etat = etats[avis.status];
                      return (
                        <li
                          key={avis.id}
                          className="rounded-card border border-ink/[0.07] bg-white p-5 shadow-soft"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <p className="text-[0.95rem] font-semibold text-ink">
                              {product ? (
                                <Link
                                  href={`/boutique/${product.slug}`}
                                  className="hover:text-terracotta-deep"
                                >
                                  {product.name}
                                </Link>
                              ) : (
                                avis.productId
                              )}
                            </p>
                            <span
                              className={`rounded-full px-3 py-1 text-[0.72rem] font-semibold ${etat.classe}`}
                            >
                              {etat.label}
                            </span>
                          </div>

                          <div className="mt-2 flex items-center gap-2">
                            <Stars value={avis.rating} />
                            <span className="text-[0.78rem] text-muted">
                              {formatDate(avis.createdAt)}
                            </span>
                          </div>

                          <p className="mt-2.5 whitespace-pre-line text-[0.92rem] leading-relaxed text-ink-soft">
                            {avis.body}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
