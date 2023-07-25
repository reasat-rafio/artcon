import type DescriptionBlock from '@/components/DescriptionBlock.svelte';
import type {
  CommonHeroProps,
  CommonImageAsset,
  Quote,
  SeoProps,
  Tag,
  VRExhibitionnCta,
} from './common.types';

export interface ExhinitionDetailPageProps {
  seo: SeoProps;
  tags: Tag[];
  sections: Section[];
}

type Section = CommonHeroProps | CommonImageAsset | SummaryProps;

export interface SummaryProps {
  _key: string;
  _type: 'exhibition.summary';
  quote: Quote;
  descriptionBlock: SummaryDescriptionBlock;
  vrExhibitionnCta: VRExhibitionnCta;
}

export interface SummaryDescriptionBlock extends DescriptionBlock {
  moreInformations: MoreInformation[];
  datetime: Date;
  name: string;
}
export interface MoreInformation {
  _type: string;
  _key: string;
  value: string;
  key: string;
}
