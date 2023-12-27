import type { Slug } from 'sanity';
import type {
  Asset,
  CommonImageAsset,
  Cta,
  SeoProps,
  Tag,
} from './common.types';

export interface EventPageProps {
  seo: SeoProps;
  sections: Section[];
  events: Event[];
  tags: Tag[];
}

type Section = HeroProps | CommonImageAsset;

export interface Event {
  _id: string;
  slug: Slug;
  name: string;
  tag: Tag;
  asset: Asset;
  subtitle?: string;
}

export interface HeroProps {
  _type: 'event.hero';
  highlightedEvents: HighlightedEvent[];
}

export interface HighlightedEvent {
  name: string;
  slug: Slug;
  subtitle?: string;
  topTitle?: string;
  startDate: string;
  endDate?: string;
  cta?: Cta;
  asset: Asset;
  tag?: Tag;
}
