import { FORM_ACCESS_KEY } from '$env/static/private';
import { asset } from '@/lib/sanity/sanity-image';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { inquirySchema } from '@/lib/validator';
import { error, type Actions, type ServerLoad, fail } from '@sveltejs/kit';
import groq from 'groq';
import { superValidate } from 'sveltekit-superforms/server';

const query = (params: Partial<Record<string, string>>) =>
  groq`*[_type == "collection" && slug.current == "${params.slug}"][0]{
    ...,
    category->,
    artist->{
      ...personalDocuments {
        "name": name.en,
      }
    },
    sliderImageVideo {
      ...,
      ${asset('image')},
      video{
        "webm": video_webm.asset->url,
        "mov": video_hevc.asset->url,
      }
    },
    ${asset('artworkImages[]', { as: 'artworkImages' })},
    quote,
  }`;

export const load: ServerLoad = async (event) => {
  const data = await sanityClient.fetch(query(event.params));
  if (!data) throw error(404, 'Not found');
  const form = await superValidate(event, inquirySchema);

  return { page: data, form, apiKey: FORM_ACCESS_KEY };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, inquirySchema);

    if (!form.valid) return fail(400, { form });

    const submissionData = {
      ...form.data,
      access_key: FORM_ACCESS_KEY,
      from_name: 'Artcon Website Collection Inquiry Form Submission',
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Origin: event.url.origin,
          Referer: event.url.href,
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        return fail(response.status, { form, error: 'Failed to submit form. Please try again.' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      return fail(500, { form, error: 'Network error. Please try again.' });
    }

    return { form };
  },
};
