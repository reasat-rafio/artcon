import { DateTime } from 'luxon';
import type {
  ArtistsProps,
  SoloExhibitonProps,
} from './types/exhibition-detail.types';
import type { HeroProps as ExhibitionListingHeroProps } from './types/exhibition.types';
import type { HeroProps as VrListingHeroProps } from './types/vr.types';
import type { HeroProps as PublicationListingHeroProps } from './types/publication.types';
import type { HeroProps as ProjectListingHeroProps } from './types/project.types';
import type { HeroProps as CollectionListingHeroProps } from './types/collection.types';

import type {
  CommonHeroListProps,
  CommonHeroProps,
  CommonImageAsset,
  Type,
} from './types/common.types';

export function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
}

let lastScrollTime = 0;
export function useDebounce(callback: () => void, cooldownDuration: number) {
  const currentTime = Date.now();
  if (currentTime - lastScrollTime > cooldownDuration) {
    callback();
    lastScrollTime = currentTime;
  }
}

export const zeroPad = (num: number) => {
  return num.toLocaleString().padStart(2, '0');
};

function areSameMonthAndYear(date1: DateTime, date2: DateTime) {
  return date1.month === date2.month && date1.year === date2.year;
}
export const calculateStatusBetweenDates = ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate?: string;
}) => {
  const currentDateTime = DateTime.now();
  let status: 'Ongoing' | 'Upcoming' | 'Ended';
  let date: string;

  const isoStartDate = DateTime.fromISO(startDate);
  const isoEndDate = endDate ? DateTime.fromISO(endDate) : null;

  if (isoEndDate) {
    const formattedEndDate = isoEndDate.toFormat('d MMMM, yyyy');
    const formattedStartDate = areSameMonthAndYear(isoStartDate, isoEndDate)
      ? isoStartDate.toFormat('d')
      : isoStartDate.toFormat('d MMMM');

    date = `${formattedStartDate} - ${formattedEndDate}`;

    if (isoStartDate <= currentDateTime && isoEndDate >= currentDateTime) {
      status = 'Ongoing';
    } else if (isoStartDate > currentDateTime) {
      status = 'Upcoming';
    } else {
      status = 'Ended';
    }
  } else {
    const formattedDate = isoStartDate.toFormat('d MMMM, yyyy');
    date = formattedDate;

    if (isoStartDate.hasSame(currentDateTime, 'day')) {
      status = 'Ongoing';
    } else if (isoStartDate > currentDateTime) {
      status = 'Upcoming';
    } else {
      status = 'Ended';
    }
  }

  return { status, date };
};

export const isSoloExhibition = (
  artist: ArtistsProps,
): artist is SoloExhibitonProps => 'data' in artist;

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export function debounce<T extends unknown[], U>(
  callback: (...args: T) => PromiseLike<U> | U,
  wait: number,
) {
  let timer: NodeJS.Timeout;

  return (...args: T): Promise<U> => {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(() => resolve(callback(...args)), wait);
    });
  };
}

export const formatPublicationListingProps = (
  props: PublicationListingHeroProps,
): CommonHeroListProps => {
  const formatedProps: CommonHeroProps[] = props.highlightedPublication.map(
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
    blocks: formatedProps,
  };
};

export const formatVrListingProps = (
  props: VrListingHeroProps,
): CommonHeroListProps => {
  const formatedProps: CommonHeroProps[] = props.highlightedVr.map(
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
    blocks: formatedProps,
  };
};

export const formatProjectListingProps = (
  props: ProjectListingHeroProps,
): CommonHeroListProps => {
  const formatedProps: CommonHeroProps[] = props.highlightedProjects.map(
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
    blocks: formatedProps,
  };
};

export const formatCollectionListingProps = (
  props: CollectionListingHeroProps,
): CommonHeroListProps => {
  const formatedProps: CommonHeroProps[] = props.highlightedCollections.map(
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
    blocks: formatedProps,
  };
};

export const formatExhibitionListingProps = (
  props: ExhibitionListingHeroProps,
): CommonHeroListProps => {
  const formatedProps: CommonHeroProps[] = props.highlightedExhibition.map(
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
    blocks: formatedProps,
  };
};

export type FormattedItem<T> = {
  items: T[];
  image?: CommonImageAsset;
};

export const createListingItemWithImage = <T>(
  items: T[],
  imges: CommonImageAsset[],
  chunkSize: number = 6,
) => {
  const formatedArray: FormattedItem<T>[] = [];

  for (let i = 0; i < items.length; i += chunkSize) {
    const chunkOfItem = items.slice(i, i + chunkSize);

    if (i + chunkSize >= items.length) {
      formatedArray.push({ items: chunkOfItem });
    } else {
      const chunkOfImage = imges[i / chunkSize];
      if (chunkOfImage !== undefined) {
        formatedArray.push({ items: chunkOfItem, image: chunkOfImage });
      } else {
        formatedArray.push({ items: chunkOfItem });
      }
    }
  }

  return formatedArray;
};

export const getSocialIconPath = (type: Type) => {
  switch (type) {
    case 'facebook':
      return 'facebook.svg';
    case 'instagram':
      return 'instagram.svg';
    case 'mail':
      return 'mail.svg';
    case 'phone':
      return 'phone.svg';
    case 'whatsapp':
      return 'whatsapp.svg';
    case 'youtube':
      return 'youtube.svg';
    default:
      return null;
  }
};

export function getCountryDetails(country: string) {
  const [code, name] = country.split('-');
  return { code: code, name: name };
}
