import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import type { Cta, SeoProps } from './common.types';

export interface HomePageProps {
  seo: SeoProps;
  sections: Section[];
}

type Section = HeroProps;

export interface HeroProps {
  _type: 'landingPage.hero';
  _key: string;
  title: string;
  subtitle: string;
  cta?: Cta;
  asset: {
    image?: SanityAsset;
    video?: {
      webm: string;
      mov: string;
    };
  };
}
