import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import type {
  CommonHeroListProps,
  CommonImageAsset,
  Cta,
  DescriptionBlock,
  Quote,
  SeoProps,
  SocialProps,
  VRExhibition,
} from './common.types';
import type { PortableTextBlock } from 'sanity';

export interface ArtistDetailPageProps {
  seo: SeoProps;
  sections: Section[];
  coverImage: SanityAsset;
}

type Section =
  | CommonHeroListProps
  | CommonImageAsset
  | ArtistSummaryProps
  | ExhibitionsProps;

export interface ArtistSummaryProps {
  _key: string;
  _type: 'artist.summary';
  statement: Statement;
  vrExhibition: VRExhibition;
  images: [SanityAsset, SanityAsset];
  quote: Quote;
  personalDocuments: PersonalDocuments;
}

export interface PersonalDocuments {
  born: string;
  name: string;
  shortBio: PortableTextBlock[];
  socials: SocialProps[];
}

export interface Statement extends DescriptionBlock {
  title: string;
}

export interface ExhibitionsProps {
  _type: 'artist.exhibitions';
  _key: string;
  exhibitions: Exhibition[][];
}

export interface Exhibition {
  _type: string;
  _key: string;
  descriptionBlock: ExhibitionDescriptionBlock;
  image: SanityAsset;
  quote: Quote;
}

export interface ExhibitionDescriptionBlock extends DescriptionBlock {
  title: string;
  subtitle: string;
  information: PortableTextBlock;
  cta: Cta;
}
