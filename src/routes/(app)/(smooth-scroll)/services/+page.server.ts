import { FORM_ACCESS_KEY } from '$env/static/private';
import { asset } from '@/lib/sanity/sanity-image';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { inquirySchema } from '@/lib/validator';
import { error, type ServerLoad } from '@sveltejs/kit';
import groq from 'groq';
import { superValidate } from 'sveltekit-superforms/server';

const query = groq`*[_id =='servicePage'][0]{
    ...,
    sections[]{
        ...,
        ${asset('image')},
        asset{
            ...,
            ${asset('image')},
            video{
              "webm": video_webm.asset->url,
              "mov": video_hevc.asset->url,
            }
        },
    },
    "allServices": *[_type == "allServices"][0]{
      ...,
      summary{
        ...,
        description,
        media{
          ...,
          ${asset('image')},
          video{
            "webm": video_webm.asset->url,
            "mov": video_hevc.asset->url,
          }
        },
      },
      sections[]{
        ...,
        ${asset('image')},
        contentMedia{
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

export const load: ServerLoad = async (event) => {
  const data = await sanityClient.fetch(query);
  if (!data) throw error(404, { message: 'Not found' });
  const form = await superValidate(event, inquirySchema);

  return { page: data, form, apiKey: FORM_ACCESS_KEY };
};
