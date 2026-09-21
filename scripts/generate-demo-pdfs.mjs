#!/usr/bin/env node
/**
 * Génère des PDF de démonstration dans `private/files/`, un par produit du
 * catalogue, afin que le parcours d'achat soit testable de bout en bout —
 * y compris le téléchargement réel du fichier.
 *
 * Aucune dépendance : les PDF sont écrits directement au format PDF 1.4.
 * Remplacez simplement ces fichiers par vos vrais PDF, en gardant les mêmes
 * noms (voir le champ `file` de chaque produit dans src/lib/catalog.ts).
 *
 *   npm run seed:pdf
 */

import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'private', 'files');

/* ---------------------------------------------------------------------------
 *  Lecture des produits directement dans le catalogue TypeScript.
 *  On extrait les paires (nom, fichier) par expression régulière : cela évite
 *  d'avoir à compiler du TypeScript pour un script de génération.
 * ------------------------------------------------------------------------- */

const catalogSource = readFileSync(join(root, 'src', 'lib', 'catalog.ts'), 'utf8');

const products = [];
const blocks = catalogSource.split(/\n  \{\n/).slice(1);

for (const block of blocks) {
  const name = block.match(/\n    name: '([^']+)'/)?.[1];
  const file = block.match(/\n    file: '([^']+)'/)?.[1];
  const pages = Number(block.match(/\n    pages: (\d+)/)?.[1] ?? 1);
  const tagline = block.match(/\n    tagline:\s*'([^']*)'/)?.[1] ?? '';
  if (name && file) products.push({ name, file, pages, tagline });
}

if (products.length === 0) {
  console.error('Aucun produit trouvé dans src/lib/catalog.ts — rien à générer.');
  process.exit(1);
}

/* ---------------------------------------------------------------------------
 *  Écriture d'un PDF minimal mais parfaitement valide.
 * ------------------------------------------------------------------------- */

/** Échappe une chaîne pour un littéral texte PDF en WinAnsi. */
function pdfString(value) {
  const replacements = {
    à: '\xE0', â: '\xE2', ä: '\xE4', é: '\xE9', è: '\xE8', ê: '\xEA', ë: '\xEB',
    î: '\xEE', ï: '\xEF', ô: '\xF4', ö: '\xF6', ù: '\xF9', û: '\xFB', ü: '\xFC',
    ç: '\xE7', É: '\xC9', È: '\xC8', À: '\xC0', Ç: '\xC7', '’': "'", '—': '-',
    '«': '"', '»': '"', '♡': '', '·': '-',
  };

  return value
    .split('')
    .map((char) => replacements[char] ?? char)
    .join('')
    .replace(/[\\()]/g, (match) => `\\${match}`);
}

function buildPdf({ title, subtitle, pageNumber, totalPages }) {
  const lines = [
    { y: 742, size: 9, text: 'LES PETITS REPERES', font: 'F2' },
    { y: 700, size: 22, text: title, font: 'F2' },
    { y: 672, size: 12, text: subtitle, font: 'F1' },
    { y: 626, size: 11, text: 'Fichier de demonstration', font: 'F2' },
    { y: 604, size: 10, text: 'Ce PDF est un fichier de test genere automatiquement par', font: 'F1' },
    { y: 588, size: 10, text: 'npm run seed:pdf, pour que le parcours d\'achat soit', font: 'F1' },
    { y: 572, size: 10, text: 'testable de bout en bout.', font: 'F1' },
    { y: 540, size: 10, text: 'Remplacez-le par le vrai fichier dans private/files/,', font: 'F1' },
    { y: 524, size: 10, text: 'en conservant le meme nom de fichier.', font: 'F1' },
    { y: 480, size: 10, text: 'Usage personnel et familial - impression illimitee.', font: 'F1' },
    { y: 120, size: 9, text: `Page ${pageNumber} sur ${totalPages}`, font: 'F1' },
    { y: 104, size: 9, text: 'lespetitsreperes.fr', font: 'F1' },
  ];

  const text = lines
    .map(
      (line) =>
        `BT /${line.font} ${line.size} Tf 1 0 0 1 72 ${line.y} Tm (${pdfString(line.text)}) Tj ET`,
    )
    .join('\n');

  // Un filet vert sauge en haut de page et un cadre léger.
  const graphics = [
    '0.47 0.52 0.41 RG 2 w',
    '72 762 m 523 762 l S',
    '0.91 0.85 0.77 RG 1 w',
    '72 140 m 523 140 l S',
    '0.85 0.51 0.38 rg',
    '72 646 m 120 646 l 120 650 l 72 650 l f',
  ].join('\n');

  return `${graphics}\n${text}`;
}

function assemblePdf(contentStreams) {
  const objects = [];
  const pageCount = contentStreams.length;

  // 1 : catalogue, 2 : pages, 3..: contenus, puis polices
  const pageIds = contentStreams.map((_, index) => 4 + index * 2);
  const contentIds = contentStreams.map((_, index) => 5 + index * 2);
  const fontRegularId = 4 + pageCount * 2;
  const fontBoldId = fontRegularId + 1;

  objects.push({ id: 1, body: '<< /Type /Catalog /Pages 2 0 R >>' });
  objects.push({
    id: 2,
    body: `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageCount} >>`,
  });
  objects.push({ id: 3, body: '<< /Type /Outlines /Count 0 >>' });

  contentStreams.forEach((stream, index) => {
    objects.push({
      id: pageIds[index],
      body: `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentIds[index]} 0 R >>`,
    });
    objects.push({
      id: contentIds[index],
      body: `<< /Length ${Buffer.byteLength(stream, 'latin1')} >>\nstream\n${stream}\nendstream`,
    });
  });

  objects.push({
    id: fontRegularId,
    body: '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
  });
  objects.push({
    id: fontBoldId,
    body: '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',
  });

  objects.sort((a, b) => a.id - b.id);

  let pdf = '%PDF-1.4\n';
  const offsets = [];

  for (const object of objects) {
    offsets.push({ id: object.id, offset: Buffer.byteLength(pdf, 'latin1') });
    pdf += `${object.id} 0 obj\n${object.body}\nendobj\n`;
  }

  const xrefOffset = Buffer.byteLength(pdf, 'latin1');
  const maxId = objects[objects.length - 1].id;

  pdf += `xref\n0 ${maxId + 1}\n0000000000 65535 f \n`;
  for (let id = 1; id <= maxId; id += 1) {
    const entry = offsets.find((o) => o.id === id);
    pdf += entry
      ? `${String(entry.offset).padStart(10, '0')} 00000 n \n`
      : '0000000000 65535 f \n';
  }

  pdf += `trailer\n<< /Size ${maxId + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return Buffer.from(pdf, 'latin1');
}

/* ------------------------------- Exécution ------------------------------- */

mkdirSync(outDir, { recursive: true });

let created = 0;
let skipped = 0;

for (const product of products) {
  const target = join(outDir, product.file);

  if (existsSync(target) && !process.argv.includes('--force')) {
    skipped += 1;
    continue;
  }

  // Trois pages suffisent pour une démonstration, même pour les gros packs.
  const totalPages = Math.min(product.pages, 3) || 1;
  const streams = Array.from({ length: totalPages }, (_, index) =>
    buildPdf({
      title: product.name,
      subtitle: product.tagline,
      pageNumber: index + 1,
      totalPages,
    }),
  );

  writeFileSync(target, assemblePdf(streams));
  created += 1;
}

console.log(
  `PDF de démonstration : ${created} créé(s), ${skipped} déjà présent(s) — dossier private/files/`,
);
if (skipped > 0) console.log('Utilisez --force pour écraser les fichiers existants.');
