import { asset } from '@/lib/sanity/sanity-image';
import { sanityClient } from '@/lib/server/sanity/serverSanityClient';
import { error, type ServerLoad } from '@sveltejs/kit';
import groq from 'groq';

const query = (params: Partial<Record<string, string>>) =>
  groq`*[_type == "vr" && slug.current == "${params.slug}"][0]{
    ...,
    gallery->,
    category->,
    sliderImageVideo {
      ...,
      ${asset('image')},
      video{
        "webm": video_webm.asset->url,
        "mov": video_hevc.asset->url,
      }
    },
    ${asset('previewImage')},
    ${asset('placeholderImage')},
  }`;

export const load: ServerLoad = async ({ params }) => {
  const data = await sanityClient.fetch(query(params));
  if (!data) throw error(404, 'Not found');

  return { page: data };
};
