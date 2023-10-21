import { asset } from '@/lib/sanity/sanity-image';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { error } from '@sveltejs/kit';
import groq from 'groq';

const query = groq`
    *[_id == "vrPage"][0]{
        ...,
        sections[]{
            ...,
            highlightedVr[]->{
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
      "vrs" : *[_type== "vr"]|order(orderRank){
        _id,
        name,
        gallery->{name},
        category->{
            name,
            slug
        },
        slug,
      },
      "tags": *[_type == "vrCategory"]|order(orderRank)
    }
`;

export const load = async () => {
  const data = await sanityClient.fetch(query);
  if (!data) throw error(404, { message: 'Not found' });
  return {
    page: data,
  };
};
