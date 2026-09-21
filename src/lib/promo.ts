import type { PromoCode } from './types';

/**
 * Codes promotionnels.
 * En production, cette liste vit en base de données et s'administre
 * depuis /admin ; l'interface `PromoCode` reste identique.
 */
export const promoCodes: PromoCode[] = [
  {
    code: 'BIENVENUE10',
    label: '10 % sur votre première commande',
    percentOff: 10,
    active: true,
  },
  {
    code: 'FAMILLE15',
    label: '15 % dès 20 € d’achat',
    percentOff: 15,
    minSubtotalCents: 2000,
    active: true,
  },
  {
    code: 'RENTREE3',
    label: '3 € de remise immédiate',
    amountCents: 300,
    minSubtotalCents: 1000,
    expiresAt: '2026-10-31',
    active: true,
  },
];

export interface PromoResult {
  ok: boolean
  code?: string
  label?: string
  discountCents: number
  error?: string
}

export function applyPromo(rawCode: string, subtotalCents: number): PromoResult {
  const code = rawCode.trim().toUpperCase();
  if (!code) return { ok: false, discountCents: 0, error: 'Veuillez saisir un code.' };

  const promo = promoCodes.find((p) => p.code === code);
  if (!promo || !promo.active) {
    return { ok: false, discountCents: 0, error: 'Ce code ne semble pas valide.' };
  }

  if (promo.expiresAt && new Date(promo.expiresAt) < new Date()) {
    return { ok: false, discountCents: 0, error: 'Ce code a expiré.' };
  }

  if (promo.minSubtotalCents && subtotalCents < promo.minSubtotalCents) {
    return {
      ok: false,
      discountCents: 0,
      error: `Ce code est valable à partir de ${(promo.minSubtotalCents / 100).toFixed(2).replace('.', ',')} € d’achat.`,
    };
  }

  const discount = promo.percentOff
    ? Math.round((subtotalCents * promo.percentOff) / 100)
    : (promo.amountCents ?? 0);

  return {
    ok: true,
    code: promo.code,
    label: promo.label,
    discountCents: Math.min(discount, subtotalCents),
  };
}
