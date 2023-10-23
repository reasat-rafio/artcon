import { asset } from '@/lib/sanity/sanity-image/query';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { error } from '@sveltejs/kit';
import groq from 'groq';

const query = groq`
    *[_id == "exhibitionPage"][0]{
        ...,
        sections[]{
        ...,
        ${asset('image')},
        highlightedExhibition[]->{
          name,
          slug,
          endDate,
          startDate,
          tag->{
            name,
            slug
          },
          count(artists) > 1 => {
            "subtitle": "Group Exhibition"
          },
          count(artists) == 1 => {
            "subtitle": artists[0]->{
              ...personalDocuments {
                "name": name.en
              }
            }
          },
          type,
          status,
          asset{
            ...,
            ${asset('image')},
            video{
                "webm": video_webm.asset->url,
                "mov": video_hevc.asset->url,
            }
          },
        },
      },
      "exhibitions" : *[_type== "exhibition"]|order(orderRank){
        _id,
        name,
        slug,
        tag->{
          name,
          slug
        },
        ${asset('previewDisplayImage')},
        "type": select(
          count(artists) == 1 => {
            ...artists[0]->{
              ...personalDocuments {
                "name": name.en,
              }
            }
          },
          count(artists) > 1 => "Group Exhibition",
        )
      },
      "tags": *[_type == "exhibitionTag"]|order(orderRank)
    }
`;

export const load = async () => {
  const data = await sanityClient.fetch(query);
  if (!data) throw error(404, { message: 'Not found' });
  return {
    page: data,
  };
};
