import type { PortableTextBlock, Slug } from 'sanity';
import type {
  Asset,
  CommonImageAsset,
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
  status?: string;
  type?: string;
  cta?: Cta;
  inquiryButton: Cta;
  information: Information;
  sections: Section[];
  asset: Asset;
  artist: Artist;
  otherCollections: OtherCollection[];
  provenance: Provenance;
}

type Section = CommonImageAsset | SummaryProps;

export interface Provenance {
  title: string;
  description: PortableTextBlock[];
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
  data: Data;
  name: string;
  shortBio: PortableTextBlock[];
  born: string;
  socials: SocialProps[];
}

export interface Data {
  quote: Quote;
  _type: string;
  _key: string;
  vr: VR;
  images: SanityImageAssetDocument[];
}

export interface OtherCollection {
  slug: Slug;
  media: string;
  year: string;
  artworkImage: SanityImageAssetDocument;
}
