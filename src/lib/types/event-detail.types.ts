import type { PortableTextBlock, Slug } from 'sanity';
import type {
  Asset,
  Association,
  CommonImageAsset,
  Cta,
  DescriptionBlock,
  Quote,
  SeoProps,
  SocialProps,
  Tag,
  VR,
  Youtube,
} from './common.types';
import type { SanityImageAssetDocument } from '@sanity/client';

export interface EventDetailPageProps {
  _id: string;
  seo: SeoProps;
  name: string;
  slug: Slug;
  subtitle?: string;
  topTitle?: string;
  cta?: Cta;
  associationsList?: Association[];
  associationsButton?: Cta;
  socials?: SocialProps[];
  description?: PortableTextBlock[];
  endDate?: string;
  startDate: string;
  tag: Tag;
  gallery: { name: string; location?: string; url?: string };
  asset: Asset;
  sections: Section[];
  otherEvents: OtherEventsProps[];
}

type Section =
  | CommonImageAsset
  | GalleryProps
  | NewsAndMediaProps
  | SummaryProps
  | VideoProps
  | DocumentationProps;

export interface DocumentationProps {
  _key: string;
  _type: 'event.documentation';
  quote?: Quote;
  images: [SanityImageAssetDocument, SanityImageAssetDocument];
  descriptionBlock: {
    name: string;
    author?: string;
    isbn?: string;
    publishedBy?: string[];
    cta?: Cta;
    description: PortableTextBlock[];
    associationsList?: Association[];
  };
}

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
}

export interface VideoProps {
  _key: string;
  _type: 'event.video';
  vrOrYtVideoSlider?: VrOrYtVideoSlider[];
}

type VrOrYtVideoSlider = VR | Youtube;
