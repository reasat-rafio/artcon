import { FORM_ACCESS_KEY } from '$env/static/private';
import { asset } from '@/lib/sanity/sanity-image';
import { sanityClient } from '@/lib/sanity/sanityClient';
import type { ContactPageProps } from '@/lib/types/contact.types.js';
import { contactSchema } from '@/lib/validator.js';
import { error, type Actions, fail } from '@sveltejs/kit';
import groq from 'groq';
import { superValidate } from 'sveltekit-superforms/server';

const query = groq`
    *[_id == "contactPage"][0]{
        ...,
        sections[]{
            ...,
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
`;

export const load = async (event) => {
  const data = (await sanityClient.fetch(query)) as ContactPageProps;
  if (!data) throw error(404, { message: 'Not found' });
  const form = await superValidate(event, contactSchema);

  return { page: data, form };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, contactSchema);

    if (!form.valid) return fail(400, { form });

    const data = form.data;
    data.access_key = FORM_ACCESS_KEY;
    data.from_name = 'Artcon Website Contact Form Submission';

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    let formMessage = null;
    if (result?.success) {
      formMessage = result.message;
    }

    return { form, formMessage };
  },
};
