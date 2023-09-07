import type { CommonHeroProps, SeoProps } from './common.types';
import type { VrPreviewProps } from './vrPreview';

export interface HomePageProps {
  seo: SeoProps;
  sections: Section[];
}

type Section = CommonHeroProps | CollectionsProps;

export interface CollectionsProps {
  _type: 'landing.collections';
  collections: CollectionProps[];
}

type CollectionProps = VrPreviewProps | CommonHeroProps;
