import { sanityClient } from '@/lib/sanity/sanityClient.js';
import { error, type ServerLoad } from '@sveltejs/kit';
import groq from 'groq';
import { asset } from '@/lib/sanity/sanity-image/query.js';

const query = (params: Partial<Record<string, string>>) =>
  groq`*[_type== "exhibition" && slug.current == "${params.slug}"] [0]{
    ...,
    tags[]->,
    count(artists) == 1 => {
      artists[]->{
        ...siteDocuments {
        "data": sections[_type == "artist.summary"][0]{
            ...,
            descriptionBlock{
              ...,
              socials[]{
                  ...,
                  ${asset('icon')},
              }
            },
            ${asset('images[]', { as: 'images' })},
            vrExhibition-> {
              ...,
              ${asset('image')},
            },
          }
        }
      },
    },
    count(artists) > 1 => {
      artists[]->{
        slug,
        ...personalDocuments {
          "name": name.en,
          ${asset('artistPortrait')},
        }
      },
    },
    "otherExhibitions": *[_type== "exhibition" && slug.current != "${
      params.slug
    }"][]{
     slug,
     startDate,
     endDate,
     "data": sections[_type == "common.hero"][0]{
        ...,
        asset {
          ...,
          ${asset('image')},
          video{
            "webm": video_webm.asset->url,
            "mov": video_hevc.asset->url,
          }
        },
      }
    },
    sections[]{
        ...,
        ${asset('image')},
        ${asset('coverImage')},
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
        vrExhibition-> {
            ...,
            ${asset('image')},
        },
        ebook-> {
          ...,
          ${asset('image')},
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
