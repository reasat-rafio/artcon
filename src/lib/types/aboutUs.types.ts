import type { CommonHeroProps, Quote, SeoProps } from './common.types';
import type { PortableTextBlock } from 'sanity';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';

export interface AboutUsPageProps {
  seo: SeoProps;
  sections: Section[];
  team: TeamProps[];
}

type Section = CommonHeroProps | AboutUsProps | TeamBannerProps;

export interface AboutUsProps {
  key: string;
  _type: 'aboutUsPage.aboutUs';
  quote: Quote;
  descriptionBlock: {
    title: string;
    description: PortableTextBlock[];
  };
}

export interface TeamBannerProps {
  key: string;
  _type: 'aboutUsPage.teamBanner';
  title: string;
  image: SanityAsset;
}

export interface TeamProps {
  _id: string;
  _type: string;
  name: string;
  image: SanityAsset;
  url?: string;
  role: string;
  type: 'extra' | 'core';
}
