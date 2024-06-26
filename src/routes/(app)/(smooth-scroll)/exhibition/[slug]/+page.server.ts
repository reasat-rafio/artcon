import { sanityClient } from '@/lib/sanity/sanityClient.js';
import { error, type ServerLoad } from '@sveltejs/kit';
import groq from 'groq';
import { asset } from '@/lib/sanity/sanity-image/query.js';

const query = (params: Partial<Record<string, string>>) =>
  groq`*[_type== "exhibition" && slug.current == "${params.slug}"] [0]{
    _id,
    name,
    topTitle,
    subtitle,
    cta,
    slug,
    seo,
    associationsList,
    description,
    endDate,
    startDate,
    tag->,
    gallery->,
    publication->{
      name,
      subtitle,
      slug,
      category->{name},
      publishedBy,
      isbn,
      quote,
      description,
      exproleLink,
      ${asset('publicationImage')},
    },
    asset {
      ...,
      ${asset('image')},
      video{
          "webm": video_webm.asset->url,
          "mov": video_hevc.asset->url,
      }
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
    sections[]{
      ...,
      ${asset('image')},
      ${asset('invitationCardImage')},
      ${asset('fullInvitationCardImage')},
      ${asset('images[]', { as: 'images' })},
      ${asset('artworks[]', { as: 'artworks' })},
      vr->{
        url,
        caption,
         ${asset('thumbnail')},
      },
      newsAndMedia[]{
        ...,
        ${asset('image')},
      }
    },
    count(artists) == 1 => {
      artists[0]->{
        personalDocuments {
          "name": name.en,
          shortBio,
          born,
          socials
        },
        ...siteDocuments {
        "data": sections[_type == "artist.summary"][0]{
            ...,
            ${asset('images[]', { as: 'images' })},
            vr->{
              ...,
              ${asset('thumbnail')},
            },
          }
        }
      },
    },
    count(artists) > 1 => {
      artists[]->{
        tag->,
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
     name,
     slug,
     tag->{name},
     startDate,
     subtitle,
     endDate,
     asset {
      ...,
      ${asset('image')},
        video{
          "webm": video_webm.asset->url,
          "mov": video_hevc.asset->url,
        }
    },
    "type": select(
      count(artists) == 1 => {
        ...artists[0]->{
          ...personalDocuments {
            "name": name.en,
          }
        }
      },
      count(artists) > 1 => "Group Exhibition",
     ),
    },
  }`;

export const load: ServerLoad = async ({ params }) => {
  const data = await sanityClient.fetch(query(params));
  if (!data) throw error(404, 'Not found');

  return { page: data };
};
