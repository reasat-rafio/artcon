import { asset } from '@/lib/sanity/sanity-image';
import { sanityClient } from '@/lib/server/sanity/serverSanityClient';
import { error, type ServerLoad } from '@sveltejs/kit';
import groq from 'groq';

const query = (params: Partial<Record<string, string>>) =>
  groq`*[_type == "exhibition" && slug.current = "${params.slug}"][0]{
    _id,
    ${asset('previewDisplayImage')},
  }`;

export const load: ServerLoad = async ({ params }) => {
  const data = await sanityClient.fetch(query(params));
  if (!data) throw error(404, 'Not found');

  return { page: data };
};
