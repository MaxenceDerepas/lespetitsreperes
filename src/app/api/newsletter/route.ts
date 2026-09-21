import { NextResponse } from 'next/server';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Inscription à la lettre d'information.
 *
 * À brancher sur votre outil d'emailing : Resend Audiences, Brevo, Mailchimp…
 * Le point d'entrée est volontairement isolé pour n'avoir qu'un seul endroit
 * à modifier. Sans clé configurée, l'inscription est simplement journalisée.
 */
export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const address = String(email ?? '').trim().toLowerCase();

    if (!emailPattern.test(address)) {
      return NextResponse.json({ error: 'Merci d’indiquer une adresse email valide.' }, { status: 400 });
    }

    if (!process.env.EMAIL_API_KEY) {
      console.info(`[newsletter] Inscription (mode démonstration) : ${address}`);
      return NextResponse.json({
        ok: true,
        message: 'Merci ! Votre fiche offerte arrive dans votre boîte email.',
      });
    }

    // ------------------------------------------------------------------
    //  Exemple avec Resend Audiences — décommentez et renseignez l'audience.
    //
    //  await fetch('https://api.resend.com/audiences/<AUDIENCE_ID>/contacts', {
    //    method: 'POST',
    //    headers: {
    //      Authorization: `Bearer ${process.env.EMAIL_API_KEY}`,
    //      'Content-Type': 'application/json',
    //    },
    //    body: JSON.stringify({ email: address, unsubscribed: false }),
    //  });
    // ------------------------------------------------------------------

    console.info(`[newsletter] Inscription : ${address}`);

    return NextResponse.json({
      ok: true,
      message: 'Merci ! Votre fiche offerte arrive dans votre boîte email.',
    });
  } catch {
    return NextResponse.json({ error: 'Inscription impossible pour le moment.' }, { status: 500 });
  }
}
