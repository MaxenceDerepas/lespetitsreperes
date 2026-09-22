import Link from 'next/link';
import type { Metadata } from 'next';
import { isAdmin, isAdminConfigured } from '@/lib/auth';
import { adminLogout } from '@/app/compte/actions';
import { categories, getAllProducts, productFiles } from '@/lib/catalog';
import { promoCodes } from '@/lib/promo';
import { getAllOrders, getOrderStats } from '@/lib/orders';
import { localFileExists, isRemoteStorageConfigured } from '@/lib/storage';
import { isStripeConfigured } from '@/lib/stripe';
import { isEmailConfigured } from '@/lib/email';
import { formatDateTime, formatPrice, pluralize } from '@/lib/format';
import { AdminLoginForm } from '@/components/AdminLoginForm';
import { PageHeader } from '@/components/PageHeader';
import { CheckIcon, CloseIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Administration',
  robots: { index: false, follow: false },
};

function StatusDot({ ok, label }: { ok: boolean; label: string }) {
  return (
    <li className="flex items-center gap-2 text-[0.86rem]">
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
          ok ? 'bg-sage-pale text-sage-dark' : 'bg-peach/50 text-terracotta-deep'
        }`}
      >
        {ok ? <CheckIcon size={13} /> : <CloseIcon size={13} />}
      </span>
      <span className={ok ? 'text-ink' : 'text-ink-soft'}>{label}</span>
    </li>
  );
}

export default async function AdminPage() {
  if (!(await isAdmin())) {
    return (
      <>
        <PageHeader title="Administration" crumbs={[{ label: 'Administration' }]} />
        <div className="shell py-12 lg:py-16">
          <AdminLoginForm configured={isAdminConfigured()} />
        </div>
      </>
    );
  }

  const products = getAllProducts();
  const orders = getAllOrders();
  const stats = getOrderStats();
  const remoteStorage = isRemoteStorageConfigured();

  // Un produit peut porter plusieurs PDF : on les vérifie tous.
  const missingFiles = products.flatMap((product) =>
    productFiles(product)
      .filter((file) => !remoteStorage && !localFileExists(file.name))
      .map((file) => file.name),
  );
  const customers = Array.from(
    orders.reduce((map, order) => {
      const entry = map.get(order.email) ?? { orders: 0, totalCents: 0 };
      entry.orders += 1;
      if (order.status === 'paid') entry.totalCents += order.totalCents;
      map.set(order.email, entry);
      return map;
    }, new Map<string, { orders: number; totalCents: number }>()),
  ).sort((a, b) => b[1].totalCents - a[1].totalCents);

  return (
    <>
      <PageHeader
        eyebrow="Gestion de la boutique"
        title="Administration"
        crumbs={[{ label: 'Administration' }]}
        center={false}
      >
        <form action={adminLogout} className="mt-4">
          <button
            type="submit"
            className="text-[0.84rem] text-muted underline underline-offset-2 hover:text-terracotta-deep"
          >
            Se déconnecter
          </button>
        </form>
      </PageHeader>

      <div className="shell space-y-12 py-10 lg:py-14">
        {/* Chiffres clés */}
        <section aria-labelledby="stats">
          <h2 id="stats" className="title text-display-sm">
            Vue d’ensemble
          </h2>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {[
              { label: 'Commandes', value: String(stats.ordersCount) },
              { label: 'Payées', value: String(stats.paidCount) },
              { label: 'Chiffre d’affaires', value: formatPrice(stats.revenueCents) },
              { label: 'Téléchargements', value: String(stats.downloads) },
              { label: 'Clients', value: String(stats.customers) },
            ].map((stat) => (
              <li key={stat.label} className="rounded-card border border-sage/15 bg-white p-4">
                <p className="font-serif text-2xl text-sage-dark">{stat.value}</p>
                <p className="mt-0.5 text-[0.74rem] text-muted">{stat.label}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Configuration */}
        <section aria-labelledby="config">
          <h2 id="config" className="title text-display-sm">
            Configuration
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <ul className="space-y-2.5 rounded-card border border-ink/[0.07] bg-white p-5">
              <StatusDot ok={isStripeConfigured()} label="Paiement Stripe (STRIPE_SECRET_KEY)" />
              <StatusDot
                ok={Boolean(process.env.STRIPE_WEBHOOK_SECRET)}
                label="Webhook Stripe (STRIPE_WEBHOOK_SECRET)"
              />
              <StatusDot ok={isEmailConfigured()} label="Emails transactionnels (EMAIL_API_KEY)" />
              <StatusDot
                ok={Boolean(process.env.DOWNLOAD_TOKEN_SECRET)}
                label="Secret des liens de téléchargement"
              />
              <StatusDot ok={remoteStorage} label="Stockage distant privé (STORAGE_URL)" />
              <StatusDot ok={Boolean(process.env.DATABASE_URL)} label="Base de données (DATABASE_URL)" />
            </ul>

            <div className="rounded-card bg-cream p-5 text-[0.86rem] leading-relaxed text-ink-soft">
              <p>
                Les éléments non configurés basculent automatiquement en mode démonstration : le
                site reste entièrement utilisable, mais sans paiement réel, sans email et avec des
                commandes stockées dans{' '}
                <code className="font-mono text-[0.78rem]">./.data/orders.json</code>.
              </p>
              <p className="mt-3">
                Tout se règle dans <code className="font-mono text-[0.78rem]">.env.local</code> —
                voir <code className="font-mono text-[0.78rem]">.env.example</code> et le README.
              </p>
            </div>
          </div>
        </section>

        {/* Produits */}
        <section aria-labelledby="produits">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="produits" className="title text-display-sm">
              Produits{' '}
              <span className="text-[0.8rem] font-normal text-muted">
                ({products.length} {pluralize(products.length, 'fiche')})
              </span>
            </h2>
            <p className="text-[0.8rem] text-muted">
              Ajout et modification dans{' '}
              <code className="font-mono text-[0.76rem]">src/lib/catalog.ts</code>
            </p>
          </div>

          {missingFiles.length > 0 && (
            <p className="mt-4 rounded-soft bg-peach/40 px-4 py-3 text-[0.84rem] leading-relaxed text-terracotta-deep">
              <strong className="font-semibold">
                {missingFiles.length} {pluralize(missingFiles.length, 'fichier')} PDF manquant
                {missingFiles.length > 1 ? 's' : ''}
              </strong>{' '}
              dans <code className="font-mono text-[0.78rem]">private/files/</code> :{' '}
              {missingFiles.join(', ')}. Lancez{' '}
              <code className="font-mono text-[0.78rem]">npm run seed:pdf</code> pour générer des
              PDF de démonstration, ou déposez-y vos vrais fichiers.
            </p>
          )}

          <div className="mt-5 overflow-x-auto rounded-card border border-ink/[0.07] bg-white">
            <table className="w-full min-w-[46rem] text-left text-[0.86rem]">
              <caption className="sr-only">Liste des produits</caption>
              <thead className="border-b border-ink/10 bg-cream/60 text-[0.72rem] uppercase tracking-[0.1em] text-muted">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-semibold">Nom</th>
                  <th scope="col" className="px-4 py-2.5 font-semibold">Catégorie</th>
                  <th scope="col" className="px-4 py-2.5 font-semibold">Type</th>
                  <th scope="col" className="px-4 py-2.5 text-right font-semibold">Prix</th>
                  <th scope="col" className="px-4 py-2.5 font-semibold">Fichier</th>
                  <th scope="col" className="px-4 py-2.5 font-semibold">État</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const files = productFiles(product);
                  const present = files.every(
                    (file) => remoteStorage || localFileExists(file.name),
                  );
                  return (
                    <tr key={product.id} className="border-b border-ink/[0.06] last:border-0">
                      <td className="px-4 py-3">
                        <Link
                          href={`/boutique/${product.slug}`}
                          className="font-semibold text-ink hover:text-terracotta-deep"
                        >
                          {product.name}
                        </Link>
                        <span className="block text-[0.76rem] text-muted">{product.slug}</span>
                      </td>
                      <td className="px-4 py-3 text-ink-soft">{product.category}</td>
                      <td className="px-4 py-3 text-ink-soft">{product.type}</td>
                      <td className="px-4 py-3 text-right font-semibold text-terracotta-deep">
                        {formatPrice(product.priceCents)}
                      </td>
                      <td className="px-4 py-3">
                        {files.map((file) => (
                          <code
                            key={file.name}
                            className="block font-mono text-[0.76rem] text-muted"
                          >
                            {file.name}
                          </code>
                        ))}
                        <span
                          className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[0.68rem] font-semibold ${
                            present
                              ? 'bg-sage-pale/70 text-sage-dark'
                              : 'bg-peach/50 text-terracotta-deep'
                          }`}
                        >
                          {present ? 'présent' : 'manquant'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[0.76rem] text-muted">
                        {[product.featured && 'phare', product.isNew && 'nouveauté']
                          .filter(Boolean)
                          .join(', ') || '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Commandes */}
        <section aria-labelledby="commandes">
          <h2 id="commandes" className="title text-display-sm">
            Commandes{' '}
            <span className="text-[0.8rem] font-normal text-muted">({orders.length})</span>
          </h2>

          {orders.length === 0 ? (
            <p className="mt-4 rounded-card border border-dashed border-sage/30 bg-white/60 px-5 py-8 text-center text-[0.88rem] text-ink-soft">
              Aucune commande pour l’instant. Passez une commande de test depuis la boutique pour
              voir le parcours complet.
            </p>
          ) : (
            <div className="mt-5 overflow-x-auto rounded-card border border-ink/[0.07] bg-white">
              <table className="w-full min-w-[46rem] text-left text-[0.86rem]">
                <caption className="sr-only">Liste des commandes</caption>
                <thead className="border-b border-ink/10 bg-cream/60 text-[0.72rem] uppercase tracking-[0.1em] text-muted">
                  <tr>
                    <th scope="col" className="px-4 py-2.5 font-semibold">Référence</th>
                    <th scope="col" className="px-4 py-2.5 font-semibold">Date</th>
                    <th scope="col" className="px-4 py-2.5 font-semibold">Client</th>
                    <th scope="col" className="px-4 py-2.5 font-semibold">Fichiers</th>
                    <th scope="col" className="px-4 py-2.5 text-center font-semibold">Téléch.</th>
                    <th scope="col" className="px-4 py-2.5 text-right font-semibold">Total</th>
                    <th scope="col" className="px-4 py-2.5 font-semibold">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-ink/[0.06] last:border-0">
                      <td className="px-4 py-3">
                        <Link
                          href={`/telechargements/${order.id}`}
                          className="font-semibold text-ink hover:text-terracotta-deep"
                        >
                          {order.reference}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-[0.8rem] text-muted">
                        {formatDateTime(order.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-ink-soft">{order.email}</td>
                      <td className="px-4 py-3 text-[0.8rem] text-ink-soft">
                        {order.items.map((item) => item.name).join(', ')}
                      </td>
                      <td className="px-4 py-3 text-center text-ink-soft">
                        {order.items.reduce((sum, item) => sum + item.downloads, 0)}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-terracotta-deep">
                        {formatPrice(order.totalCents)}
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-cream px-2.5 py-0.5 text-[0.7rem] font-semibold text-ink-soft">
                          {order.status}
                          {order.demo ? ' · démo' : ''}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Clients, codes promo, catégories */}
        <div className="grid gap-8 lg:grid-cols-3">
          <section aria-labelledby="clients">
            <h2 id="clients" className="font-script text-[1.42rem] text-sage-dark">
              Clients
            </h2>
            {customers.length === 0 ? (
              <p className="mt-3 text-[0.86rem] text-muted">Aucun client enregistré.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {customers.map(([email, data]) => (
                  <li
                    key={email}
                    className="rounded-soft border border-ink/[0.07] bg-white px-4 py-2.5 text-[0.84rem]"
                  >
                    <span className="block truncate font-semibold text-ink">{email}</span>
                    <span className="text-[0.78rem] text-muted">
                      {data.orders} {pluralize(data.orders, 'commande')} ·{' '}
                      {formatPrice(data.totalCents)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section aria-labelledby="promos">
            <h2 id="promos" className="font-script text-[1.42rem] text-sage-dark">
              Codes promotionnels
            </h2>
            <ul className="mt-3 space-y-2">
              {promoCodes.map((promo) => (
                <li
                  key={promo.code}
                  className="rounded-soft border border-ink/[0.07] bg-white px-4 py-2.5 text-[0.84rem]"
                >
                  <span className="font-mono font-semibold text-ink">{promo.code}</span>
                  <span className="block text-[0.78rem] text-muted">
                    {promo.label}
                    {promo.expiresAt ? ` · jusqu’au ${promo.expiresAt}` : ''}
                    {promo.active ? '' : ' · inactif'}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[0.78rem] text-muted">
              Gestion dans <code className="font-mono text-[0.74rem]">src/lib/promo.ts</code>
            </p>
          </section>

          <section aria-labelledby="cats">
            <h2 id="cats" className="font-script text-[1.42rem] text-sage-dark">
              Catégories
            </h2>
            <ul className="mt-3 space-y-2">
              {categories.map((category) => (
                <li
                  key={category.slug}
                  className="rounded-soft border border-ink/[0.07] bg-white px-4 py-2.5 text-[0.84rem]"
                >
                  <span className="font-semibold text-ink">{category.name}</span>
                  <span className="block text-[0.78rem] text-muted">
                    {products.filter((p) => p.category === category.slug).length} produits ·{' '}
                    {category.slug}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
