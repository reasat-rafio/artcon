import { siteQuery } from '@/lib/sanity/query';
import { sanityClient } from '@/lib/sanity/sanityClient';
import type { SiteProps } from '@/lib/types/common.types';
import { error } from '@sveltejs/kit';

export const load = async () => {
  const data = (await sanityClient.fetch(siteQuery)) as SiteProps;
  if (!data) throw error(404, { message: 'Not found' });

  return { site: data };
};
