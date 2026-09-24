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
          // Un produit peut être livré en plusieurs PDF (le pack complet en
          // a cinq) : chaque fichier a son lien signé et son propre quota.
          const files = item.files?.length
            ? item.files
            : [{ name: item.file, label: item.name, pages: product?.pages, downloads: item.downloads }];
          const plural = files.length > 1;

          return (
            <li
              key={item.productId}
              className="rounded-card border border-ink/[0.07] bg-white p-4 shadow-soft"
            >
              <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
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
                  <span className="block title-editorial text-editorial-md">{item.name}</span>
                  <span className="mt-0.5 block text-[0.78rem] text-muted">
                    {plural ? `${files.length} fichiers PDF` : 'Fichier PDF'}
                    {product ? ` · ${product.pages} pages` : ''}
                  </span>
                </span>

                {!plural && (
                  <DownloadButton
                    orderId={order.id}
                    productId={item.productId}
                    index={0}
                    downloads={files[0].downloads}
                  />
                )}
              </div>

              {plural && (
                <ul className="mt-4 space-y-2 border-t border-ink/[0.07] pt-4">
                  {files.map((file, index) => (
                    <li
                      key={file.name}
                      className="flex flex-wrap items-center gap-3 rounded-soft bg-cream/70 px-3 py-2.5 sm:flex-nowrap"
                    >
                      <span className="min-w-[8rem] flex-1">
                        <span className="block text-[0.88rem] font-semibold text-ink">
                          {file.label}
                        </span>
                        {file.pages ? (
                          <span className="block text-[0.74rem] text-muted">
                            {file.pages} pages
                          </span>
                        ) : null}
                      </span>
                      <DownloadButton
                        orderId={order.id}
                        productId={item.productId}
                        index={index}
                        downloads={file.downloads}
                        compact
                      />
                    </li>
                  ))}
                </ul>
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

/**
 * Bouton d'un fichier : le lien signé est fabriqué au dernier moment, avec
 * le rang du fichier dans la commande. Ce rang fait partie de la signature,
 * il ne peut donc pas être changé pour aller chercher un autre PDF.
 */
function DownloadButton({
  orderId,
  productId,
  index,
  downloads,
  compact = false,
}: {
  orderId: string
  productId: string
  index: number
  downloads: number
  compact?: boolean
}) {
  const remaining = downloadMaxCount > 0 ? downloadMaxCount - downloads : null;
  const exhausted = remaining !== null && remaining <= 0;

  if (exhausted) {
    return (
      <span className="rounded-full bg-sand/60 px-5 py-2.5 text-[0.85rem] font-semibold text-muted">
        Limite atteinte
      </span>
    );
  }

  const token = createDownloadToken(orderId, productId, index);

  return (
    <span className="flex shrink-0 flex-col items-end gap-0.5">
      <a
        href={`/api/download/${token}`}
        className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-terracotta-deep font-semibold text-white transition-all duration-200 ease-calm hover:-translate-y-px hover:bg-terracotta-deeper ${
          compact ? 'px-4 py-2 text-[0.82rem]' : 'px-5 py-2.5 text-[0.88rem]'
        }`}
        rel="nofollow"
      >
        <DownloadIcon size={compact ? 15 : 17} />
        Télécharger
      </a>
      {remaining !== null && (
        <span className="text-[0.72rem] text-muted">
          {remaining} restant{remaining > 1 ? 's' : ''}
        </span>
      )}
    </span>
  );
}
