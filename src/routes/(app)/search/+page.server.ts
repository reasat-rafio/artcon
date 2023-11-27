import { asset } from '@/lib/sanity/sanity-image';
import { sanityClient } from '@/lib/server/sanity/serverSanityClient';
import { error } from '@sveltejs/kit';
import groq from 'groq';

const query = groq`
    *[_id == "searchPage"][0]{
      ...,
      "exhibitions" : *[_type== "exhibition"]|order(orderRank)[0...5]{
        _id,
        name,
        slug,
        tag->,
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
        "events" : *[_type== "event"]|order(orderRank)[0...5]{
            _id,
            slug,
            name,
            tag->,
            asset {
                ...,
                ${asset('image')},
                video{
                    "webm": video_webm.asset->url,
                    "mov": video_hevc.asset->url,
                }
            },
        },
        "collections" : *[_type== "collection"]|order(orderRank)[0...5]{
            _id,
            slug,
            name,
            tag->,
            ${asset('artworkImages[0]', { as: 'artworkImage' })},
            "media": information.media,
            "year": information.artDate.year,
            "artist": *[_type == 'artist' && references(^._id)][0]{
            ...personalDocuments {
                "name": name.en
                }
            },
        },
        "vrs" : *[_type== "vr"]|order(orderRank)[0...5]{
            _id,
            name,
            slug,
            gallery->{name},
            caption,
            url,
            category->
        },
        "publications" : *[_type== "publication"]|order(orderRank)[0...5]{
            _id,
            name,
            slug,
            prices,
            ${asset('publicationImage')},
            category->,
        },
        "documentaries" : *[_type== "documentary"]|order(orderRank)[0...5]{
            _id,
            slug,
            name,
            category->,
            ${asset('coverImage')}

        },
        "projects" : *[_type== "project"]|order(orderRank)[0...5]{
            _id,
            name,
            slug,
            tag->,
            asset{
                ...,
                ${asset('image')},
                video{
                    "webm": video_webm.asset->url,
                    "mov": video_hevc.asset->url,
                }
            },
        },
    }
`;

export const load = async () => {
  const data = await sanityClient.fetch(query);
  if (!data) throw error(404, { message: 'Not found' });

  return {
    page: data,
  };
};
