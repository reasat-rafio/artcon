import type {
  Asset,
  CommonHeroProps,
  CommonImageAsset,
  Cta,
  DescriptionBlock,
  EbookProps,
  Quote,
  SeoProps,
  SocialProps,
  Tag,
  VR,
} from './common.types';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import type { PortableTextBlock, Slug } from 'sanity';
import type {
  ArtistSummaryProps,
  PersonalDocuments,
} from './artistDetail.types';

export interface ExhinitionDetailPageProps {
  _id: string;
  type?: string;
  status?: string;
  cta?: Cta;
  artists: ArtistsProps;
  artworks: { artworkImages: SanityAsset }[];
  asset: Asset;
  associationsList: Association[];
  name: string;
  description: PortableTextBlock[];
  endDate?: string;
  startDate: string;
  gallery: Gallery;
  seo: SeoProps;
  tags: Tag[];
  sections: Section[];
  otherExhibitions: OtherExhibitionProps[];
  publication: Publication;
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
  personalDocuments: PersonalDocuments;
}

export interface Association {
  key: string;
  value: string;
}

export interface Publication {
  name: string;
  category: { name: string };
  description: PortableTextBlock[];
  exproleLink: Cta;
  isbn: string;
  quote: Quote;
  slug: Slug;
  publishedBy: string[];
  publicationImage: SanityAsset;
  subtitle: string;
}

export interface Gallery {
  name: string;
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
  vr: VR;
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
