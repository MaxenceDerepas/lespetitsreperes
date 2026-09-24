import type { Order } from './types';
import { site } from './site';
import { formatPrice } from './format';
import { createDownloadToken, downloadUrl } from './tokens';

/**
 * Envoi des emails transactionnels.
 *
 * Sans EMAIL_API_KEY, les emails sont écrits dans la console du serveur :
 * pratique en développement, et le reste du parcours continue de fonctionner.
 * Avec une clé Resend, l'email est réellement envoyé.
 */

export function isEmailConfigured(): boolean {
  return Boolean(process.env.EMAIL_API_KEY);
}

interface SendArgs {
  to: string
  subject: string
  html: string
  text: string
  replyTo?: string
}

async function send({ to, subject, html, text, replyTo }: SendArgs): Promise<boolean> {
  if (!isEmailConfigured()) {
    console.info(
      [
        '',
        '───────────────────────────────────────────────',
        '  EMAIL (mode démonstration — non envoyé)',
        `  À       : ${to}`,
        `  Objet   : ${subject}`,
        '───────────────────────────────────────────────',
        text,
        '───────────────────────────────────────────────',
        '',
      ].join('\n'),
    );
    return false;
  }

  try {
    // L'adresse de l'API est surchargeable pour pouvoir vérifier l'envoi
    // sans consommer de vrai quota (tests automatisés).
    const endpoint = process.env.EMAIL_API_URL || 'https://api.resend.com/emails';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.EMAIL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || `${site.name} <onboarding@resend.dev>`,
        to: [to],
        subject,
        html,
        text,
        reply_to: replyTo || process.env.EMAIL_REPLY_TO || site.email,
      }),
    });

    if (!response.ok) {
      console.error('[email] Échec de l’envoi :', response.status, await response.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error('[email] Échec de l’envoi :', error);
    return false;
  }
}

/* ---------------------------------------------------------------------------
 *  Gabarit HTML — volontairement simple et compatible avec tous les clients :
 *  tableaux, styles en ligne, aucune police externe.
 * ------------------------------------------------------------------------- */

function layout(inner: string): string {
  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FEFBF6;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#66584B;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FEFBF6;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FFFFFF;border-radius:18px;border:1px solid rgba(102,88,75,.08);overflow:hidden;">
        <tr><td style="padding:30px 32px 8px;text-align:center;">
          <div style="font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#788568;font-weight:700;">Les Petits Repères</div>
        </td></tr>
        <tr><td style="padding:8px 32px 34px;">${inner}</td></tr>
        <tr><td style="padding:20px 32px 28px;background:#FDF7EF;text-align:center;font-size:12px;line-height:1.7;color:#91877B;">
          ${site.name} — ${site.promise}<br>
          <a href="${site.url}" style="color:#788568;text-decoration:none;">${site.url.replace(/^https?:\/\//, '')}</a>
          &nbsp;·&nbsp;
          <a href="mailto:${site.email}" style="color:#788568;text-decoration:none;">${site.email}</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function button(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:6px 0 14px;"><tr>
    <td style="background:#D98262;border-radius:10px;">
      <a href="${href}" style="display:inline-block;padding:13px 26px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;">${label}</a>
    </td></tr></table>`;
}

/* ---------------------------------------------------------------------------
 *  Email de livraison des fichiers après paiement
 * ------------------------------------------------------------------------- */

export async function sendOrderEmail(order: Order): Promise<boolean> {
  // Verrou : cet email contient des liens signés. Il ne part jamais avant que
  // le paiement soit confirmé (en mode Stripe, c'est le webhook qui l'appelle).
  if (order.status !== 'paid') {
    console.warn('[email] Envoi refusé : commande non payée', order.reference);
    return false;
  }

  const baseUrl = site.url;

  // Un lien par fichier : le pack complet en contient cinq, un par thème.
  const links = order.items.flatMap((item) =>
    (item.files?.length ? item.files : [{ name: item.file, label: item.name }]).map(
      (file, index) => ({
        name: file.label,
        url: downloadUrl(createDownloadToken(order.id, item.productId, index), baseUrl),
      }),
    ),
  );

  const allFilesUrl = `${baseUrl}/telechargements/${order.id}`;

  // Un pack livré en plusieurs fichiers (le pack complet) est détaillé sous le
  // bouton ; un pack à fichier unique n'a besoin que du bouton.
  const plusieurs = links.length > 1;

  const itemsHtml = plusieurs
    ? links
        .map(
          (link) => `<tr>
        <td style="padding:10px 0;border-bottom:1px solid rgba(102,88,75,.08);">
          <div style="font-size:15px;font-weight:700;color:#66584B;">${link.name}</div>
          <a href="${link.url}" style="font-size:13px;color:#C26A4B;text-decoration:underline;">Télécharger le PDF</a>
        </td></tr>`,
        )
        .join('')
    : '';

  const inner = `
    <h1 style="margin:14px 0 6px;font-family:Georgia,serif;font-size:26px;font-weight:500;color:#5F6B51;text-align:center;">Votre pack est prêt !</h1>
    <p style="font-size:15px;line-height:1.7;margin:16px 0;">Bonjour${order.firstName ? ` ${order.firstName}` : ''},</p>
    <p style="font-size:15px;line-height:1.7;margin:0 0 6px;">
      Merci beaucoup pour votre commande et bienvenue dans l’univers Les Petits Repères
    </p>
    <p style="font-size:15px;line-height:1.7;margin:0 0 18px;">
      Votre pack est maintenant prêt à être téléchargé et imprimé à la maison.
    </p>

    <div style="text-align:center;">${button(allFilesUrl, plusieurs ? 'Télécharger mes packs' : 'Télécharger mon pack')}</div>
    ${plusieurs
      ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0;">${itemsHtml}</table>`
      : ''}

    <p style="font-size:15px;line-height:1.7;margin:18px 0 0;">
      Une fois téléchargé, vous pouvez imprimer uniquement les pages dont vous avez besoin et
      avancer à votre rythme, selon les envies et les besoins de votre enfant.
    </p>
    <p style="font-size:15px;line-height:1.7;margin:14px 0 0;">
      J’espère que ces outils trouveront naturellement leur place dans votre quotidien et vous
      permettront de partager de jolis moments en famille.
    </p>
    <p style="font-size:15px;line-height:1.7;margin:14px 0 0;">
      Une question ou un souci avec votre téléchargement ? Vous pouvez simplement répondre à cet
      e-mail, je serai ravie de vous aider.
    </p>

    <p style="font-size:15px;line-height:1.7;margin:22px 0 0;">À très bientôt,</p>
    <p style="font-size:15px;line-height:1.6;margin:10px 0 0;">
      <strong style="color:#66584B;">Sandrine</strong><br>
      <span style="font-size:13px;color:#91877B;">Éducatrice de jeunes enfants &amp; maman de 2 garçons</span>
    </p>
    <p style="font-size:13px;line-height:1.6;margin:14px 0 0;color:#788568;">
      <strong>Les Petits Repères</strong><br>
      Des outils pour grandir en confiance
    </p>

    <p style="font-size:12px;line-height:1.7;color:#91877B;margin:22px 0 0;border-top:1px solid rgba(102,88,75,.08);padding-top:14px;">
      Vos fichiers restent disponibles à tout moment dans votre espace client, rubrique
      « Mes téléchargements ». Commande ${order.reference} — ${formatPrice(order.totalCents)}${order.demo ? ' (commande de démonstration)' : ''}.
    </p>
  `;

  const text = [
    `Bonjour${order.firstName ? ` ${order.firstName}` : ''},`,
    '',
    'Merci beaucoup pour votre commande et bienvenue dans l’univers Les Petits Repères',
    'Votre pack est maintenant prêt à être téléchargé et imprimé à la maison.',
    '',
    `Télécharger mon pack : ${allFilesUrl}`,
    ...(plusieurs ? ['', ...links.map((l) => `- ${l.name} : ${l.url}`)] : []),
    '',
    'Une fois téléchargé, vous pouvez imprimer uniquement les pages dont vous avez besoin et avancer à votre rythme, selon les envies et les besoins de votre enfant.',
    '',
    'J’espère que ces outils trouveront naturellement leur place dans votre quotidien et vous permettront de partager de jolis moments en famille.',
    '',
    'Une question ou un souci avec votre téléchargement ? Vous pouvez simplement répondre à cet e-mail, je serai ravie de vous aider.',
    '',
    'À très bientôt,',
    '',
    'Sandrine',
    'Éducatrice de jeunes enfants & maman de 2 garçons',
    '',
    'Les Petits Repères',
    'Des outils pour grandir en confiance',
    '',
    `Vos fichiers restent disponibles dans votre espace client. Commande ${order.reference} — ${formatPrice(order.totalCents)}.`,
  ].join('\n');

  return send({
    to: order.email,
    subject: 'Votre pack Les Petits Repères est prêt',
    html: layout(inner),
    text,
  });
}

/* ---------------------------------------------------------------------------
 *  Email de connexion à l'espace client (lien magique)
 * ------------------------------------------------------------------------- */

export async function sendLoginEmail(email: string, url: string): Promise<boolean> {
  const inner = `
    <h1 style="margin:14px 0 6px;font-family:Georgia,serif;font-size:24px;font-weight:500;color:#5F6B51;text-align:center;">Votre lien de connexion</h1>
    <p style="font-size:15px;line-height:1.7;margin:16px 0;">Bonjour,</p>
    <p style="font-size:15px;line-height:1.7;margin:0 0 18px;">Voici votre lien pour accéder à votre espace client et à vos téléchargements.</p>
    <div style="text-align:center;">${button(url, 'Accéder à mon espace')}</div>
    <p style="font-size:13px;line-height:1.7;color:#91877B;margin:18px 0 0;">Si vous n’êtes pas à l’origine de cette demande, ignorez simplement cet email.</p>
  `;

  return send({
    to: email,
    subject: 'Votre lien de connexion — Les Petits Repères',
    html: layout(inner),
    text: `Voici votre lien de connexion : ${url}\n\nSi vous n’êtes pas à l’origine de cette demande, ignorez cet email.`,
  });
}

/* ---------------------------------------------------------------------------
 *  Accusé de réception du formulaire de contact (vers la boutique)
 * ------------------------------------------------------------------------- */

export async function sendContactEmail(data: {
  name: string
  email: string
  subject: string
  message: string
  orderReference?: string
}): Promise<boolean> {
  const inner = `
    <h1 style="margin:14px 0 6px;font-family:Georgia,serif;font-size:22px;font-weight:500;color:#5F6B51;">Nouveau message depuis le site</h1>
    <p style="font-size:14px;line-height:1.8;margin:14px 0 0;">
      <strong>De :</strong> ${data.name} (${data.email})<br>
      <strong>Sujet :</strong> ${data.subject}<br>
      ${data.orderReference ? `<strong>Commande :</strong> ${data.orderReference}<br>` : ''}
    </p>
    <p style="font-size:15px;line-height:1.7;margin:16px 0 0;white-space:pre-wrap;">${data.message}</p>
  `;

  return send({
    to: site.email,
    replyTo: data.email,
    subject: `[Contact] ${data.subject}`,
    html: layout(inner),
    text: `De : ${data.name} (${data.email})\nSujet : ${data.subject}\n${
      data.orderReference ? `Commande : ${data.orderReference}\n` : ''
    }\n${data.message}`,
  });
}
