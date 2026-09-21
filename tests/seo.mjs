// Nécessite Playwright : `npx playwright install chromium`
// Serveur à tester : `npm run dev` dans un autre terminal.
import { chromium } from 'playwright';

const B = process.env.TEST_URL ?? 'http://localhost:3000';

const urls = ['/', '/boutique', '/boutique/pack-routines', '/categories', '/categories/emotions',
  '/blog', '/blog/accueillir-la-colere-sans-la-nier', '/a-propos', '/contact', '/faq',
  '/cgv', '/confidentialite', '/mentions-legales'];

const audit = () => {
  const get = (sel, attr = 'content') => document.querySelector(sel)?.getAttribute(attr) ?? null;
  const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')]
    .map((s) => { try { return JSON.parse(s.textContent); } catch { return null; } })
    .filter(Boolean);

  const flat = [];
  const walk = (o) => {
    if (Array.isArray(o)) return o.forEach(walk);
    if (o && typeof o === 'object') { if (o['@type']) flat.push(o); Object.values(o).forEach(walk); }
  };
  schemas.forEach(walk);

  return {
    title: document.title,
    desc: get('meta[name=description]'),
    canonical: get('link[rel=canonical]', 'href'),
    robots: get('meta[name=robots]'),
    ogTitle: get('meta[property="og:title"]'),
    ogDesc: get('meta[property="og:description"]'),
    ogImage: get('meta[property="og:image"]'),
    ogType: get('meta[property="og:type"]'),
    twCard: get('meta[name="twitter:card"]'),
    twImage: get('meta[name="twitter:image"]'),
    h1: [...document.querySelectorAll('h1')].map((h) => h.textContent.trim().slice(0, 60)),
    h2count: document.querySelectorAll('h2').length,
    imgs: document.querySelectorAll('img').length,
    imgsNoAlt: [...document.querySelectorAll('img')].filter((i) => !i.getAttribute('alt')).length,
    words: (document.querySelector('main')?.innerText || '').split(/\s+/).filter(Boolean).length,
    internalLinks: [...document.querySelectorAll('main a[href^="/"]')].length,
    schemaTypes: flat.map((o) => o['@type']),
    productImage: flat.find((o) => o['@type'] === 'Product')?.image ?? null,
    articleImage: flat.find((o) => o['@type'] === 'BlogPosting')?.image ?? null,
    orgLogo: flat.find((o) => o['@type'] === 'OnlineStore')?.logo ?? null,
    itemList: flat.find((o) => o['@type'] === 'ItemList')?.numberOfItems ?? null,
    priceValid: flat.find((o) => o['@type'] === 'Offer')?.priceValidUntil ?? null,
  };
};

const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 }, locale: 'fr-FR' })).newPage();

const rows = [];
for (const u of urls) {
  await page.goto(B + u, { waitUntil: 'networkidle' });
  rows.push({ url: u, ...(await page.evaluate(audit)) });
}

const warn = [];
for (const r of rows) {
  const t = r.title?.length ?? 0;
  const d = r.desc?.length ?? 0;
  console.log(`\n${r.url}`);
  console.log(`  title (${t})  ${r.title}`);
  console.log(`  desc  (${d})  ${(r.desc ?? '—').slice(0, 100)}`);
  console.log(`  canonical: ${r.canonical ?? 'MANQUANT'} | og:image: ${r.ogImage ?? 'MANQUANT'} | h1: ${r.h1.length} | h2: ${r.h2count}`);
  console.log(`  mots: ${r.words} | liens internes: ${r.internalLinks} | <img>: ${r.imgs} (sans alt: ${r.imgsNoAlt})`);
  console.log(`  schémas: ${r.schemaTypes.join(', ') || 'aucun'}`);
  if (t > 60) warn.push(`${r.url} — title trop long (${t} car.)`);
  if (t < 25) warn.push(`${r.url} — title trop court (${t} car.)`);
  if (d > 160) warn.push(`${r.url} — meta description trop longue (${d} car.)`);
  if (d && d < 110) warn.push(`${r.url} — meta description courte (${d} car.)`);
  if (!r.canonical) warn.push(`${r.url} — canonical manquant`);
  if (!r.ogImage) warn.push(`${r.url} — og:image manquant`);
  if (r.h1.length !== 1) warn.push(`${r.url} — ${r.h1.length} h1`);
  if (r.schemaTypes.includes('Product') && !r.productImage) warn.push(`${r.url} — Product sans image (rich result refusé)`);
  if (r.schemaTypes.includes('BlogPosting') && !r.articleImage) warn.push(`${r.url} — BlogPosting sans image`);
  if (!r.orgLogo) warn.push(`${r.url} — OnlineStore sans logo`);
  if (r.schemaTypes.includes('Product') && !r.priceValid) warn.push(`${r.url} — Offer sans priceValidUntil`);
  if (['/boutique', '/categories/emotions'].includes(r.url) && !r.itemList) warn.push(`${r.url} — ItemList manquant`);
}

console.log('\n════════ POINTS À CORRIGER ════════');
warn.forEach((w) => console.log('  ·', w));
console.log(`  total : ${warn.length}`);
await browser.close();
process.exit(warn.length === 0 ? 0 : 1);
