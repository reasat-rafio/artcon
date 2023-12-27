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
    ({ coverImage, name, asset, cta, subtitle, topTitle }) => {
      return {
        _type: 'common.hero',
        _key: '',
        asset: coverImage ? { image: coverImage } : asset,
        title: name,
        subtitle,
        topTitle,
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
        topTitle: category.name,
        subtitle,
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
    ({ asset, name, startDate, endDate, topTitle, slug, subtitle }) => {
      const { date, status: exhibitionStatus } = calculateStatusBetweenDates({
        startDate,
        endDate,
      });

      const _topTitle =
        topTitle || (exhibitionStatus !== 'Ongoing' ? date : exhibitionStatus);

      // TODO check the type and subtitle
      return {
        _type: 'common.hero',
        _key: '',
        asset,
        title: name,
        topTitle: _topTitle,
        // type: tag.name,
        subtitle,
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
        topTitle: 'Documentary',
        title: name,
        subtitle: category.name,
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
    ({ asset, name, topTitle, subtitle, cta, startDate, endDate, tag }) => {
      const { date, status } = calculateStatusBetweenDates({
        startDate,
        endDate,
      });

      const _topTitle = topTitle || (status !== 'Ongoing' ? date : status);

      return {
        _type: 'common.hero',
        _key: '',
        asset,
        title: name,
        topTitle: _topTitle,
        subtitle: subtitle || tag?.name,
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
    ({ asset, name, topTitle, subtitle, artist, cta }) => {
      return {
        _type: 'common.hero',
        _key: '',
        asset,
        subtitle,
        title: artist?.name || name,
        topTitle,
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
    ({ asset, name, startDate, endDate, type, subtitle, slug, topTitle }) => {
      const { date, status } = calculateStatusBetweenDates({
        startDate,
        endDate,
      });

      const _topTitle = topTitle || (status !== 'Ongoing' ? date : status);
      const _type = typeof type === 'string' ? type : type?.name;
      const _subtitle = subtitle || _type;

      return {
        _type: 'common.hero',
        _key: '',
        asset,
        title: name,
        subtitle: _subtitle,
        topTitle: _topTitle,

        cta: { title: 'EXPLORE', href: `/exhibition/${slug.current}` },
      };
    },
  );

  return {
    blocks: formattedProps,
  };
};
