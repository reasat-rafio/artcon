import { sanityClient } from '@/lib/sanity/sanityClient.js';
import { error } from '@sveltejs/kit';
import groq from 'groq';
import type { RouteParams } from './$types.js';
import { asset } from '@/lib/sanity/sanity-image/query.js';

const query = (params: RouteParams) =>
  groq`*[_type== "exhibition" && slug.current == "${params.slug}"] [0]{
    ...,
    sections[]{
        ...,
        ${asset('image')},
        asset {
            ...,
            ${asset('image')},
            video{
                "webm": video_webm.asset->url,
                "mov": video_hevc.asset->url,
            }
        },
        vrExhibitionnCta {
            ...,
            ${asset('image')},
        },
        featured[]{
            ...,
            ${asset('images[]', { as: 'images' })},
        }
    }

  }`;

export const load = async ({ params }) => {
  const data = await sanityClient.fetch(query(params));

  if (!data) throw error(404, 'Not found');

  return {
    page: data,
  };
};
