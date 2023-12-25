import type { Slug } from 'sanity';
import type { Asset, CommonHeroProps, SeoProps } from './common.types';

export interface HomePageProps {
  seo: SeoProps;
  sections: Section[];
}

type Section = CommonHeroProps | CollectionsProps;

export interface CollectionsProps {
  _type: 'landing.collections';
  collections: SliderProps[];
}

export type SliderProps =
  | VrProps
  | PublicationProps
  | ExhibitionProps
  | CollectionProps
  | EventProps
  | AudioVisualProps;

export type ExhibitionProps = Collection<'exhibition'>;
export type VrProps = Collection<'vr'>;
export type PublicationProps = Collection<'publication'>;
export type CollectionProps = Collection<'exhibition'>;
export type EventProps = Collection<'event'>;
export type AudioVisualProps = Collection<'documentary'>;

export type Collection<T> = {
  _type: T;
  title: string;
  name: string;
  slug: Slug;
  sliderImageVideo: Asset;
  subtitle?: string;
  exhibitionType?: string | { en: string };
  startDate: string;
  endDate?: string;
};

export type WithExtra<T> = T & {
  index: number;
};
