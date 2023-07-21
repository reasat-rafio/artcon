import type { CommonHeroProps, SeoProps } from './common.types';

export interface ExhibitionPageProps {
  seo: SeoProps;
  sections: Section[];
}

type Section = CommonHeroProps;
