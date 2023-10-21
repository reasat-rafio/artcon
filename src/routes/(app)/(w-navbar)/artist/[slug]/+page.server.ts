/* eslint-disable @typescript-eslint/no-explicit-any */
import groq from 'groq';
import { error, type ServerLoad } from '@sveltejs/kit';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { asset } from '@/lib/sanity/sanity-image';

const query = (params: Partial<Record<string, string>>) =>
  groq`*[_type == "artist" && slug.current == "${params.slug}"][0]{
    seo,
    "exhibitions" : *[_type== "exhibition" && references("artists", ^._id)][]{
        ...
    },
    personalDocuments {
      "name": name.en,
      shortBio,
      born,
      socials[]{
        ...,
        ${asset('icon')},
      }
    },
    siteDocuments {
      ...,
      sections[]{
        ...,
        ${asset('image')},
        ${asset('images[]', { as: 'images' })},
        ${asset('coverImage')},
        blocks[]{
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
        vr-> {
          ...,
          ${asset('image')},
        },
      },
    },
    artworks[]->{
      information,
      "artwork": artworkImages[0] {
        ...,
        asset->{
          ...,
          metadata {
            lqip,
            dimensions
          }
        }
      }
    },
  }`;

export const load: ServerLoad = async ({ params }) => {
  const data = await sanityClient.fetch(query(params));
  if (!data) throw error(404, 'Not found');

  return {
    page: data,
  };
};
