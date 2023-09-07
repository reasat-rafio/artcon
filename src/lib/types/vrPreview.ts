import type { SanityImageAssetDocument } from '@sanity/client';
import type { PortableTextBlock, Slug } from 'sanity';

export interface VrPreviewProps {
  _type: 'vr';
  category: RefDocument;
  endDate: string;
  description: PortableTextBlock[];
  url: string;
  subtitle: string;
  _rev: string;
  gallery: RefDocument;
  _id: string;
  previewImage: SanityImageAssetDocument;
  placeholderImage: SanityImageAssetDocument;
  _createdAt: string;
  startDate: string;
  _updatedAt: string;
  slug: Slug;
  name: string;
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
