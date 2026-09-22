import type { Order } from './types';
import { site } from './site';
import { formatPrice } from './format';
import { createDownloadToken, downloadTtlHours, downloadUrl } from './tokens';

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
    const response = await fetch('https://api.resend.com/emails', {
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

  const itemsHtml = links
    .map(
      (link) => `<tr>
        <td style="padding:10px 0;border-bottom:1px solid rgba(102,88,75,.08);">
          <div style="font-size:15px;font-weight:700;color:#66584B;">${link.name}</div>
          <a href="${link.url}" style="font-size:13px;color:#C26A4B;text-decoration:underline;">Télécharger le PDF</a>
        </td></tr>`,
    )
    .join('');

  const inner = `
    <h1 style="margin:14px 0 6px;font-family:Georgia,serif;font-size:26px;font-weight:500;color:#5F6B51;text-align:center;">Vos fichiers sont prêts !</h1>
    <p style="font-size:15px;line-height:1.7;margin:16px 0;">Bonjour${order.firstName ? ` ${order.firstName}` : ''},</p>
    <p style="font-size:15px;line-height:1.7;margin:0 0 18px;">Merci pour votre commande et bienvenue chez Les Petits Repères ♡</p>
    <div style="text-align:center;">${button(allFilesUrl, 'Télécharger mes fichiers')}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:18px 0 6px;">${itemsHtml}</table>
    <p style="font-size:14px;line-height:1.7;color:#7C6E60;margin:18px 0 0;">
      Vous pouvez imprimer vos documents autant de fois que nécessaire pour votre usage personnel.
    </p>
    <p style="font-size:13px;line-height:1.7;color:#91877B;margin:14px 0 0;">
      Ces liens sont personnels et valables ${downloadTtlHours} h. Vos fichiers restent disponibles à tout moment
      dans votre espace client, rubrique « Mes téléchargements ».
    </p>
    <p style="font-size:13px;line-height:1.7;color:#91877B;margin:14px 0 0;">
      Commande ${order.reference} — ${formatPrice(order.totalCents)}${order.demo ? ' (commande de démonstration)' : ''}
    </p>
    <p style="font-size:15px;line-height:1.7;margin:22px 0 0;">À bientôt,<br>Les Petits Repères</p>
  `;

  const text = [
    `Bonjour${order.firstName ? ` ${order.firstName}` : ''},`,
    '',
    'Merci pour votre commande et bienvenue chez Les Petits Repères.',
    '',
    'Vos fichiers sont prêts :',
    ...links.map((l) => `- ${l.name} : ${l.url}`),
    '',
    `Tous vos fichiers : ${allFilesUrl}`,
    '',
    'Vous pouvez imprimer vos documents autant de fois que nécessaire pour votre usage personnel.',
    `Ces liens sont valables ${downloadTtlHours} h ; vos fichiers restent disponibles dans votre espace client.`,
    '',
    `Commande ${order.reference} — ${formatPrice(order.totalCents)}`,
    '',
    'À bientôt,',
    'Les Petits Repères',
  ].join('\n');

  return send({
    to: order.email,
    subject: 'Votre commande Les Petits Repères est prête',
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
