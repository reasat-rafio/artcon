import type { CommonHeroProps, SeoProps } from './common.types';

export interface HomePageProps {
  seo: SeoProps;
  sections: Section[];
}

type Section = CommonHeroProps;
