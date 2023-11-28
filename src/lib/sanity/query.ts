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
    }
  }`;

export const searchQuery = (query: string) => groq`
  *[_id == "searchPage"][0]{
    ...,
    "exhibitions" : *[_type == "exhibition" && !(_id in path("drafts.**"))
	  && (name match "${query}*" || tag->name match "${query}*" || artists[]->personalDocuments.name.en match "${query}*" || artworks[]->name match "${query}*" || publication->name match "${query}*" || gallery->name match "${query}*")]
	  | score(boost(name match "${query}*", 3))
    | order(_score desc) {
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
    "events": *[_type == "event" && !(_id in path("drafts.**"))
	  && (name match "${query}*" || tag->name match "${query}*" || gallery->name match "${query}*")]
	  | score(boost(name match "${query}*", 3))
    | order(_score desc) {
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

    "collections" : *[_type == "collection" && !(_id in path("drafts.**"))
	  && (name match "${query}*" || tag->name match "${query}*" || artist->personalDocuments.name.en match "${query}*" || gallery->name match "${query}*")]
	  | score(boost(name match "${query}*", 3))
    | order(_score desc) {
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

    "vrs" : *[_type == "vr" && !(_id in path("drafts.**"))
	  && (name match "${query}*" || category->name match "${query}*" || gallery->name match "${query}*")]
	  | score(boost(name match "${query}*", 3))
    | order(_score desc) {
      _id,
      name,
      slug,
      gallery->{name},
      caption,
      url,
      category->
    },

    "publications" : *[_type == "publication" && !(_id in path("drafts.**"))
	  && (name match "${query}*" || subtitle match "${query}*" || category->name match "${query}*")]
	  | score(boost(name match "${query}*", 3), boost(subtitle match "${query}*", 1))
    | order(_score desc) {
      _id,
      name,
      slug,
      prices,
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
      category->,
      ${asset('coverImage')}
    },

    "projects" : *[_type == "project" && !(_id in path("drafts.**"))
	  && (name match "${query}*" || gallery->name match "${query}*" || tag->name match "${query}*")]
	  | score(boost(name match "${query}*", 3))
    | order(_score desc) {
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
    }
  }
`;

export const defaultSearchQuery = groq`
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

export const pageQuery = (query: string) => groq`{
    "site": ${siteQuery},
    "page": ${query}
  }`;
