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
                    _type,
                    name,
                    subtitle,
                    slug,
                    sliderImageVideo {
                        ...,
                        ${asset('image')},
                        video{
                            "webm": video_webm.asset->url,
                            "mov": video_hevc.asset->url,
                        }
                    },
                    "title":"Our virtual reality",
                },
                _type == "publication" => {
                    _type,
                    name,
                    subtitle,
                    slug,
                    sliderImageVideo {
                        ...,
                        ${asset('image')},
                        video{
                            "webm": video_webm.asset->url,
                            "mov": video_hevc.asset->url,
                        }
                    },
                    "title":"Our publication",
                },
                _type == "event" => {
                    _id,
                    _type,
                    "title": "Our event",
                    slug,
                    sliderImageVideo {
                        ...,
                        ${asset('image')},
                        video{
                            "webm": video_webm.asset->url,
                            "mov": video_hevc.asset->url,
                        }
                    },
                },
                _type == "collection" => {
                    _id,
                    _type,
                    "title": "Our collection",
                    name,
                    "subtitle" : *[_type == 'artist' && references(^._id)][0].personalDocuments.name.en,
                    slug,
                    sliderImageVideo {
                        ...,
                        ${asset('image')},
                        video{
                            "webm": video_webm.asset->url,
                            "mov": video_hevc.asset->url,
                        }
                    },
                },
                _type == "exhibition" => {
                    _type,
                    "title":"Our exhibition",
                    name,
                    slug,
                    sliderImageVideo {
                        ...,
                        ${asset('image')},
                        video{
                            "webm": video_webm.asset->url,
                            "mov": video_hevc.asset->url,
                        }
                    },
                    "exhibitionType": select(
                        count(artists) > 1 => "Group Exhibition",
                        count(artists) == 1 => artists[0]-> {
                            ...personalDocuments {
                                ...name{
                                    en
                                }
                            }
                        },
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
