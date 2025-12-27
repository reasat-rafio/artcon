import { asset } from '@/lib/sanity/sanity-image';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { error, type ServerLoad } from '@sveltejs/kit';
import groq from 'groq';

const query = (params: Partial<Record<string, string>>) =>
  groq`*[_type == "event" && slug.current == "${params.slug}"][0]{
    _id,
    seo,
    name,
    slug,
    topTitle,
    subtitle,
    cta,
    associationsList[]{
      key,
      value,
      url,
      ${asset('logo')}
    },
    associationsButton,
    socials[]{
      _key,
      _type,
      type,
      link
    },
    description,
    endDate,
    startDate,
    tag->,
    gallery->{
      name,
      location,
      url
    },
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
        vrOrYtVideoSlider[]{
          _type == "vr" => {...}->,
          _type == "youtube" => {..., ${asset('thumbnail')}},
        },
        newsAndMedia[]{
            ...,
            ${asset('image')},
        }
    },
    "otherEvents" : *[_type== "event" && slug.current != "${params.slug}"][]{
        name,
        slug,
        tag->{name},
        startDate,
        endDate,
        subtitle,
        asset {
            ...,
            ${asset('image')},
                video{
                "webm": video_webm.asset->url,
                "mov": video_hevc.asset->url,
            }
        },
        "documentationImages": sections[_type == "event.documentation"][0].images[]{
            ...,
            asset-> {
                ...,
                metadata {
                    lqip,
                    dimensions
                }
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
