import type { PortableTextBlock, SanityDocument } from 'sanity';
import type { IFields } from './components/CSVPopup';
import Papa from 'papaparse';
import type PortableText from '@/lib/portable-text/PortableText.svelte';

const defaultDocumentKeys = [
  '_createdAt',
  '_id',
  '_rev',
  '_updatedAt',
  '_type',
];

export function convertObjectToArray(obj: SanityDocument) {
  const keys = Object.keys(obj);
  const newArray = [];

  for (const key of keys) {
    if (!defaultDocumentKeys.includes(key)) {
      newArray.push({ key, state: true, value: obj[key] });
    }
  }

  return newArray;
}

export function convertArrayToCSV(array: IFields[]) {
  const csvData = array.map(({ key, value }) => ({
    key,
    value: JSON.stringify(value),
  }));

  const csv = Papa.unparse(csvData, {
    header: true,
  });

  return csv;
}

export function downloadCSV(csv: string, filename: string) {
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  window.URL.revokeObjectURL(url);
}

const defaults = { nonTextBehavior: 'remove' };
export function blocksToText(blocks: PortableTextBlock[], opts = {}) {
  const options = Object.assign({}, defaults, opts);
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove'
          ? ''
          : `[${block._type} block]`;
      }
      return (block.children as any).map((child: any) => child.text).join('');
    })
    .join('\n\n');
}
