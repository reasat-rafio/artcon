import { asset } from '@/lib/sanity/sanity-image';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { error, type ServerLoad } from '@sveltejs/kit';
import groq from 'groq';

const query = (params: Partial<Record<string, string>>) =>
  groq`*[_type== "project" && slug.current == "${params.slug}"][0]{
    _id,
    name,
    type,
    status,
    cta,
    seo,
    endDate,
    startDate,
    associationsList,
    description,
    gallery->{name},
    tag->,
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
      vr-> {
        ...,
        ${asset('image')},
      },
    },
    "otherProjects": *[_type == 'project' && slug.current != "${
      params.slug
    }"][]{
      slug,
      "info": sections[ _type == "common.hero"][0]{
        type,
        title,
        asset {
        ...,
        ${asset('image')},
          video{
            "webm": video_webm.asset->url,
            "mov": video_hevc.asset->url,
          }
        },
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
