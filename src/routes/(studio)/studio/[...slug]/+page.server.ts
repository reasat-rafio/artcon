export const ssr = false;

import { sanityClient } from '@/lib/sanity/sanityClient';
import groq from 'groq';

const query = groq`*[_type == "site.logos"][0] {favicon}`;

export const load = async () => {
  const data = await sanityClient.fetch(query);

  return {
    site: data,
  };
};
