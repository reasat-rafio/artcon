import type {
  CommonHeroProps,
  CommonImageAsset,
  SeoProps,
} from './common.types';

export interface ExhibitionPageProps {
  seo: SeoProps;
  sections: Section[];
}

type Section = CommonHeroProps | CommonImageAsset;
