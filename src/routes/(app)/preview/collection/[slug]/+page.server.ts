import { asset } from '@/lib/sanity/sanity-image';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { error, type ServerLoad } from '@sveltejs/kit';
import groq from 'groq';

const query = (params: Partial<Record<string, string>>) =>
  groq`*[_type == "collection" && slug.current == "${params.slug}"][0]{
    _id,
    _type,
    name,
    type,
    status,
    slug,
    cta,
    seo,
    inquiryButton,
    isAvailable,
    provenance,
    information,
    ${asset('artworkImages[]', { as: 'artworkImages' })},
    "artist": *[_type == 'artist' && references(^._id)][0]{
      ...personalDocuments {
        "name": name.en,
        born,
        country
      }
    },
    sliderImageVideo {
      ...,
      ${asset('image')},
      video{
        "webm": video_webm.asset->url,
        "mov": video_hevc.asset->url,
      }
    },
  }`;

export const load: ServerLoad = async ({ params }) => {
  const data = await sanityClient.fetch(query(params));
  if (!data) throw error(404, 'Not found');

  return { page: data };
};
