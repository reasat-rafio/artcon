import { asset } from '@/lib/sanity/sanity-image';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { error } from '@sveltejs/kit';
import groq from 'groq';

const query = groq`
    *[_id == "artistPage"][0]{
        ...,
        sections[]{
            ...,
            highlightedArtists[]->{
                ...personalDocuments {
                    "name": name.en
                },
                slug,
                ...siteDocuments {
                    status,
                    type,
                    cta,
                    ${asset('coverImage')},
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
        },
        "artists" : *[_type== "artist"]|order(orderRank){
            _id,
            slug,
            tag->,
            ...personalDocuments {
                "name": name.en,
                ${asset('artistPortrait')},
            },
            artworks[0...4]->{
                name,
                ${asset('artworkImages[0]', { as: 'artworkImage' })},
            }
        },
        "tags": *[_type == "artistTag"]|order(orderRank)
    }
`;

export const load = async () => {
  const data = await sanityClient.fetch(query);
  if (!data) throw error(404, { message: 'Not found' });

  return {
    page: data,
  };
};
