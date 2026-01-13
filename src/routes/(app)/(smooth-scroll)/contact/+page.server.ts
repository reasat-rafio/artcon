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

  return { page: data, form, apiKey: FORM_ACCESS_KEY };
};

export const actions: Actions = {
  default: async (event) => {
    try {
      const form = await superValidate(event, contactSchema);

      if (!form.valid) {
        console.log('Form validation failed:', form.errors);
        return fail(400, { form });
      }

      const submissionData = {
        ...form.data,
        access_key: FORM_ACCESS_KEY,
        from_name: 'Artcon Website Contact Form Submission',
      };

      console.log('FORM_ACCESS_KEY loaded:', FORM_ACCESS_KEY ? 'Yes' : 'No');
      console.log('Submitting to Web3Forms:', submissionData);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      console.log('Web3Forms response status:', response.status);
      
      let responseData;
      const contentType = response.headers.get('content-type');
      
      if (contentType?.includes('application/json')) {
        responseData = await response.json();
      } else {
        const text = await response.text();
        console.log('Web3Forms returned non-JSON response:', text.substring(0, 200));
        responseData = { error: 'Invalid response from server' };
      }
      
      console.log('Web3Forms response:', responseData);

      if (!response.ok) {
        return fail(response.status, { form, error: 'Failed to submit form. Please try again.' });
      }

      return { form };
    } catch (error) {
      console.error('Form submission error:', error);
      return fail(500, { form: undefined, error: error instanceof Error ? error.message : 'Network error. Please try again.' });
    }
  },
};
