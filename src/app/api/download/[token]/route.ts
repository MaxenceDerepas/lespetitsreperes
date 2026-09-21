import { NextResponse } from 'next/server';
import { getOrder, registerDownload } from '@/lib/orders';
import { getProductById } from '@/lib/catalog';
import { getProductFile } from '@/lib/storage';
import { downloadMaxCount, verifyDownloadToken } from '@/lib/tokens';
import { slugify } from '@/lib/format';

/**
 * Point d'accès UNIQUE aux fichiers PDF.
 *
 * Chaîne de vérifications avant de servir un octet :
 *   1. signature HMAC du token valide (impossible à forger) ;
 *   2. token non expiré ;
 *   3. commande existante et effectivement payée ;
 *   4. produit bien présent dans cette commande ;
 *   5. limite de téléchargements non atteinte.
 *
 * Le fichier est ensuite lu depuis le stockage privé (hors `public/`) et
 * renvoyé en flux, sans jamais exposer son URL réelle. Les en-têtes
 * interdisent la mise en cache et l'indexation.
 */

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;

  const verified = verifyDownloadToken(token);
  if (!verified.ok) {
    const messages = {
      expired: 'Ce lien de téléchargement a expiré. Reconnectez-vous à votre espace client pour en obtenir un nouveau.',
      invalid: 'Ce lien de téléchargement n’est pas valide.',
      malformed: 'Ce lien de téléchargement n’est pas valide.',
    } as const;

    return NextResponse.json(
      { error: messages[verified.reason] },
      { status: verified.reason === 'expired' ? 410 : 403, headers: noStore() },
    );
  }

  const { orderId, productId } = verified.payload;

  const order = getOrder(orderId);
  if (!order) {
    return NextResponse.json({ error: 'Commande introuvable.' }, { status: 404, headers: noStore() });
  }

  if (order.status !== 'paid') {
    return NextResponse.json(
      { error: 'Cette commande n’est pas encore validée. Les fichiers seront disponibles dès confirmation du paiement.' },
      { status: 402, headers: noStore() },
    );
  }

  const item = order.items.find((line) => line.productId === productId);
  if (!item) {
    return NextResponse.json(
      { error: 'Ce fichier ne fait pas partie de cette commande.' },
      { status: 403, headers: noStore() },
    );
  }

  if (!registerDownload(orderId, productId, downloadMaxCount)) {
    return NextResponse.json(
      {
        error: `Vous avez atteint la limite de ${downloadMaxCount} téléchargements pour ce fichier. Écrivez-nous et nous la réinitialisons.`,
      },
      { status: 429, headers: noStore() },
    );
  }

  const file = await getProductFile(item.file);
  if (!file) {
    console.error('[download] Fichier absent du stockage privé :', item.file);
    return NextResponse.json(
      {
        error: 'Le fichier est momentanément indisponible. Merci de nous écrire, nous vous l’envoyons directement.',
      },
      { status: 503, headers: noStore() },
    );
  }

  const product = getProductById(productId);
  const fileName = `${slugify(product?.name ?? item.name)}-les-petits-reperes.pdf`;

  return new NextResponse(new Uint8Array(file.body), {
    status: 200,
    headers: {
      ...noStore(),
      'Content-Type': file.contentType,
      'Content-Length': String(file.size),
      'Content-Disposition': `attachment; filename="${fileName}"`,
    },
  });
}

function noStore(): Record<string, string> {
  return {
    'Cache-Control': 'no-store, no-cache, must-revalidate, private',
    'X-Robots-Tag': 'noindex, nofollow, noarchive',
  };
}
