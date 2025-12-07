import groq from 'groq';
import { error, type ServerLoad } from '@sveltejs/kit';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { asset } from '@/lib/sanity/sanity-image';

const query = (params: Partial<Record<string, string>>) =>
  groq`*[_type == "artist" && slug.current == "${params.slug}"][0]{
    seo,
    slug,
    "publicationsFromExhibitions": *[_type == "exhibition" && references("artists", ^._id)]{
      ...publication->{
        _createdAt,
        name,
        isbn,
        subtitle,
        description,
        exproleLink,
        associationsList,
        publishedBy,
        quote,
        slug,
        ${asset('publicationImage')}
      }
    },
    publications[]->{
      _createdAt,
      name,
      isbn,
      subtitle,
      description,
      exproleLink,
      associationsList,
      publishedBy,
      quote,
      slug,
      ${asset('publicationImage')}
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
      topTitle,
      subtitle,
      cta,
      asset {
        ...,
        ${asset('image')},
        video{
          "webm": video_webm.asset->url,
          "mov": video_hevc.asset->url,
        }
      },
      sections[]{
        ...,
        ${asset('image')},
        ${asset('images[]', { as: 'images' })},
        ${asset('coverImage')},
        artworks[]{
          _key,
          _type,
          ${asset('image')},
          description
        },
        artworkLink{
          title,
          href
        },
        vr->{
          ...,
          ${asset('thumbnail')},
        },
        blocks[]{
          ...,
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
    customArtworks[]{
      _key,
      _type,
      ${asset('image')},
      description
    },
    "exhibitions" : *[_type== "exhibition" && references("artists", ^._id)][]{
      name,
      slug,
      tag->{name},
      startDate,
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
    "otherArtists": *[_type == "artist" && slug.current != "${params.slug}"]{
      slug,
      tag->{name},
      ...personalDocuments {
        "name": name.en,
        ${asset('artistPortrait')},
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
