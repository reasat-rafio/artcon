import groq from 'groq';
import { asset } from './sanity-image';

export const siteQuery = groq`{
    "logos": *[_type == "site.logos"][0] {
      ...,
      ${asset('logo')},
      ${asset('mobileLogo')},
    },
    "nav": *[_type == "site.nav"][0] {
      ...,
    },
    "contact": *[_type == "site.contact"][0] {
      ...,
      socialsWithVisibleLinks[]{
        ...,
        ${asset('icon')},
      },
      socials[]{
        ...,
        ${asset('icon')},
      }
    }
  }`;

export const pageQuery = (query: string) => groq`{
    "site": ${siteQuery},
    "page": ${query}
  }`;
