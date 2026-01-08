import { asset } from '@/lib/sanity/sanity-image';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { error } from '@sveltejs/kit';
import groq from 'groq';

const query = groq`
    *[_id == "collectionPage"][0]{
        ...,
        sections[]{
          ...,
          highlightedCollections[]->{
            name,            slug,            topTitle,
            subtitle,
            cta,
            artist->{
              ...personalDocuments { "name": name.en}
            },
            asset {
              ...,
              ${asset('image')},
              video{
                  "webm": video_webm.asset->url,
                  "mov": video_hevc.asset->url,
              }
            },
          },
        },
      "collections" : *[_type== "collection"]|order(orderRank){
        _id,
        _createdAt,
        slug,
        name,
        subtitle,
        category->,
        tag->,
        displayNew,
        displaySold,
        isAvailable,
        ${asset('thumbnail')},
        "media": information.media,
        "year": information.artDate.year,
        artist->{
          slug,
          ...personalDocuments { "name": name.en}
        },
      },
      "tags": *[_type == "collectionTag"]|order(orderRank)
    }
`;

export const load = async () => {
  const data = await sanityClient.fetch(query);
  if (!data) throw error(404, { message: 'Not found' });
  return {
    page: data,
  };
};
