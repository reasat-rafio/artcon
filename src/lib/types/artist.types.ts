import type { Slug } from 'sanity';
import type {
  Asset,
  CommonHeroProps,
  Cta,
  SeoProps,
  Tag,
} from './common.types';
import type { SanityImageAssetDocument } from '@sanity/client';

export interface ArtistPageProps {
  seo: SeoProps;
  sections: Section[];
  artists: Artist[];
  tags: Tag[];
}

type Section = CommonHeroProps;

export interface HeroProps {
  _type: 'event.hero';
  highlightedArtists: HighlightedArtist[];
}

export interface HighlightedArtist {
  name: string;
  slug: Slug;
  status?: string;
  type?: string;
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
  name: string;
  artworkImage: SanityImageAssetDocument;
}
