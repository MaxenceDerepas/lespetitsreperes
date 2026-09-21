/**
 * Encart affiché en tête des pages légales.
 *
 * Les textes fournis sont des modèles complets et cohérents pour une
 * micro-entreprise française vendant des fichiers numériques, mais ils doivent
 * être relus et complétés (SIRET, adresse, médiateur) avant mise en ligne.
 * Cet encart est à retirer une fois cette relecture faite.
 */
export function LegalNotice() {
  return (
    <aside
      role="note"
      className="rounded-card border border-gold/35 bg-[#FAF2E4] px-5 py-4 text-[0.84rem] leading-relaxed text-[#7A5A20]"
    >
      <strong className="font-semibold">À compléter avant la mise en ligne.</strong> Ce texte est
      un modèle adapté à une micro-entreprise française vendant des produits numériques. Il reste
      à y renseigner le SIRET, l’adresse, l’hébergeur et le médiateur de la consommation
      (voir&nbsp;
      <code className="font-mono text-[0.78rem]">src/lib/site.ts</code>), puis à le faire relire.
      Supprimez ensuite ce bloc&nbsp;: <code className="font-mono text-[0.78rem]">
        src/components/LegalNotice.tsx
      </code>
      .
    </aside>
  );
}
