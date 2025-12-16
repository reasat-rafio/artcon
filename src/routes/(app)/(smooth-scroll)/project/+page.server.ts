import { asset } from '@/lib/sanity/sanity-image';
import { sanityClient } from '@/lib/sanity/sanityClient';
import { error } from '@sveltejs/kit';
import groq from 'groq';

const query = groq`
    *[_id == "projectPage"][0]{
        ...,
        sections[]{
        ...,
        highlightedProjects[]->{
          name,
          slug,
          endDate,
          startDate,
          tag->,
          topTitle,
          subtitle,
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
      "projects" : *[_type== "project"]|order(orderRank){
        _id,
        name,
        slug,
        subtitle,
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
      "tags": *[_type == "projectTag"]|order(orderRank)
    }
`;

export const load = async () => {
  const data = await sanityClient.fetch(query);
  if (!data) throw error(404, { message: 'Not found' });
  return {
    page: data,
  };
};
