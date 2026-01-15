import { FORM_ACCESS_KEY } from '$env/static/private';
import { asset } from '@/lib/sanity/sanity-image';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { inquirySchema } from '@/lib/validator';
import { error, type Actions, type ServerLoad, fail } from '@sveltejs/kit';
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

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, inquirySchema);
    console.log('Form validation result:', form.valid);

    if (form.valid) {
      console.log('Valid Form Data Received:');
      console.log('   Name:', form.data.name);
      console.log('   Email:', form.data.email);
      console.log('   Phone:', form.data.phone);
      console.log('   Message:', form.data.message);
      console.log('   Context:', form.data.context);
    } else {
      console.log('Form validation errors:', form.errors);
    }

    if (!form.valid) {
      console.log('Form validation failed, returning fail');
      return fail(400, { form });
    }

    const submissionData = {
      ...form.data,
      access_key: FORM_ACCESS_KEY,
      from_name: 'Artcon Website Service Form Submission',
    };

    try {
      console.log('Submitting to Web3Forms with data:', submissionData);
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

      console.log('Web3Forms response status:', response.status);

      if (!response.ok) {
        console.log('Web3Forms returned error');
        return fail(response.status, { form, error: 'Failed to submit form. Please try again.' });
      }
      
      console.log('Form submitted successfully to Web3Forms');
    } catch (error) {
      console.error('Form submission error:', error);
      return fail(500, { form, error: 'Network error. Please try again.' });
    }

    console.log('Returning success response');
    return { form, success: true };
  },
};
