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
                    "type": category->{name},
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
                    "type": category->{name},
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
                    name,
                    subtitle,
                    tag->{name},
                    "title": "Our event",
                    slug,
                    startDate,
                    endDate,
                    sliderImageVideo {
                        ...,
                        ${asset('image')},
                        video{
                            "webm": video_webm.asset->url,
                            "mov": video_hevc.asset->url,
                        }
                    },
                    "documentationImages": sections[_type == "event.documentation"][0].images[]{
                        ...,
                        asset-> {
                            ...,
                            metadata {
                                lqip,
                                dimensions
                            }
                        }
                    },
                },
                _type == "documentary" => {
                    _id,
                    _type,
                    name,
                    "subtitle" : category->name,
                    "title": "Our documentary",
                    type->,
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
                    subtitle,
                    "artistName" : artist->{...personalDocuments {...name {en}}},
                    tag->{name},
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
                    subtitle,
                    startDate,
                    endDate,
                    sliderImageVideo {
                        ...,
                        ${asset('image')},
                        video{
                            "webm": video_webm.asset->url,
                            "mov": video_hevc.asset->url,
                        }
                    },
                    "invitationCardImage": sections[_type == "exhibition.publication"][0].invitationCardImage{
                        ...,
                        asset-> {
                            ...,
                            metadata {
                                lqip,
                                dimensions
                            }
                        }
                    },
                    "artistName": select(
                        count(artists) == 1 => artists[0]-> {
                            ...personalDocuments {
                                ...name{
                                    en
                                }
                            }
                        },
                    ),
                    "exhibitionType": select(
                        count(artists) > 1 => "Group Exhibition",
                        count(artists) == 1 => "Solo Exhibition",
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
