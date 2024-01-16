import { FORM_ACCESS_KEY } from '$env/static/private';
import { asset } from '@/lib/sanity/sanity-image';
import { sanityClient } from '@/lib/sanity/sanityClient';
import type { CollectionDetailPageProps } from '@/lib/types/collection-detail.types';
import { inquirySchema } from '@/lib/validator';
import { error, type Actions, type ServerLoad, fail } from '@sveltejs/kit';
import groq from 'groq';
import { superValidate } from 'sveltekit-superforms/server';

const query = (params: Partial<Record<string, string>>) =>
  groq`*[_type == "collection" && slug.current == "${params.slug}"][0]{
    _id,
    seo,
    name,
    slug,
    ${asset('artworkImages[]', { as: 'artworkImages' })},
    topTitle,
    subtitle,
    cta,
    inquiryButton,
    provenance,
    information,
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
      vr->{
        caption,
        url,
        ${asset('thumbnail')},
      },
      documents[]{
        ...,
        ${asset('image')},
      }
    },
    artist->{
      ...personalDocuments {
        "name": name.en,
        shortBio,
        country,
        born,
        socials
      },
      ...siteDocuments {
        "images": sections[_type == "artist.summary"][0]{
          ${asset('images[]', { as: 'images' })},
        }
      }
    },
    "otherCollections":*[_type== "collection" && slug.current != "${
      params.slug
    }"][]{
      _id,
      name,
      slug,
      "media": information.media,
      "year": information.artDate.year,
      artist-> {
        ...personalDocuments {
          "name": name.en
        }
      },
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

export const load: ServerLoad = async (event) => {
  const data = (await sanityClient.fetch(
    query(event.params),
  )) as CollectionDetailPageProps;
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
