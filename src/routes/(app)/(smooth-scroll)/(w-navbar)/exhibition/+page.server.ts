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
          subtitle,
          tag->{
            name,
            slug
          },
          count(artists) > 1 => {
            "type": "Group Exhibition"
          },
          count(artists) == 1 => {
            "type": artists[0]->{
              ...personalDocuments {
                "name": name.en
              }
            }
          },

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
        subtitle,
        tag->{
          name,
          slug
        },
        asset{
          ...,
          ${asset('image')},
          video{
              "webm": video_webm.asset->url,
              "mov": video_hevc.asset->url,
          }
        },
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
