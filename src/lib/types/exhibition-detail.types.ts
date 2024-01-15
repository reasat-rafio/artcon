import type {
  Asset,
  Association,
  CommonArtworkSectionProps,
  CommonHeroProps,
  CommonImageAsset,
  CommonNoteProps,
  CommonOtherExhibitionProps,
  Cta,
  DescriptionBlock,
  Quote,
  SeoProps,
  ShortArtworks,
  SocialProps,
  Tag,
  VR,
} from './common.types';
import type { PortableTextBlock, Slug } from 'sanity';
import type {
  ArtistSummaryProps,
  PersonalDocuments,
} from './artist-detail.types';
import type { SanityImageAssetDocument } from '@sanity/client';

export interface ExhibitionDetailPageProps {
  _id: string;
  subtitle?: string;
  topTitle?: string;
  cta?: Cta;
  slug: Slug;
  artists: ArtistsProps;
  artworks: ShortArtworks[];
  asset: Asset;
  associationsList: Association[];
  name: string;
  description: PortableTextBlock[];
  endDate?: string;
  startDate: string;
  gallery: Gallery;
  seo: SeoProps;
  tag: Tag;
  otherExhibitions: CommonOtherExhibitionProps[];
  publication?: Publication;
  sections: Section[];
}

export type ExhibitionArtworksPageProps = Pick<
  ExhibitionDetailPageProps,
  | 'name'
  | 'topTitle'
  | 'subtitle'
  | 'cta'
  | 'seo'
  | 'endDate'
  | 'startDate'
  | 'tag'
  | 'asset'
  | 'artworks'
> & { artists: { personalDocuments: { name: string } } };

type Section =
  | CommonHeroProps
  | CommonImageAsset
  | CommonNoteProps
  | SummaryProps
  | PublicationProps
  | CommonArtworkSectionProps
  | IncludedArtistsProps
  | GalleryProps
  | NewsAndMediaProps;

export type ArtistsProps = SoloExhibitionProps | GroupExhibitionProps[];

export interface SoloExhibitionProps {
  data: ArtistSummaryProps;
  personalDocuments: PersonalDocuments;
}

export interface Publication {
  name: string;
  category: { name: string };
  description: PortableTextBlock[];
  exproleLink: Cta;
  isbn: string;
  quote?: Quote;
  slug: Slug;
  publishedBy: string[];
  publicationImage: SanityImageAssetDocument;
  subtitle: string;
}

export interface Gallery {
  _id: string;
  name: string;
  location?: string;
}

export interface GroupExhibitionProps {
  slug: Slug;
  name: string;
  artistPortrait: SanityImageAssetDocument;
  tag: Tag;
}

export interface SummaryProps {
  _key: string;
  _type: 'exhibition.summary';
  quote?: Quote;
  vr?: VR;
}

export interface IncludedArtistsProps {
  _key: string;
  _type: 'exhibition.includedArtists';
  statement?: { statement: PortableTextBlock[]; title: string };
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

export interface PublicationProps {
  _key: string;
  _type: 'exhibition.publication';
  invitationCardImage: SanityImageAssetDocument;
}

export interface GalleryProps {
  _key: string;
  _type: 'exhibition.gallery';
  descriptionBlock: DescriptionBlock & {
    title: string;
  };
  images: SanityImageAssetDocument[];
}

export interface NewsAndMediaProps {
  _key: string;
  newsAndMedia: NewsAndMedia[];
  descriptionBlock: DescriptionBlock & {
    title: string;
  };
  quote?: Quote;
  _type: 'exhibition.newsAndMedia';
}

export interface NewsAndMedia {
  image: SanityImageAssetDocument;
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
//   images: [SanityImageAssetDocument, SanityImageAssetDocument];
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
