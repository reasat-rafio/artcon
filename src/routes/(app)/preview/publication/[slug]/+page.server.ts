import { FORM_ACCESS_KEY } from '$env/static/private';
import { asset } from '@/lib/sanity/sanity-image';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { inquirySchema } from '@/lib/validator';
import { error, type ServerLoad } from '@sveltejs/kit';
import groq from 'groq';
import { superValidate } from 'sveltekit-superforms/server';

const query = (params: Partial<Record<string, string>>) =>
  groq`*[_type == "publication" && slug.current == "${params.slug}"][0]{
    ...,
    gallery->,
    category->,
    sliderImageVideo {
      ...,
      ${asset('image')},
      video{
        "webm": video_webm.asset->url,
        "mov": video_hevc.asset->url,
      }
    },
    ${asset('publicationImage')},
    quote,
  }`;

export const load: ServerLoad = async (event) => {
  const data = await sanityClient.fetch(query(event.params));
  if (!data) throw error(404, 'Not found');
  const form = await superValidate(event, inquirySchema);

  return { page: data, form, apiKey: FORM_ACCESS_KEY };
};

