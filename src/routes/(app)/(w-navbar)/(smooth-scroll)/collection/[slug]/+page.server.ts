import { asset } from '@/lib/sanity/sanity-image';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { error, type ServerLoad } from '@sveltejs/kit';
import groq from 'groq';

const query = (params: Partial<Record<string, string>>) =>
  groq`*[_type == "collection" && slug.current == "${params.slug}"][0]{
    _id,
    seo,
    name,
    slug,
    ${asset('artworkImages[]', { as: 'artworkImages' })},
    topTitle,
    subtitle,
    cta,
    inquiryButton,
    provenance,
    information,
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
      vr->{
        caption,
        url,
        ${asset('thumbnail')},
      },
      documents[]{
        ...,
        ${asset('image')},
      }
    },
    artist->{
      ...personalDocuments {
        "name": name.en,
        shortBio,
        country,
        born,
        socials
      },
      ...siteDocuments {
        "images": sections[_type == "artist.summary"][0]{
          ${asset('images[]', { as: 'images' })},
        }
      }
    },
    "otherCollections":*[_type== "collection" && slug.current != "${
      params.slug
    }"][]{
      _id,
      name,
      slug,
      "media": information.media,
      "year": information.artDate.year,
      artist-> {
        ...personalDocuments {
          "name": name.en
        }
      },
      asset {
        ...,
        ${asset('image')},
          video{
            "webm": video_webm.asset->url,
            "mov": video_hevc.asset->url,
        }
      },
    }
  }`;

export const load: ServerLoad = async ({ params }) => {
  const data = await sanityClient.fetch(query(params));
  if (!data) throw error(404, 'Not found');

  return {
    page: data,
  };
};