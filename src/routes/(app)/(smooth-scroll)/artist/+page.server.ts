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
                    topTitle,
                    subtitle,
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
            "customArtworks": siteDocuments.sections[_type == "common.artwork"][0].artworks[0...4]{
                _key,
                _type,
                title,
                ${asset('image')},
                description
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
