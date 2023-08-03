import { urlFor } from '@/lib/sanity/sanityClient';
import type { ArtistDocument } from '@/studio/lib/types';
import { toPlainText } from '@portabletext/svelte';
import { DateTime } from 'luxon';
import type { PortableTextBlock } from 'sanity';

export const formatData = (data: ArtistDocument) => {
  const fData = data;

  for (const key in data) {
    if (key === 'note' || key === 'shortBio') {
      if (data[key]) fData[key] = toPlainText(data[key] as PortableTextBlock[]);
    } else if (key === 'artistPortrait') {
      if (data[key]) fData[key] = urlFor(data[key]).url();
    } else if (key === 'born' || key === 'died') {
      if (data[key])
        fData[key] = DateTime.fromISO(data[key]).toFormat('d MMMM, yyyy');
    } else if (key === 'name') {
      let concatName;
      if (typeof data[key] === 'object') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        concatName = `${data[key].en}, ${data[key].bn}`;
      }
      fData[key] = concatName as string;
    } else {
      if (typeof data[key] === 'string') {
        fData[key] = data[key].trim();
      } else fData[key] = data[key];
    }
  }

  return fData;
};
