import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import type {
  CommonHeroListProps,
  CommonImageAsset,
  SeoProps,
} from './common.types';

export interface ArtistDetailPageProps {
  seo: SeoProps;
  sections: Section[];
  coverImage: SanityAsset;
}

type Section = CommonHeroListProps | CommonImageAsset;
