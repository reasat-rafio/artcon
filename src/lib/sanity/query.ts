import groq from 'groq';
import { asset } from './sanity-image';

export const siteQuery = groq`{
    "nav": *[_type == "site.nav"][0],
    "footer": *[_type == "site.footer"][0],
    "logos": *[_type == "site.logos"][0] {
      ...,
      ${asset('logoDark')},
      ${asset('logoLight')},
      ${asset('mobileLogo')},
    },
    "contact": *[_type == "site.contact"][0] {
      ...,
      address{
        ...,
        ${asset('darkIcon')},
        ${asset('lightIcon')}
      },
      socialsWithVisibleLinks[]{
        ...,
        ${asset('darkIcon')},
      },
      socials[]{
        ...,
        ${asset('lightIcon')}
      }
    }
  }`;

export const pageQuery = (query: string) => groq`{
    "site": ${siteQuery},
    "page": ${query}
  }`;
