'use client';

import { useState } from 'react';
import { ChevronDownIcon } from './icons';

export interface AccordionItem {
  question: string
  answer: string
}

/** Accordéon accessible : un vrai bouton, aria-expanded, contenu lié par id. */
export function Accordion({
  items,
  idPrefix = 'faq',
  defaultOpen,
}: {
  items: AccordionItem[]
  idPrefix?: string
  defaultOpen?: number
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen ?? null);

  return (
    <ul className="divide-y divide-ink/[0.08] overflow-hidden rounded-card border border-ink/[0.07] bg-white">
      {items.map((item, index) => {
        const isOpen = open === index;
        const panelId = `${idPrefix}-panel-${index}`;
        const buttonId = `${idPrefix}-button-${index}`;

        return (
          <li key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-cream/70 sm:px-6"
              >
                <span className="font-script text-[1.28rem] leading-snug text-sage-dark">
                  {item.question}
                </span>
                <ChevronDownIcon
                  size={20}
                  className={`mt-0.5 shrink-0 text-sage-dark transition-transform duration-300 ease-calm ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-5 sm:px-6"
            >
              <p className="max-w-prose text-[0.92rem] leading-relaxed text-ink-soft">
                {item.answer}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
