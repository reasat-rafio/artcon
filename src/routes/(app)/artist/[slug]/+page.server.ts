/* eslint-disable @typescript-eslint/no-explicit-any */
import groq from 'groq';
import { error, type ServerLoad } from '@sveltejs/kit';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { asset } from '@/lib/sanity/sanity-image';

const query = (params: Partial<Record<string, string>>) =>
  groq`*[_type == "artist" && slug.current == "${params.slug}"][0]{
    seo,
    siteDocuments {
      ...,
      sections[]{
        ...,
        ${asset('image')},
        ${asset('images[]', { as: 'images' })},
        ${asset('coverImage')},
        blocks[]{
          ...,
          asset {
              ...,
            ${asset('image')},
            video{
              "webm": video_webm.asset->url,
              "mov": video_hevc.asset->url,
            }
          },
        },
        vrExhibition {
          ...,
          ${asset('image')},
        },
        exhibitions[]-> {
          "exhibition": sections[]{
            _type == "exhibition.promotion" => {
              ...,
               ${asset('images[1]', { as: 'image' })},
            }
          }
        }
      }
    }
  }`;

export const load: ServerLoad = async ({ params }) => {
  const data = await sanityClient.fetch(query(params));
  if (!data) throw error(404, 'Not found');

  const { seo, siteDocuments } = data;
  const siteDocumentsCopy = JSON.parse(JSON.stringify(siteDocuments));

  const modifiedSections = siteDocumentsCopy.sections.map((section: any) => {
    if (section._type !== 'artist.exhibitions') return section;

    // removeing empty objects from the exhibition array
    const modifiledExhibtions = section.exhibitions.map(({ exhibition }: any) =>
      exhibition.filter((e: any) => Object.keys(e).length !== 0)
    );

    section.exhibitions = modifiledExhibtions;
    return section;
  });

  siteDocumentsCopy.sections = modifiedSections;

  return {
    page: { seo, ...siteDocumentsCopy },
  };
};
