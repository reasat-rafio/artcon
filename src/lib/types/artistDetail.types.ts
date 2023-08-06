import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import type {
  CommonHeroListProps,
  CommonImageAsset,
  DescriptionBlock,
  Quote,
  SeoProps,
  SocialProps,
  VRExhibition,
} from './common.types';

export interface ArtistDetailPageProps {
  seo: SeoProps;
  sections: Section[];
  coverImage: SanityAsset;
}

type Section = CommonHeroListProps | CommonImageAsset | ArtistSummaryProps;

export interface ArtistSummaryProps {
  _key: string;
  _type: 'artist.summary';
  descriptionBlock: ArtistSummaryDescriptionBlock;
  coverImage: null;
  blocks: null;
  statement: Statement;
  vrExhibition: VRExhibition;
  images: [SanityAsset, SanityAsset];
  image: null;
  exhibitions: null;
  quote: Quote;
}

export interface Statement extends DescriptionBlock {
  title: string;
}

export interface ArtistSummaryDescriptionBlock extends DescriptionBlock {
  name: string;
  subtile: string;
  socials: SocialProps[];
}
