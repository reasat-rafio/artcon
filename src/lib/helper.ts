import { DateTime } from 'luxon';
import type {
  ArtistsProps,
  SoloExhibitonProps,
} from './types/exhibitionDetail.types';

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
  let status: 'Ongoing' | 'Upcoming' | 'Completed';
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
      status = 'Completed';
    }
  } else {
    const formattedDate = isoStartDate.toFormat('d MMMM, yyyy');
    date = formattedDate;

    if (isoStartDate.hasSame(currentDateTime, 'day')) {
      status = 'Ongoing';
    } else if (isoStartDate > currentDateTime) {
      status = 'Upcoming';
    } else {
      status = 'Completed';
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
