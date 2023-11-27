import { defaultSearchQuery } from '@/lib/sanity/query';
import { sanityClient } from '@/lib/server/sanity/serverSanityClient';
import { error } from '@sveltejs/kit';

export const load = async () => {
  const data = await sanityClient.fetch(defaultSearchQuery);
  if (!data) throw error(404, { message: 'Not found' });

  return {
    page: data,
  };
};
