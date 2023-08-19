import type { Slug } from 'sanity';
import type { CommonHeroProps, SeoProps } from './common.types';

export interface HomePageProps {
  seo: SeoProps;
  sections: Section[];
}

type Section = CommonHeroProps | CollectionsProps;

export interface CollectionsProps {
  _type: 'landing.collections';
  collections: CollectionProps[];
}

interface CollectionProps {
  slug: Slug;
  data: CommonHeroProps;
}
