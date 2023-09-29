import type { Slug } from 'sanity';
import type { CommonHeroProps, SeoProps } from './common.types';
import type { SanityImageAssetDocument } from '@sanity/client';

export interface HomePageProps {
  seo: SeoProps;
  sections: Section[];
}

type Section = CommonHeroProps | CollectionsProps;

export interface CollectionsProps {
  _type: 'landing.collections';
  collections: CollectionProps[];
}

type CollectionProps = VrProps | PublicationProps | ExhibitionProps;
export type VrProps = Collection<'vr'>;
export type PublicationProps = Collection<'publication'>;

export type Collection<T> = {
  _type: T;
  title: string;
  name: string;
  slug: Slug;
  previewImage: SanityImageAssetDocument;
  subtitle: string;
};

export interface ExhibitionProps {
  _type: 'exhibition';
  title: string;
  slug: Slug;
  name: string;
  previewDisplayImage: SanityImageAssetDocument;
  exhibitionType: string | { en: string };
}

export type WithExtra<T> = T & {
  index: number;
  DEFAULT_COLUMN_W_PERCENTAGE?: number;
};
