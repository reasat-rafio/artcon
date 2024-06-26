import type { SanityImageAssetDocument } from '@sanity/client';
import type { PortableTextBlock, Slug } from 'sanity';
import type { Asset, Tag } from './common.types';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';

export interface VrPreviewProps {
  _type: 'vr';
  category: Tag;
  endDate: string;
  description: PortableTextBlock[];
  url: string;
  link?: string;
  subtitle: string;
  _rev: string;
  gallery: RefDocument;
  _id: string;
  sliderImageVideo: Asset;
  caption: string;
  _createdAt: string;
  startDate: string;
  _updatedAt: string;
  slug: Slug;
  name: string;
  coverImage: SanityImageAssetDocument;
  thumbnail: SanityAsset;
}

export interface RefDocument {
  _id: string;
  _updatedAt: Date;
  _createdAt: Date;
  _rev: string;
  _type: string;
  name: string;
  location?: string;
}
