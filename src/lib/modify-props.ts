import { calculateStatusBetweenDates } from './helper';
import type { HeroProps as ArtistListingHeroProps } from './types/artist.types';
import type { HeroProps as CollectionListingHeroProps } from './types/collection.types';
import type {
  CommonHeroListProps,
  CommonHeroProps,
} from './types/common.types';
import type { HeroProps as DocumentaryListingHeroProps } from './types/documentary.types';
import type { HeroProps as EventListingHeroProps } from './types/event.types';
import type { HeroProps as ExhibitionListingHeroProps } from './types/exhibition.types';
import type { HeroProps as ProjectListingHeroProps } from './types/project.types';
import type { HeroProps as PublicationListingHeroProps } from './types/publication.types';
import type { HeroProps as VrListingHeroProps } from './types/vr.types';

export const formatArtistListingProps = (
  props: ArtistListingHeroProps,
): CommonHeroListProps => {
  const formattedProps: CommonHeroProps[] = props.highlightedArtists.map(
    ({ coverImage, name, asset, cta, type, text }) => {
      return {
        _type: 'common.hero',
        _key: '',
        asset: coverImage ? { image: coverImage } : asset,
        title: name,
        text,
        type,
        cta,
      };
    },
  );
  return {
    blocks: formattedProps,
  };
};

export const formatPublicationListingProps = (
  props: PublicationListingHeroProps,
): CommonHeroListProps => {
  const formattedProps: CommonHeroProps[] = props.highlightedPublication.map(
    ({ coverImage, name, subtitle, slug, category }) => {
      return {
        _type: 'common.hero',
        _key: '',
        asset: { image: coverImage },
        title: name,
        text: subtitle,
        type: category.name,
        cta: { title: 'EXPLORE', href: `/preview/publication/${slug.current}` },
      };
    },
  );
  return {
    blocks: formattedProps,
  };
};

export const formatVrListingProps = (
  props: VrListingHeroProps,
): CommonHeroListProps => {
  const formattedProps: CommonHeroProps[] = props.highlightedVr.map(
    ({ coverImage, name, subtitle, slug, category }) => {
      return {
        _type: 'common.hero',
        _key: '',
        asset: { image: coverImage },
        title: name,
        text: subtitle,
        type: category.name,
        cta: { title: 'EXPLORE', href: `/preview/vr/${slug.current}` },
      };
    },
  );
  return {
    blocks: formattedProps,
  };
};

export const formatProjectListingProps = (
  props: ProjectListingHeroProps,
): CommonHeroListProps => {
  const formattedProps: CommonHeroProps[] = props.highlightedProjects.map(
    ({ asset, name, startDate, endDate, status, slug, tag }) => {
      const { date, status: exhibitionStatus } = calculateStatusBetweenDates({
        startDate,
        endDate,
      });

      const heroText =
        status || (exhibitionStatus !== 'Ongoing' ? date : exhibitionStatus);

      return {
        _type: 'common.hero',
        _key: '',
        asset,
        title: name,
        text: heroText,
        type: tag.name,
        cta: { title: 'EXPLORE', href: `/project/${slug.current}` },
      };
    },
  );

  return {
    blocks: formattedProps,
  };
};

export const formatDocumentaryListingProps = (
  props: DocumentaryListingHeroProps,
) => {
  const formattedProps: CommonHeroProps[] = props.highlightedDocumentaries.map(
    ({ name, category, coverImage, slug }) => {
      return {
        _type: 'common.hero',
        _key: '',
        asset: { image: coverImage },
        type: 'Documentary',
        title: name,
        text: category.name,
        cta: { title: 'Explore', href: `/preview/documentary/${slug.current}` },
      };
    },
  );

  return {
    blocks: formattedProps,
  };
};

export const formatEventListingProps = (
  props: EventListingHeroProps,
): CommonHeroListProps => {
  const formattedProps: CommonHeroProps[] = props.highlightedEvents.map(
    ({ asset, name, status, type, cta, startDate, endDate }) => {
      const { date, status: eventStatus } = calculateStatusBetweenDates({
        startDate,
        endDate,
      });

      const heroText =
        status || (eventStatus !== 'Ongoing' ? date : eventStatus);

      return {
        _type: 'common.hero',
        _key: '',
        asset,
        type,
        title: name,
        text: heroText,
        cta,
      };
    },
  );

  return {
    blocks: formattedProps,
  };
};

export const formatCollectionListingProps = (
  props: CollectionListingHeroProps,
): CommonHeroListProps => {
  const formattedProps: CommonHeroProps[] = props.highlightedCollections.map(
    ({ asset, name, status, type, artist, cta }) => {
      return {
        _type: 'common.hero',
        _key: '',
        asset,
        type,
        title: artist?.name || name,
        text: status,
        cta,
      };
    },
  );
  return {
    blocks: formattedProps,
  };
};

export const formatExhibitionListingProps = (
  props: ExhibitionListingHeroProps,
): CommonHeroListProps => {
  const formattedProps: CommonHeroProps[] = props.highlightedExhibition.map(
    ({ asset, name, startDate, endDate, status, type, subtitle, slug }) => {
      const { date, status: exhibitionStatus } = calculateStatusBetweenDates({
        startDate,
        endDate,
      });

      const heroText =
        status || (exhibitionStatus !== 'Ongoing' ? date : exhibitionStatus);

      const s_title = typeof subtitle === 'string' ? subtitle : subtitle.name;
      const heroType = type || s_title;

      return {
        _type: 'common.hero',
        _key: '',
        asset,
        title: name,
        text: heroText,
        type: heroType,
        cta: { title: 'EXPLORE', href: `/exhibition/${slug.current}` },
      };
    },
  );

  return {
    blocks: formattedProps,
  };
};
