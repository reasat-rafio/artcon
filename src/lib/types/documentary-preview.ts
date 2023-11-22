import type { PortableTextBlock, Slug } from 'sanity';
import type { Asset, Tag, Youtube } from './common.types';
import type { SanityImageAssetDocument } from '@sanity/client';

export interface DocumentaryPreviewProps {
  _id: string;
  _type: string;
  name: string;
  slug: Slug;
  category: Tag;
  year?: string;
  duration?: string;
  exploreUrl: string;
  coverImage: SanityImageAssetDocument;
  sliderImageVideo: Asset;
  documentaryVideo: Youtube;
  thumbnail: SanityImageAssetDocument;
  synopsys: {
    title: string;
    description: PortableTextBlock[];
  };
  information: PortableTextBlock[];
}
