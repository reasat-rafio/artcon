import type {
  Asset,
  CommonHeroProps,
  CommonImageAsset,
  CommonNoteProps,
  Cta,
  DescriptionBlock,
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
  otherExhibitions: OtherExhibitionProps[];
  publication: Publication;
  sections: Section[];
}

type Section =
  | CommonHeroProps
  | CommonImageAsset
  | CommonNoteProps
  | SummaryProps
  | PublicationProps
  | ArtworkProps
  | IncludedArtistsProps
  | GalleryProps
  | NewsAndMediaProps;

export type ArtistsProps = SoloExhibitonProps | GroupExhibirtionProps[];

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
  vr: VR;
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
  invitationCardImage: SanityAsset;
}

export interface ArtworkProps {
  _key: string;
  _type: 'exhibition.artwork';
  descriptionBlock: DescriptionBlock & {
    title: string;
    cta: Cta;
  };
  artworks: SanityAsset[];
  quote: Quote;
}

export interface GalleryProps {
  _key: string;
  _type: 'exhibition.gallery';
  descriptionBlock: DescriptionBlock & {
    title: string;
  };
  images: SanityAsset[];
}

export interface NewsAndMediaProps {
  _key: string;
  newsAndMedia: NewsAndMedia[];
  descriptionBlock: DescriptionBlock & {
    title: string;
  };
  quote: Quote;
  _type: 'exhibition.newsAndMedia';
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
