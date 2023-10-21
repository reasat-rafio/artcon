import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import type {
  CommonArtworkSectionProps,
  CommonHeroProps,
  CommonImageAsset,
  CommonOtherExhibitionProps,
  Cta,
  DescriptionBlock,
  Quote,
  SeoProps,
  ShortArtworks,
  VR,
} from './common.types';
import type { PortableTextBlock } from 'sanity';
import type { SanityImageAssetDocument } from '@sanity/client';

export interface ArtistDetailPageProps {
  seo: SeoProps;
  siteDocuments: {
    sections: Section[];
    coverImage: SanityAsset;
  };
  artworks: ShortArtworks;
  exhibitions: CommonOtherExhibitionProps[];
  personalDocuments: PersonalDocuments;
}

type Section =
  | CommonHeroProps
  | CommonImageAsset
  | CommonArtworkSectionProps
  | ArtistSummaryProps
  | ExhibitionsProps;

export interface ArtistSummaryProps {
  _key: string;
  _type: 'artist.summary';
  statement?: DescriptionBlock & {
    title: string;
  };
  vr: VR;
  images: [SanityImageAssetDocument, SanityImageAssetDocument];
  quote: Quote;
}

export interface PersonalDocuments {
  born: string;
  name: string;
  shortBio: PortableTextBlock[];
  socials: ArtistSocial[];
}

interface ArtistSocial {
  _key: string;
  _type: string;
  icon: SanityAsset;
  link: string;
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
  quote: Quote;
}
