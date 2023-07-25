import type DescriptionBlock from '@/components/DescriptionBlock.svelte';
import type {
  CommonHeroProps,
  CommonImageAsset,
  Cta,
  Quote,
  SeoProps,
  Tag,
  VRExhibitionnCta,
} from './common.types';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import type { PortableTextBlock } from 'sanity';

export interface ExhinitionDetailPageProps {
  seo: SeoProps;
  tags: Tag[];
  sections: Section[];
}

type Section =
  | CommonHeroProps
  | CommonImageAsset
  | SummaryProps
  | NoteProps
  | PromotionProps
  | ArtworkProps
  | GalleryProps
  | NewsAndMediaProps;

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

export interface NoteProps {
  _type: 'exhibition.note';
  _key: string;
  notes: Note[];
}
export interface Note {
  quote: Quote;
  _type: string;
  _key: string;
  descriptionBlock: NoteDescriptionBlock;
}
export interface NoteDescriptionBlock extends DescriptionBlock {
  title: string;
  subtitle: string;
}

export interface PromotionProps {
  _key: string;
  _type: 'exhibition.promotion';
  quote: Quote;
  images: SanityAsset[];
  descriptionBlock: DescriptionBlock;
}
export interface PromotionDescriptionBlock extends DescriptionBlock {
  title: string;
  cta: Cta;
  subtitle: string;
  information: PortableTextBlock;
}

export interface ArtworkProps {
  _key: string;
  _type: 'exhibition.artwork';
  descriptionBlock: ArtworkDescriptionBlock;
  artworks: SanityAsset[];
  quote: Quote;
}
export interface ArtworkDescriptionBlock extends DescriptionBlock {
  title: string;
  cta: Cta;
  information: PortableTextBlock;
}

export interface GalleryProps {
  _key: string;
  _type: 'exhibition.gallery';
  descriptionBlock: GalleryDescriptionBlock;
  images: SanityAsset[];
}
export interface GalleryDescriptionBlock extends DescriptionBlock {
  title: string;
}

export interface NewsAndMediaProps {
  _key: string;
  newsAndMedia: NewsAndMedia[];
  descriptionBlock: NewsAndMediaDescriptionBlock;
  quote: Quote;
  _type: 'exhibition.newsAndMedia';
}
export interface NewsAndMediaDescriptionBlock extends DescriptionBlock {
  title: string;
}
export interface NewsAndMedia {
  image: SanityAsset;
  subtitle: string;
  _type: string;
  link: string;
  _key: string;
  title: string;
}
