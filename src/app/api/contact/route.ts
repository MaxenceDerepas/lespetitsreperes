import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';
import { site } from '@/lib/site';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Formulaire de contact. */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim();
    const subject = String(body.subject ?? '').trim();
    const message = String(body.message ?? '').trim();
    const orderReference = String(body.orderReference ?? '').trim() || undefined;

    if (name.length < 2) {
      return NextResponse.json({ error: 'Merci d’indiquer votre prénom.' }, { status: 400 });
    }
    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: 'Merci d’indiquer une adresse email valide.' }, { status: 400 });
    }
    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Votre message est un peu court — quelques mots de plus nous aideront.' },
        { status: 400 },
      );
    }
    // Garde-fou anti-abus : un message très long est presque toujours du spam.
    if (message.length > 5000) {
      return NextResponse.json({ error: 'Votre message est trop long.' }, { status: 400 });
    }

    await sendContactEmail({ name, email, subject: subject || 'Message depuis le site', message, orderReference });

    return NextResponse.json({
      ok: true,
      message: `Merci ${name}, votre message est bien arrivé. Nous vous répondons ${site.support.responseTime}.`,
    });
  } catch {
    return NextResponse.json({ error: 'Envoi impossible pour le moment.' }, { status: 500 });
  }
}
