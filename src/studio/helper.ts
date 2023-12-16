import type { PortableTextBlock } from 'sanity';
import type { IFields } from './components/csv-popup/artist/CSVPopup';
import Papa from 'papaparse';
import type { SanityDocument } from '@sanity/client';
import { DateTime } from 'luxon';

const defaultDocumentKeys = [
  '_createdAt',
  '_id',
  '_rev',
  '_updatedAt',
  '_type',
  'seo',
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
  const headers = array.map(({ key }) => key);
  const values = array.map(({ value }) =>
    typeof value === 'object' ? JSON.stringify(value) : value,
  );
  const csvData = [headers, values];
  const csv = Papa.unparse(csvData);
  return csv;
}

export function downloadCSV(csv: string, filename: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
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

export function cleanCSV(csvData: string) {
  const withoutTripleQuotes = csvData.replace(/"""/g, '"');
  return withoutTripleQuotes.replace(/\n/g, '');
}

export const formatDate = (date: string) =>
  DateTime.fromISO(date).toFormat('dd LLL yyyy');

export const removeDraftsPrefix = (string: string): string => {
  if (string.startsWith('drafts.')) {
    return string.substring(7);
  } else {
    return string;
  }
};
