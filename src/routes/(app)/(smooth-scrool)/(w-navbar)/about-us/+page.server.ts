import { asset } from '@/lib/sanity/sanity-image';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { error, type ServerLoad } from '@sveltejs/kit';
import groq from 'groq';

const query = groq`*[_id =='aboutUsPage'][0]{
    ...,
    sections[]{
        ...,
        ${asset('image')},
        asset{
            ...,
            ${asset('image')},
            video{
              "webm": video_webm.asset->url,
              "mov": video_hevc.asset->url,
            }
        },
    },
    "team": *[_type == "team"]|order(orderRank){
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
