import type { CommonHeroProps, Quote, SeoProps } from './common.types';

export interface ContactPageProps {
  seo: SeoProps;
  sections: Section[];
}

type Section = CommonHeroProps | Quote;
