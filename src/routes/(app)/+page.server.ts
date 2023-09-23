import { asset } from '@/lib/sanity/sanity-image/query';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { error } from '@sveltejs/kit';
import groq from 'groq';

const query = groq`
    *[_id == "landingPage"][0]{
        ...,
        sections[]{
            ...,
            asset{
                ...,
                ${asset('image')},
                video{
                    "webm": video_webm.asset->url,
                    "mov": video_hevc.asset->url,
                }
            },
            collections[]->{
                _type == "vr" => {
                    "title":"Our virtual reality",
                    name,
                    slug,
                    ${asset('previewImage')},
                },
                _type == "exhibition" => {
                    "title":"Our exhibition",
                    name,
                    slug,
                    ${asset('previewDisplayImage')},
                    "exhibitionType": select(
                        count(artists) == 1 => artists[0]-> {
                            ...personalDocuments {
                                ...name{
                                    en
                                }
                            }
                        },
                        count(artists) > 1 => "Group Exhibition",
                    )
                }
            }
        }
    }
`;

export const load = async () => {
  const data = await sanityClient.fetch(query);
  if (!data) throw error(404, { message: 'Not found' });

  return {
    page: data,
  };
};
