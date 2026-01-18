
import { asset } from '@/lib/sanity/sanity-image';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { error } from '@sveltejs/kit';
import groq from 'groq';

const query = groq`
    *[_id == "eventPage"][0]{
        ...,
        sections[]{
            ...,
            highlightedEvents[]->{
                name,
                slug,
                topTitle,
                subtitle,
                cta,
                tag->,
                endDate,
                startDate,
                asset {
                    ...,
                    ${asset('image')},
                    video{
                        "webm": video_webm.asset->url,
                        "mov": video_hevc.asset->url,
                    }
                },
            }
        },
        "events" : *[_type== "event"]|order(orderRank){
            _id,
            slug,
            name,
            subtitle,
            startDate,
            endDate,
            tag->{
                name,
                slug
            },
            asset {
                ...,
                ${asset('image')},
                video{
                    "webm": video_webm.asset->url,
                    "mov": video_hevc.asset->url,
                }
            },
        },
        "tags": *[_type == "eventTag"]|order(orderRank)
    }
`;

export const load = async () => {
  const data = await sanityClient.fetch(query);
  if (!data) throw error(404, { message: 'Not found' });
  return {
    page: data,
  };
};

