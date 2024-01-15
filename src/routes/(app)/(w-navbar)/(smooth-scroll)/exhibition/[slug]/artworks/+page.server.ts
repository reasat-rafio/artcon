import { asset } from '@/lib/sanity/sanity-image';
import { sanityClient } from '@/lib/server/sanity/serverSanityClient';
import { error, type ServerLoad } from '@sveltejs/kit';
import groq from 'groq';

const query = (params: Partial<Record<string, string>>) =>
  groq`*[_type== "exhibition" && slug.current == "${params.slug}"] [0]{
    name,
    topTitle,
    subtitle,
    cta,
    seo,
    endDate,
    startDate,
    tag->,
    count(artists) == 1 => {
      artists[0]->{
        personalDocuments { "name": name.en },
      },
    },
    count(artists) > 1 => {
      artists[]->{
        ...personalDocuments {"name": name.en }
      },
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
  }`;

export const load: ServerLoad = async ({ params }) => {
  const data = await sanityClient.fetch(query(params));
  if (!data) throw error(404, 'Not found');

  return { page: data };
};
