import groq from 'groq';
import { asset } from './sanity-image';

export const siteQuery = groq`{
    "nav": *[_type == "site.nav"][0],
    "footer": *[_type == "site.footer"][0],
    "logos": *[_type == "site.logos"][0] {
      ...,
      ${asset('logoDark')},
      ${asset('logoLight')},
    },
    "contact": *[_type == "site.contact"][0] {
      ...,
      address{
        ...,
        ${asset('darkIcon')},
        ${asset('lightIcon')}
      },
    }
  }`;

export const searchQuery = (query: string) => groq`
  *[_id == "searchPage"][0]{
    ...,
    "exhibitions" : *[_type == "exhibition" && !(_id in path("drafts.**"))
	  && (name match "${query}*" || topTitle match "${query}*" || subtitle match "${query}*" || tag->name match "${query}*" || artists[]->personalDocuments.name.en match "${query}*" || artworks[]->name match "${query}*" || publication->name match "${query}*" || gallery->name match "${query}*")]
	  | score(boost(name match "${query}*", 3), boost(topTitle match "${query}*", 2), boost(subtitle match "${query}*", 2))
    | order(_score desc) {
      _id,
      name,
      topTitle,
      subtitle,
      slug,
      tag->,
      startDate,
      endDate,
      exhibitionType,
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
    "events": *[_type == "event" && !(_id in path("drafts.**"))
	  && (name match "${query}*" || topTitle match "${query}*" || subtitle match "${query}*" || tag->name match "${query}*" || gallery->name match "${query}*")]
	  | score(boost(name match "${query}*", 3), boost(topTitle match "${query}*", 2), boost(subtitle match "${query}*", 2))
    | order(_score desc) {
      _id,
      slug,
      name,
      topTitle,
      subtitle,
      startDate,
      endDate,
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

    "collections" : *[_type == "collection" && !(_id in path("drafts.**"))
	  && (name match "${query}*" || tag->name match "${query}*" || artist->personalDocuments.name.en match "${query}*" || gallery->name match "${query}*")]
	  | score(boost(name match "${query}*", 3))
    | order(_score desc) {
      _id,
      slug,
      name,
      subtitle,
      thumbnail,
      tag->,
      displayNew,
      displaySold,
      "media": information.media,
      "year": information.artDate.year,
      "artist": *[_type == 'artist' && references(^._id)][0]{
        ...personalDocuments {
          "name": name.en
        }
      },
    },
    "artists" : *[_type == "artist" && !(_id in path("drafts.**"))
    && (personalDocuments.name.en match "${query}*" || siteDocuments.topTitle match "${query}*" || siteDocuments.subtitle match "${query}*" || artworks[]->name match "${query}*")]
     | score(boost(personalDocuments.name.en match "${query}*", 3), boost(siteDocuments.topTitle match "${query}*", 2), boost(siteDocuments.subtitle match "${query}*", 2))
     | order(_score desc) {
      _id,
      slug,
      tag->,
      ...personalDocuments {
        "name": name.en,
          ${asset('artistPortrait')},
      },
      ...siteDocuments {
        topTitle,
        subtitle,
      },
      artworks[0...4]->{
         name,
        slug,
        ${asset('artworkImages[0]', { as: 'artworkImage' })},
      }
    },
    "vrs" : *[_type == "vr" && !(_id in path("drafts.**"))
	  && (name match "${query}*" || subtitle match "${query}*" || category->name match "${query}*" || gallery->name match "${query}*")]
	  | score(boost(name match "${query}*", 3), boost(subtitle match "${query}*", 2))
    | order(_score desc) {
      _id,
      name,
      subtitle,
      slug,
      gallery->{name},
      caption,
      url,
      category->,
      ${asset('thumbnail')},

    },

    "publications" : *[_type == "publication" && !(_id in path("drafts.**"))
	  && (name match "${query}*" || subtitle match "${query}*" || category->name match "${query}*")]
	  | score(boost(name match "${query}*", 3), boost(subtitle match "${query}*", 1))
    | order(_score desc) {
      _id,
      name,
      subtitle,
      slug,
      "prices": {
        "priceBDT": prices.priceBDT,
        "discountPriceBDT": prices.discountPriceBDT,
        "priceUSD": prices.priceUSD
      },
      ${asset('publicationImage')},
      category->,
    },

    "documentaries" : *[_type == "documentary" && !(_id in path("drafts.**"))
	  && (name match "${query}*" || category->name match "${query}*")]
	  | score(boost(name match "${query}*", 3))
    | order(_score desc) {
      _id,
      slug,
      name,
      type->,
      category->,
      duration,
      year,
      ${asset('coverImage')}
    },

    "projects" : *[_type == "project" && !(_id in path("drafts.**"))
	  && (name match "${query}*" || topTitle match "${query}*" || subtitle match "${query}*" || gallery->name match "${query}*" || tag->name match "${query}*")]
	  | score(boost(name match "${query}*", 3), boost(topTitle match "${query}*", 2), boost(subtitle match "${query}*", 2))
    | order(_score desc) {
      _id,
      name,
      topTitle,
      subtitle,
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
    }
  }
`;

export const defaultSearchQuery = groq`
    *[_id == "searchPage"][0]{
      ...,
      "exhibitions" : *[_type== "exhibition"]|order(orderRank)[0...5]{
        _id,
        name,
        topTitle,
        subtitle,
        slug,
        tag->,
        startDate,
        endDate,
        exhibitionType,
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
        topTitle,
        subtitle,
        startDate,
        endDate,
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
      "artists" : *[_type== "artist"]|order(orderRank)[0...5]{
        _id,
        slug,
        tag->,
        ...personalDocuments {
          "name": name.en,
            ${asset('artistPortrait')},
          },
          ...siteDocuments {
            topTitle,
            subtitle,
          },
          artworks[0...4]->{
            name,
            slug,
            ${asset('artworkImages[0]', { as: 'artworkImage' })},
          }
      },
      "collections" : *[_type== "collection"]|order(orderRank)[0...5]{
            _id,
            slug,
            name,
            subtitle,
            thumbnail,
            tag->,
            displayNew,
            displaySold,
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
            subtitle,
            slug,
            gallery->{name},
            caption,
            url,
            category->,
            ${asset('thumbnail')},
        },
        "publications" : *[_type== "publication"]|order(orderRank)[0...5]{
            _id,
            name,
            subtitle,
            slug,
            "prices": {
              "priceBDT": prices.priceBDT,
              "discountPriceBDT": prices.discountPriceBDT,
              "priceUSD": prices.priceUSD
            },
            ${asset('publicationImage')},
            category->,
        },
        "documentaries" : *[_type== "documentary"]|order(orderRank)[0...5]{
            _id,
            slug,
            name,
            type->,
            category->,
            duration,
            year,
            ${asset('coverImage')}
        },
        "projects" : *[_type== "project"]|order(orderRank)[0...5]{
            _id,
            name,
            topTitle,
            subtitle,
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

export const pageQuery = (query: string) => groq`{
    "site": ${siteQuery},
    "page": ${query}
  }`;
