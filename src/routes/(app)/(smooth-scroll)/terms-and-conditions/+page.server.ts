import { FORM_ACCESS_KEY } from '$env/static/private';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { inquirySchema } from '@/lib/validator.js';
import { error, type Actions, fail } from '@sveltejs/kit';
import groq from 'groq';
import { superValidate } from 'sveltekit-superforms/server';

const query = groq`*[_id == "termsConditionsPage"][0]`;

export const load = async (event) => {
  const data = await sanityClient.fetch(query);
  if (!data) throw error(404, { message: 'Not found' });
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
      from_name: 'Artcon Website Terms and Conditions Form Submission',
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
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate',
          'Origin': event.url.origin,
          'Referer': event.url.href,
        },
        body: JSON.stringify(data),
      });

      const responseText = await response.text();
      console.log('Web3Forms Response:', response.status, responseText);

      if (!response.ok) {
        let errorMessage = 'Failed to submit form. Please try again.';
        
        try {
          const errorData = JSON.parse(responseText);
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch (e) {
          if (response.status === 403) {
            errorMessage = 'Access denied. Please try again later.';
          } else if (response.status === 429) {
            errorMessage = 'Too many requests. Please wait and try again.';
          } else if (response.status === 400) {
            errorMessage = 'Invalid form data. Please check your inputs.';
          } else if (response.status >= 500) {
            errorMessage = 'Service error. Please try again later.';
          }
        }
        
        console.error('Web3Forms API Error - Status:', response.status, response.statusText);
        console.error('Web3Forms API Error - Body:', responseText);
        return fail(response.status, { form, error: errorMessage });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      return fail(500, { form, error: 'Network error. Please check your connection and try again.' });
    }

    return { form };
  },
};
