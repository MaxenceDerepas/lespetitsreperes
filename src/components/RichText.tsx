import type { ReactNode } from 'react';

/**
 * Rendu d'un markdown volontairement limité : `## titre`, `### titre`,
 * paragraphes, listes `- ` et `**gras**`.
 *
 * Ce petit convertisseur évite d'embarquer une bibliothèque markdown complète
 * pour six articles de blog — conformément à l'objectif de performance.
 */

function inline(text: string, keyPrefix: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((chunk, index) => {
    if (chunk.startsWith('**') && chunk.endsWith('**')) {
      return <strong key={`${keyPrefix}-${index}`}>{chunk.slice(2, -2)}</strong>;
    }
    return <span key={`${keyPrefix}-${index}`}>{chunk}</span>;
  });
}

export function RichText({ content, className = '' }: { content: string; className?: string }) {
  const blocks = content.trim().split(/\n{2,}/);
  const nodes: ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = (key: string) => {
    if (!listBuffer.length) return;
    nodes.push(
      <ul key={key}>
        {listBuffer.map((item, index) => (
          <li key={`${key}-${index}`}>{inline(item, `${key}-${index}`)}</li>
        ))}
      </ul>,
    );
    listBuffer = [];
  };

  blocks.forEach((block, blockIndex) => {
    const key = `b${blockIndex}`;
    const lines = block.split('\n');

    if (lines.every((line) => line.trim().startsWith('- '))) {
      listBuffer.push(...lines.map((line) => line.trim().slice(2)));
      flushList(key);
      return;
    }

    flushList(`${key}-pre`);

    if (block.startsWith('### ')) {
      nodes.push(<h3 key={key}>{inline(block.slice(4), key)}</h3>);
      return;
    }
    if (block.startsWith('## ')) {
      nodes.push(<h2 key={key}>{inline(block.slice(3), key)}</h2>);
      return;
    }

    nodes.push(<p key={key}>{inline(block.replace(/\n/g, ' '), key)}</p>);
  });

  flushList('tail');

  return <div className={`prose-lpr ${className}`}>{nodes}</div>;
}
