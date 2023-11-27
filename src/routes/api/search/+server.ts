import { defaultSearchQuery, searchQuery } from '@/lib/sanity/query';
import { sanityClient } from '@/lib/server/sanity/serverSanityClient';
import { json, type RequestHandler } from '@sveltejs/kit';

const getDefaultSearchResult = async () => {
  const data = await sanityClient.fetch(defaultSearchQuery);
  if (!data)
    json({ success: false, message: 'Not Data found' }, { status: 404 });

  return data;
};

const getSearchResultFromQ = async (q: string) => {
  const data = await sanityClient.fetch(searchQuery(q));

  if (!data)
    json({ success: false, message: 'Not Data found' }, { status: 404 });
  return data;
};

export const GET: RequestHandler = async ({ url }) => {
  const queryString = url.searchParams.get('q');

  if (!queryString) {
    const data = await getDefaultSearchResult();
    return json({ success: true, data }, { status: 200 });
  }

  const data = await getSearchResultFromQ(queryString);
  console.log(data);

  return json({ success: true, data }, { status: 200 });
};
