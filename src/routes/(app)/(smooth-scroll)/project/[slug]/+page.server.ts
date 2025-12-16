import { asset } from '@/lib/sanity/sanity-image';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { error, type ServerLoad } from '@sveltejs/kit';
import groq from 'groq';

const query = (params: Partial<Record<string, string>>) =>
  groq`*[_type== "project" && slug.current == "${params.slug}"][0]{
    _id,
    name,
    topTitle,
    subtitle,
    cta,
    seo,
    endDate,
    startDate,
    associationsList[]{
      key,
      value,
      url,
      buttonText
    },
    associationsButton,
    description,
    gallery->{
      name,
      location,
      url
    },
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
      vr->{
        ...,
        ${asset('thumbnail')},
      },
    },
    "otherProjects": *[_type == 'project' && slug.current != "${
      params.slug
    }"][]{
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
    }
  }`;

export const load: ServerLoad = async ({ params }) => {
  const data = await sanityClient.fetch(query(params));
  if (!data) throw error(404, 'Not found');

  return {
    page: data,
  };
};
