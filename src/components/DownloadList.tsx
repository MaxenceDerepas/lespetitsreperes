import type { Order } from '@/lib/types';
import { getProductById } from '@/lib/catalog';
import { createDownloadToken, downloadMaxCount, downloadTtlHours } from '@/lib/tokens';
import { ProductVisual } from './ProductVisual';
import { DownloadIcon, LockIcon } from './icons';

/**
 * Liste des fichiers d'une commande, avec un lien de téléchargement signé
 * généré à chaque affichage de la page. Les liens sont donc toujours frais :
 * un lien expiré ne bloque jamais l'accès depuis l'espace client.
 *
 * Verrou de sécurité : aucun lien signé n'est fabriqué tant que la commande
 * n'est pas payée. L'API refuserait de toute façon de servir le fichier, mais
 * ce garde-fou est placé ici, dans le composant, pour qu'aucune page — même
 * ajoutée plus tard — ne puisse afficher un lien par erreur.
 */
export function DownloadList({ order }: { order: Order }) {
  if (order.status !== 'paid') {
    return (
      <div className="rounded-card border border-ink/[0.07] bg-white p-5">
        <p className="flex items-start gap-2.5 text-[0.9rem] leading-relaxed text-ink-soft">
          <LockIcon size={18} className="mt-0.5 shrink-0 text-sage-dark" />
          <span>
            Vos fichiers apparaîtront ici dès la confirmation du paiement. Vous recevrez aussi un
            email avec vos liens de téléchargement.
          </span>
        </p>
      </div>
    );
  }

  return (
    <div>
      <ul className="space-y-3">
        {order.items.map((item) => {
          const product = getProductById(item.productId);
          const token = createDownloadToken(order.id, item.productId);
          const remaining = downloadMaxCount > 0 ? downloadMaxCount - item.downloads : null;
          const exhausted = remaining !== null && remaining <= 0;

          return (
            <li
              key={item.productId}
              className="flex flex-wrap items-center gap-4 rounded-card border border-ink/[0.07] bg-white p-4 shadow-soft sm:flex-nowrap"
            >
              <span className="h-20 w-16 shrink-0 overflow-hidden rounded-soft">
                {product ? (
                  <ProductVisual
                    motif={product.motif}
                    accent={product.accent}
                    title={product.name}
                    alt=""
                    className="h-full w-full"
                  />
                ) : null}
              </span>

              <span className="min-w-[10rem] flex-1">
                <span className="block font-script text-[1.36rem] leading-snug text-sage-dark">
                  {item.name}
                </span>
                <span className="mt-0.5 block text-[0.78rem] text-muted">
                  Fichier PDF
                  {product ? ` · ${product.pages} pages · ${product.format}` : ''}
                </span>
                {remaining !== null && (
                  <span className="mt-1 block text-[0.74rem] text-muted">
                    {exhausted
                      ? 'Limite de téléchargements atteinte — écrivez-nous, nous la réinitialisons.'
                      : `${remaining} téléchargement${remaining > 1 ? 's' : ''} restant${remaining > 1 ? 's' : ''}`}
                  </span>
                )}
              </span>

              {exhausted ? (
                <span className="rounded-full bg-sand/60 px-5 py-2.5 text-[0.85rem] font-semibold text-muted">
                  Indisponible
                </span>
              ) : (
                <a
                  href={`/api/download/${token}`}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-terracotta-deep px-5 py-2.5 text-[0.88rem] font-semibold text-white transition-all duration-200 ease-calm hover:-translate-y-px hover:bg-terracotta-deeper"
                  rel="nofollow"
                >
                  <DownloadIcon size={17} />
                  Télécharger le PDF
                </a>
              )}
            </li>
          );
        })}
      </ul>

      <p className="mt-4 flex items-start gap-2 text-[0.78rem] leading-relaxed text-muted">
        <LockIcon size={14} className="mt-px shrink-0" />
        Ces liens sont personnels, signés et valables {downloadTtlHours} h. Ils ne peuvent pas
        être devinés ni partagés durablement — et vos fichiers restent accessibles à tout moment
        depuis votre espace client.
      </p>
    </div>
  );
}
