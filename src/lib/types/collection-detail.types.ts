import type { PortableTextBlock, Slug } from 'sanity';
import type {
  Asset,
  CommonImageAsset,
  CommonNoteProps,
  Cta,
  Quote,
  SeoProps,
  SocialProps,
  VR,
} from './common.types';
import type { SanityImageAssetDocument } from '@sanity/client';

export interface CollectionDetailPageProps {
  _id: string;
  seo: SeoProps;
  name: string;
  slug: Slug;
  artworkImages: SanityImageAssetDocument[];
  subtitle?: string;
  topTitle?: string;
  cta?: Cta;
  information: Information;
  sections: Section[];
  asset: Asset;
  artist: Artist;
  otherCollections: OtherCollection[];
  provenance: Provenance;
  hideInquiryButton?: boolean;
}

type Section =
  | CommonImageAsset
  | SummaryProps
  | CommonNoteProps
  | ArtistSectionProps
  | DocumentationsProps;

export interface Provenance {
  title: string;
  description: PortableTextBlock[];
}

export interface DocumentationsProps {
  _type: 'collection.documentation';
  documents: Document[];
}

export interface Document {
  descriptionBlock: {
    name: string;
    author?: string;
    isbn?: string;
    publishedBy?: string;
    cta?: Cta;
    description: PortableTextBlock[];
  };
  quote?: Quote;
  image: SanityImageAssetDocument;
}

export interface ArtistSectionProps {
  _type: 'collection.artist';
}

export interface SummaryProps {
  _type: 'collection.summary';
  _key: string;
  vr?: VR;
  quote?: Quote;
}

export interface Information {
  media: string;
  size: string;
  frame: string;
  artDate: {
    creationDetails: string;
    year: string;
  };
  moreInformation?: string[];
}

export interface Artist {
  country: string;
  images: {
    images: SanityImageAssetDocument[];
  };

  name: string;
  shortBio: PortableTextBlock[];
  born: string;
  socials: SocialProps[];
}

export interface OtherCollection {
  slug: Slug;
  media: string;
  year: string;
  asset: Asset;
  name: string;
  artist: { name?: string };
}
