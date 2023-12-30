import { defaultSearchQuery, searchQuery } from '@/lib/sanity/query';
import { sanityClient } from '@/lib/server/sanity/serverSanityClient';
import { error } from '@sveltejs/kit';

export const load = async ({ url }) => {
  const queryString = url.searchParams.get('q');

  const data = !queryString
    ? await sanityClient.fetch(defaultSearchQuery)
    : await sanityClient.fetch(searchQuery(queryString));

  if (!data) throw error(404, { message: 'Not found' });

  return {
    page: data,
  };
};
