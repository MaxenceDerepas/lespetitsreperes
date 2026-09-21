import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { cookieOptions, createSessionValue, sessionCookieName, verifyLoginToken } from '@/lib/auth';
import { site } from '@/lib/site';

/**
 * Validation d'un lien de connexion reçu par email.
 * Traité par un gestionnaire de route (et non une page) car c'est ici que le
 * cookie de session peut être posé.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(`${site.url}/connexion?erreur=lien-manquant`);
  }

  const email = verifyLoginToken(token);
  if (!email) {
    return NextResponse.redirect(`${site.url}/connexion?erreur=lien-expire`);
  }

  const store = await cookies();
  store.set(sessionCookieName, createSessionValue(email), cookieOptions);

  return NextResponse.redirect(`${site.url}/compte`);
}
