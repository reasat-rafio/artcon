import {
  PUBLIC_SANITY_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_API_TOKEN,
} from '$env/static/public';

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const sanityClient = createClient({
  projectId: PUBLIC_SANITY_PROJECT_ID,
  dataset: PUBLIC_SANITY_DATASET,
  apiVersion: '2021-10-21',
  token: PUBLIC_SANITY_API_TOKEN,
  useCdn: process.env.NODE_ENV === 'production',
});

export const imageBuilder = imageUrlBuilder(sanityClient);

export const urlFor = (source: SanityImageSource) => {
  return imageBuilder.image(source);
};
