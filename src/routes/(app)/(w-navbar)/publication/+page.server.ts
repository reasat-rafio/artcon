import { asset } from '@/lib/sanity/sanity-image';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { error } from '@sveltejs/kit';
import groq from 'groq';

const query = groq`
    *[_id == "publicationPage"][0]{
        ...,
        sections[]{
            ...,
            highlightedPublication[]->{
                name,
                subtitle,
                slug,
                category->{
                    name,
                    slug
                },
                ${asset('previewImage')},
            },
        },
      "publications" : *[_type== "publication"]|order(orderRank){
        _id,
        name,
        slug,
        prices,
        ${asset('publicationImage')},
        category->{
            name,
            slug
        },
      },
      "categories": *[_type == "publicationCategory"]|order(orderRank)
    }
`;

export const load = async () => {
  const data = await sanityClient.fetch(query);
  if (!data) throw error(404, { message: 'Not found' });
  return {
    page: data,
  };
};
