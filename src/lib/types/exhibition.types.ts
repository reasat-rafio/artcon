import type { Slug } from 'sanity';
import type { Asset, CommonImageAsset, SeoProps } from './common.types';
import type { OtherExhibitionProps } from './exhibitionDetail.types';

export interface ExhibitionPageProps {
  seo: SeoProps;
  sections: Section[];
  exhibitions: OtherExhibitionProps[];
}

type Section = HeroProps | CommonImageAsset;

export interface HeroProps {
  _type: 'exhibitionPage.hero';
  highlightedExhibition: HighlightedExhibition[];
}

export interface HighlightedExhibition {
  name: string;
  slug: Slug;
  startDate: string;
  endDate: string;
  status?: string;
  type?: string;
  asset: Asset;
  tag: { name: string }[];
  subtitle: string | { name: string };
}
