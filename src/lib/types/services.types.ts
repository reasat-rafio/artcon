import type { Asset, CommonHeroProps, Cta, SeoProps } from './common.types';
import type { PortableTextBlock } from 'sanity';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';

export interface ServicesPageProps {
  seo: SeoProps;
  sections: Section[];
  services: ServiceProps[];
}

type Section = CommonHeroProps;

export interface ServiceProps {
  _key: string;
  title: string;
  descriptionMedia?: Asset;
  description: PortableTextBlock[];
  fullWidthImage?: SanityAsset & { alt?: string };
}
