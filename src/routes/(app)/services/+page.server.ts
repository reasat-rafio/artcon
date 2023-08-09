import { asset } from '@/lib/sanity/sanity-image';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { error, type ServerLoad } from '@sveltejs/kit';
import groq from 'groq';

const query = groq`*[_id =='servicePage'][0]{
    ...,
    sections[]{
        ...,
        ${asset('image')},
        services[]{
            ...,
            ${asset('image')},
        },
    },
    "services": *[_type == "service"]|order(orderRank){
      ...,
      ${asset('image')}
    }
}`;

export const load: ServerLoad = async () => {
  const data = await sanityClient.fetch(query);
  if (!data) throw error(404, { message: 'Not found' });

  return {
    page: data,
  };
};