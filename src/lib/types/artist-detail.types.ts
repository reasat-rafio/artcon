import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import type {
  Asset,
  CommonArtworkSectionProps,
  CommonImageAsset,
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
import type { SanityImageAssetDocument } from '@sanity/client';

export interface ArtistDetailPageProps {
  seo: SeoProps;
  slug: Slug;
  siteDocuments: {
    sections?: Section[];
    asset: Asset;
    subtitle?: string;
    topTitle?: string;
    cta?: Cta;
  };
  artworks?: ShortArtworks[];
  exhibitions: CommonOtherExhibitionProps[];
  personalDocuments: PersonalDocuments;
  otherArtists: OtherArtists[];
  publications?: Publication[];
  publicationsFromExhibitions?: Publication[];
}

type Section =
  | CommonImageAsset
  | CommonArtworkSectionProps
  | ArtistSummaryProps
  | PublicationSectionPros
  | ExhibitionsProps;

export interface PublicationSectionPros {
  _type: 'artist.publication';
  _key: string;
}

export interface Publication {
  _createdAt: string;
  quote?: Quote;
  publicationImage: SanityImageAssetDocument;
  name: string;
  description: PortableTextBlock[];
  exproleLink: ExploreLink;
  isbn: string;
  slug: Slug;
  subtitle: string;
  associationsList: AssociationsList[];
  publishedBy: string[];
}

export interface ExploreLink {
  _type: string;
  href: string;
  title: string;
}

export interface AssociationsList {
  _type: string;
  _key: string;
  value: string;
  key: string;
}

export interface OtherArtists {
  slug: Slug;
  name: string;
  artistPortrait: SanityImageAssetDocument;
  tag: Tag;
}

export interface ArtistSummaryProps {
  _key: string;
  _type: 'artist.summary';
  statement?: DescriptionBlock & {
    title: string;
  };
  vr?: VR;
  images: [SanityImageAssetDocument, SanityImageAssetDocument];
  quote?: Quote;
}

export interface PersonalDocuments {
  born?: string;
  name: string;
  shortBio?: PortableTextBlock[];
  socials?: SocialProps[];
}

export interface ExhibitionsProps {
  _type: 'artist.exhibitions';
  _key: string;
  exhibitions: Exhibition[][];
}

export interface Exhibition {
  _type: string;
  _key: string;
  descriptionBlock: DescriptionBlock & {
    title: string;
    subtitle: string;
    information: PortableTextBlock;
    cta: Cta;
  };
  image: SanityAsset;
  quote?: Quote;
}
