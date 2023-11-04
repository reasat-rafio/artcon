import { asset } from '@/lib/sanity/sanity-image';
import { sanityClient } from '@/lib/server/sanity/serverSanityClient';
import { error, type ServerLoad } from '@sveltejs/kit';
import groq from 'groq';

const query = (params: Partial<Record<string, string>>) =>
  groq`*[_type == "exhibition" && slug.current == "${params.slug}"][0]{
    _id,
    _type,
    name,
    type,
    status,
    startDate,
    endDate,
    slug,
    cta,
    seo,
    gallery->{name},
    description,
    sliderImageVideo {
      ...,
      ${asset('image')},
      video{
        "webm": video_webm.asset->url,
        "mov": video_hevc.asset->url,
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
    "exhibitionType": select(
      count(artists) > 1 => "Group Exhibition",
      count(artists) == 1 => artists[0]-> {
        ...personalDocuments {
          ...name{
            en
          }
        }
      },
    ),
  }`;

export const load: ServerLoad = async ({ params }) => {
  const data = await sanityClient.fetch(query(params));
  if (!data) throw error(404, 'Not found');

  return { page: data };
};
