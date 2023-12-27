import type { PortableTextBlock, Slug } from 'sanity';
import type {
  Association,
  CommonImageAsset,
  DescriptionBlock,
  Quote,
  SeoProps,
  Tag,
  VR,
  Asset,
  Cta,
  CommonOtherExhibitionProps,
} from './common.types';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';

export interface ProjectDetailPageProps {
  _id: string;
  name: string;
  topTitle?: string;
  subtitle?: string;
  cta?: Cta;
  seo: SeoProps;
  asset: Asset;
  tag: Tag;
  startDate: string;
  endDate?: string;
  associationsList: Association[];
  description: PortableTextBlock[];
  gallery: Gallery;
  sections: Section[];
  otherProjects: Omit<CommonOtherExhibitionProps, 'type'>[];
}

type Section = CommonImageAsset | SummaryProps | GalleryProps;

export interface Gallery {
  name: string;
}
export interface SummaryProps {
  _type: 'project.summary';
  key: string;
  quote?: Quote;
  vr?: VR;
}

export interface SummaryDescriptionBlock extends DescriptionBlock {
  moreInformations: MoreInformation[];
  name: string;
}

export interface MoreInformation {
  _type: string;
  _key: string;
  value: string;
  key: string;
}
export interface OtherProjectProps {
  info: OtherProjectInfoProps;
  slug: Slug;
}

export interface OtherProjectInfoProps {
  title: string;
  type?: string;
  asset?: {
    image?: SanityAsset;
    video?: {
      webm: string;
      mov: string;
    };
  };
}

export interface GalleryProps {
  _key: string;
  _type: 'project.gallery';
  descriptionBlock: GalleryDescriptionBlock;
  images: SanityAsset[];
}
export interface GalleryDescriptionBlock extends DescriptionBlock {
  title: string;
}
