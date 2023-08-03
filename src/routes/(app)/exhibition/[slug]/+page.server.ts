import { sanityClient } from '@/lib/sanity/sanityClient.js';
import { error, type ServerLoad } from '@sveltejs/kit';
import groq from 'groq';
import { asset } from '@/lib/sanity/sanity-image/query.js';

const query = (params: Partial<Record<string, string>>) =>
  groq`*[_type== "exhibition" && slug.current == "${params.slug}"] [0]{
    ...,
    tags[]->,
    sections[]{
        ...,
        ${asset('image')},
        ${asset('images[]', { as: 'images' })},
        ${asset('artworks[]', { as: 'artworks' })},
        asset {
            ...,
            ${asset('image')},
            video{
                "webm": video_webm.asset->url,
                "mov": video_hevc.asset->url,
            }
        },
        vrExhibition {
            ...,
            ${asset('image')},
        },
        featured[0]{
            ...,
            ${asset('images[]', { as: 'images' })},
            descriptionBlock{
                ...,
                socials[]{
                    ...,
                    ${asset('icon')},
                }
            }
        },
        newsAndMedia[]{
            ...,
            ${asset('image')},
        }
    }

  }`;

export const load: ServerLoad = async ({ params }) => {
  const data = await sanityClient.fetch(query(params));

  if (!data) throw error(404, 'Not found');

  return {
    page: data,
  };
};
