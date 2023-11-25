import { DateTime } from 'luxon';
import type {
  ArtistsProps,
  SoloExhibitonProps,
} from './types/exhibition-detail.types';

import type { CommonImageAsset, Type } from './types/common.types';

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
    const formattedEndDate = isoEndDate.toFormat('d MMM, yyyy');
    const formattedStartDate = areSameMonthAndYear(isoStartDate, isoEndDate)
      ? isoStartDate.toFormat('d')
      : isoStartDate.toFormat('d MMM');

    date = `${formattedStartDate} - ${formattedEndDate}`;

    if (isoStartDate <= currentDateTime && isoEndDate >= currentDateTime) {
      status = 'Ongoing';
    } else if (isoStartDate > currentDateTime) {
      status = 'Upcoming';
    } else {
      status = 'Ended';
    }
  } else {
    const formattedDate = isoStartDate.toFormat('d MMM, yyyy');
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
