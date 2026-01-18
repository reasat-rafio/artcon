import type { Asset, CommonHeroProps, SeoProps, Quote } from './common.types';
import type { PortableTextBlock } from 'sanity';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';

export interface ServicesPageProps {
  seo: SeoProps;
  sections: Section[];
  allServices?: AllServicesProps;
}

type Section = CommonHeroProps;

export interface AllServicesProps {
  summary?: SummaryProps;
  sections: (ServiceItemProps | ImageDividerProps)[];
}

export interface ServiceItemProps {
  _key: string;
  _type: 'allServices.serviceItem';
  title: string;
  button?: CTA;
  image?: SanityAsset & { alt?: string };
  summary?: Quote;
  contentMedia?: Asset;
}

export interface ImageDividerProps {
  _key: string;
  _type: 'common.imageAsset';
  image: SanityAsset & { alt?: string };
}

export interface SummaryProps {
  _key: string;
  _type: 'allServices.summary';
  quote?: Quote;
  title?: string;
  description?: PortableTextBlock[];
  media?: Asset;
}

export interface CTA {
  _key: string;
  _type: string;
  label?: string;
  href?: string;
}
