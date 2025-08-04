import { div, span, h2 } from './htmlElements';
import { DOMFC } from './types';

// Improved: Add prop types, better structure, and more realistic usage

export type LabeledValueProps = {
  label: string;
  value: string | number;
  highlight?: boolean;
};

export const LabeledValue: DOMFC<LabeledValueProps> = (
  { label, value, highlight = false },
  ...children
) => {
  return div(
    {
      className: highlight ? 'labeled-value--highlight' : 'labeled-value',
      style: highlight ? { backgroundColor: '#ffeeba' } : undefined,
    },
    h2({}, label),
    span({ className: 'labeled-value__content' }, value),
    children
  );
};

// Improved: Accepts a title and renders children in a section
export type SectionProps = {
  title?: string;
};

export const Section: DOMFC<SectionProps> = (
  { title = 'Default Section' },
  ...children
) => {
  return div(
    { className: 'section' },
    h2({}, title),
    div({ className: 'section__content' }, children)
  );
};
