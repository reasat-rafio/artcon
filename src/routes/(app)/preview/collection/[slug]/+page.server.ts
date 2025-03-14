import { asset } from '@/lib/sanity/sanity-image';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { inquirySchema } from '@/lib/validator';
import { error, type Actions, type ServerLoad, fail } from '@sveltejs/kit';
import groq from 'groq';
import { superValidate } from 'sveltekit-superforms/server';
import { FORM_ACCESS_KEY } from '$env/static/private';
import type { CollectionPreviewProps } from '@/lib/types/collection-preview.types';

const query = (params: Partial<Record<string, string>>) =>
  groq`*[_type == "collection" && slug.current == "${params.slug}"][0]{
    _id,
    _type,
    name,
    subtitle,
    topTitle,
    slug,
    cta,
    seo,
    hideInquiryButton,
    isAvailable,
    provenance,
    information,
    ${asset('artworkImages[]', { as: 'artworkImages' })},
    artist-> {
      ...personalDocuments {
        "name": name.en,
        born,
        country
      }
    }
  }`;

export const load: ServerLoad = async (event) => {
  const data = (await sanityClient.fetch(
    query(event.params),
  )) as CollectionPreviewProps;
  if (!data) throw error(404, 'Not found');
  const form = await superValidate(event, inquirySchema);

  return { page: data, form };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, inquirySchema);
    if (!form.valid) return fail(400, { form });

    const data = form.data;
    data.access_key = FORM_ACCESS_KEY;
    data.from_name = 'Artcon Website Inquiry Form Submission';
    data.page_url = event.url.href;
    data.subject =
      'Inquiry Regarding Collection Availability and Process From Artcon Website';

    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    return { form };
  },
};
