import { NextResponse } from 'next/server';
import { applyPromo } from '@/lib/promo';

/** Vérification d'un code promotionnel. La remise est recalculée au paiement. */
export async function POST(request: Request) {
  try {
    const { code, subtotalCents } = await request.json();
    const result = applyPromo(String(code ?? ''), Number(subtotalCents ?? 0));

    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      code: result.code,
      label: result.label,
      discountCents: result.discountCents,
    });
  } catch {
    return NextResponse.json({ ok: false, error: 'Requête invalide.' }, { status: 400 });
  }
}
