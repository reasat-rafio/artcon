import type { PortableTextBlock, Slug } from 'sanity';
import type {
  Asset,
  Association,
  CommonImageAsset,
  Cta,
  DescriptionBlock,
  Quote,
  SeoProps,
  Tag,
  VR,
} from './common.types';
import type { SanityImageAssetDocument } from '@sanity/client';

export interface EventDetailPageProps {
  _id: string;
  seo: SeoProps;
  name: string;
  slug: Slug;
  status?: string;
  type?: string;
  cta?: Cta;
  associationsList: Association[];
  description: PortableTextBlock[];
  endDate?: string;
  startDate: string;
  tag: Tag;
  gallery: { name: string };
  asset: Asset;
  sections: Section[];
  otherEvents: OtherEventsProps[];
}

type Section =
  | CommonImageAsset
  | GalleryProps
  | NewsAndMediaProps
  | SummaryProps;

export interface OtherEventsProps {
  name: string;
  slug: Slug;
  tag: Tag;
  startDate: string;
  endDate: string;
  asset: Asset;
}

export interface GalleryProps {
  _key: string;
  _type: 'event.gallery';
  descriptionBlock: DescriptionBlock & {
    title: string;
  };
  images: SanityImageAssetDocument[];
}

export interface NewsAndMediaProps {
  _key: string;
  _type: 'event.newsAndMedia';
  newsAndMedia: NewsAndMedia[];
  descriptionBlock: DescriptionBlock & {
    title: string;
  };
  quote?: Quote;
}

export interface NewsAndMedia {
  image: SanityImageAssetDocument;
  subtitle: string;
  _type: string;
  link: string;
  _key: string;
  title: string;
}

export interface SummaryProps {
  _key: string;
  _type: 'event.summary';
  quote?: Quote;
  vr?: VR;
}
