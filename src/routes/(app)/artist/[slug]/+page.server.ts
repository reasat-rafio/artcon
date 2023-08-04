import groq from 'groq';
import { error, type ServerLoad } from '@sveltejs/kit';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { asset } from '@/lib/sanity/sanity-image';

const query = (params: Partial<Record<string, string>>) =>
  groq`*[_type == "artist" && slug.current == "${params.slug}"][0]{
    seo,
    siteDocuments {
      ...,
      sections[]{
        ...,
        ${asset('image')},
        ${asset('images[]', { as: 'images' })},
        ${asset('coverImage')},
        blocks{
          ...,
          asset {
              ...,
            ${asset('image')},
            video{
              "webm": video_webm.asset->url,
              "mov": video_hevc.asset->url,
            }
          },
        },
        vrExhibition {
          ...,
          ${asset('image')},
        },
        exhibitions[]-> {
          "exhibition": sections[]{
            _type == "exhibition.promotion" => {...}
          }
        }
      }
    }
  }`;

export const load: ServerLoad = async ({ params }) => {
  const data = await sanityClient.fetch(query(params));
  const { seo, siteDocuments } = data;

  if (!data) throw error(404, 'Not found');

  return {
    page: { seo, ...siteDocuments },
  };
};
