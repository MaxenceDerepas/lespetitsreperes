'use server';

import { revalidatePath } from 'next/cache';
import { isAdmin } from '@/lib/auth';
import { getProductById } from '@/lib/catalog';
import { deleteReview, getAllReviews, setReviewStatus } from '@/lib/reviews';
import type { ReviewStatus } from '@/lib/types';

/**
 * Modération des avis.
 *
 * Chaque action revérifie le cookie d'administration : une requête fabriquée
 * à la main vers cette action, sans être connectée, ne modifie rien.
 */
async function refuseSiNonAdmin(): Promise<boolean> {
  return !(await isAdmin());
}

async function revalideFiche(reviewId: string): Promise<void> {
  const review = getAllReviews().find((r) => r.id === reviewId);
  const product = review ? getProductById(review.productId) : undefined;
  if (product) revalidatePath(`/boutique/${product.slug}`);
}

export async function moderateReview(formData: FormData): Promise<void> {
  if (await refuseSiNonAdmin()) return;

  const id = String(formData.get('id') ?? '');
  const decision = String(formData.get('decision') ?? '');
  if (!['published', 'rejected', 'pending'].includes(decision)) return;

  await revalideFiche(id);
  setReviewStatus(id, decision as ReviewStatus);
  await revalideFiche(id);
  revalidatePath('/admin');
}

export async function removeReview(formData: FormData): Promise<void> {
  if (await refuseSiNonAdmin()) return;

  const id = String(formData.get('id') ?? '');
  await revalideFiche(id);
  deleteReview(id);
  revalidatePath('/admin');
}
