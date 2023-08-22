import type { Slug } from 'sanity';
import type {
  CommonHeroProps,
  CommonImageAsset,
  DescriptionBlock,
  Quote,
  SeoProps,
  VR,
} from './common.types';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';

export interface ProjectDetailPageProps {
  seo: SeoProps;
  sections: Section[];
  startDate: string;
  endDate?: string;
  otherProjects: OtherProjectProps[];
}

type Section = CommonHeroProps | CommonImageAsset | SummaryProps | GalleryProps;

export interface SummaryProps {
  _type: 'project.summary';
  key: string;
  quote: Quote;
  descriptionBlock: SummaryDescriptionBlock;
  vr: VR;
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
