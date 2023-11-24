import { asset } from '@/lib/sanity/sanity-image';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { error } from '@sveltejs/kit';
import groq from 'groq';

const query = groq`
    *[_id == "documentaryPage"][0]{
        ...,
        sections[]{
            ...,
            highlightedDocumentaries[]->{
                name,
                slug,
                category->,
                ${asset('coverImage')}
            }
        },
        "documentaries" : *[_type== "documentary"]|order(orderRank){
            _id,
            slug,
            name,
            category->,
            ${asset('coverImage')}

        },
        "categories": *[_type == "documentaryCategory"]|order(orderRank)
    }
`;

export const load = async () => {
  const data = await sanityClient.fetch(query);
  if (!data) throw error(404, { message: 'Not found' });
  return {
    page: data,
  };
};
