import type { Slug } from 'sanity';
import type { Asset, Cta, SeoProps, Tag } from './common.types';
import type { SanityImageAssetDocument } from '@sanity/client';

export interface ArtistPageProps {
  seo: SeoProps;
  sections: Section[];
  artists: Artist[];
  tags: Tag[];
}

type Section = HeroProps;

export interface HeroProps {
  _type: 'artist.hero';
  highlightedArtists: HighlightedArtist[];
}

export interface HighlightedArtist {
  name: string;
  slug: Slug;
  type?: string;
  text?: string;
  cta?: Cta;
  coverImage?: SanityImageAssetDocument;
  asset: Asset;
}

export interface Artist {
  _id: string;
  slug: Slug;
  tag: Tag;
  name: string;
  artistPortrait: SanityImageAssetDocument;
  artworks: Artwork[];
}

export interface Artwork {
  slug: Slug;
  name: string;
  artworkImage: SanityImageAssetDocument;
}

export interface SortedArtists {
  title: string;
  artists: Artist[];
}
