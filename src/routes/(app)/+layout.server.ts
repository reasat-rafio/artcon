import { siteQuery } from '@/lib/sanity/query';
import { sanityClient } from '@/lib/sanity/sanity-client';
import { error } from '@sveltejs/kit';

export const load = async () => {
  const data = await sanityClient.fetch(siteQuery);

  if (!data)
    throw error(404, {message: 'Not found'})

  return {
    site: data
  };
};
