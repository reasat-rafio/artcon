import type {
  CommonHeroProps,
  CommonImageAsset,
  Cta,
  DescriptionBlock,
  EbookProps,
  Quote,
  SeoProps,
  SocialProps,
  Tag,
  VRExhibition,
} from './common.types';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import type { PortableTextBlock, Slug } from 'sanity';
import type { ArtistSummaryProps } from './artistDetail.types';

export interface ExhinitionDetailPageProps {
  startDate: string;
  endDate?: string;
  artists: ArtistsProps;
  seo: SeoProps;
  tags: Tag[];
  sections: Section[];
  otherExhibitions: OtherExhibitionProps[];
}

type Section =
  | CommonHeroProps
  | CommonImageAsset
  | SummaryProps
  | NoteProps
  | PromotionProps
  | ArtworkProps
  | IncludedArtistsProps
  | GalleryProps
  | NewsAndMediaProps;

export type ArtistsProps = [SoloExhibitonProps] | GroupExhibirtionProps[];

export interface SoloExhibitonProps {
  data: ArtistSummaryProps;
}

export interface GroupExhibirtionProps {
  slug: Slug;
  name: string;
  artistPortrait: SanityAsset;
}

export interface OtherExhibitionProps {
  slug: Slug;
  startDate: string;
  endDate?: string;
  data: CommonHeroProps;
  type: 'Group Exhibition' | { artists: { name: string } };
}

export interface SummaryProps {
  _key: string;
  _type: 'exhibition.summary';
  quote: Quote;
  descriptionBlock: SummaryDescriptionBlock;
  vrExhibition: VRExhibition;
}

export interface IncludedArtistsProps {
  _key: string;
  _type: 'exhibition.includedArtists';
}

export interface SummaryDescriptionBlock extends DescriptionBlock {
  moreInformations: MoreInformation[];
  startDate: string;
  endDate: string;
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
  coverImage: SanityAsset;
  ebook: EbookProps;
  descriptionBlock: PromotionDescriptionBlock;
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

export interface FeaturedProps {
  _key: string;
  _type: 'exhibition.featured';
  // featured: SoloExhibiton | GroupExhibirtion;
}

// export interface SoloExhibiton {
//   _type: 'exhibition.featured.solo';
//   _key: string;
//   images: [SanityAsset, SanityAsset];
//   quote: Quote;
//   statement: {
//     title: string;
//     statement: PortableTextBlock[];
//   };
//   descriptionBlock: SoloExhibitonDescriptionBlock;
//   vrExhibition: VRExhibition;
// }

export interface SoloExhibitonDescriptionBlock extends DescriptionBlock {
  name: string;
  subtile: string;
  socials: SocialProps[];
}

// export interface GroupExhibirtion {
//   _type: 'exhibition.featured.group';
//   _key: string;
// }
