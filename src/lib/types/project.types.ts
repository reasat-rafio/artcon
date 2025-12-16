import type { Slug } from 'sanity';
import type { Asset, CommonImageAsset, SeoProps, Tag } from './common.types';

export interface ProjectPageProps {
  seo: SeoProps;
  sections: Section[];
  projects: Project[];
  tags: Tag[];
}

type Section = HeroProps | CommonImageAsset;

export interface HeroProps {
  _type: 'projectPage.hero';
  highlightedProjects: HighlightedProject[];
}

export interface HighlightedProject {
  name: string;
  slug: Slug;
  startDate: string;
  endDate: string;
  topTitle?: string;
  subtitle?: string;
  asset: Asset;
  tag: Tag;
}

export interface Project {
  _id: string;
  name: string;
  slug: Slug;
  subtitle?: string;
  asset: Asset;
  tag: Tag;
}
