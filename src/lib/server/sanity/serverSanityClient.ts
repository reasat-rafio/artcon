import { SANITY_API_TOKEN } from '$env/static/private';
import {
  PUBLIC_SANITY_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
} from '$env/static/public';

import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: PUBLIC_SANITY_PROJECT_ID,
  dataset: PUBLIC_SANITY_DATASET,
  apiVersion: '2021-10-21',
  token: SANITY_API_TOKEN,
  useCdn: process.env.NODE_ENV === 'production',
});
