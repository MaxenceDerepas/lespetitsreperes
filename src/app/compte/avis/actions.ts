'use server';

import { redirect } from 'next/navigation';
import { getSessionEmail } from '@/lib/auth';
import { getProductById } from '@/lib/catalog';
import {
  bodyProblem,
  createReview,
  getReviewByCustomer,
  purchasedOrderId,
} from '@/lib/reviews';

export interface ReviewState {
  status: 'idle' | 'error' | 'sent'
  message?: string
  /** Produit concerné, pour n'afficher le message que sur le bon formulaire. */
  productId?: string
}

/**
 * Dépôt d'un avis.
 *
 * La preuve d'achat n'est jamais demandée au formulaire : elle est relue ici,
 * depuis la session et les commandes payées. Un visiteur qui fabriquerait une
 * requête avec l'identifiant d'un produit qu'il n'a pas acheté est refusé.
 */
export async function submitReview(
  _prev: ReviewState,
  formData: FormData,
): Promise<ReviewState> {
  const email = await getSessionEmail();
  if (!email) redirect('/connexion');

  const productId = String(formData.get('productId') ?? '');
  const product = getProductById(productId);
  if (!product) {
    return { status: 'error', message: 'Produit introuvable.', productId };
  }

  const orderId = purchasedOrderId(email, productId);
  if (!orderId) {
    return {
      status: 'error',
      message: 'Seuls les acheteurs de ce fichier peuvent le noter.',
      productId,
    };
  }

  if (getReviewByCustomer(email, productId)) {
    return {
      status: 'error',
      message: 'Vous avez déjà donné votre avis sur ce fichier. Écrivez-nous pour le modifier.',
      productId,
    };
  }

  const rating = Number(formData.get('rating') ?? 0);
  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return { status: 'error', message: 'Merci de choisir une note de 1 à 5 étoiles.', productId };
  }

  const body = String(formData.get('body') ?? '');
  const probleme = bodyProblem(body);
  if (probleme) return { status: 'error', message: probleme, productId };

  const displayName = String(formData.get('displayName') ?? '');

  const review = createReview({ productId, orderId, email, displayName, rating, body });
  if (!review) {
    return { status: 'error', message: 'L’enregistrement a échoué. Réessayez dans un instant.', productId };
  }

  // Pas de revalidatePath ici : la page se rafraîchirait aussitôt, le
  // formulaire disparaîtrait et le message de remerciement avec lui. La liste
  // « Vos avis déposés » est à jour à la prochaine visite de la page.
  return {
    status: 'sent',
    message:
      'Merci beaucoup ! Votre avis a bien été envoyé. Il apparaîtra sur la fiche du produit après relecture.',
    productId,
  };
}
