export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1424,
};

export type Breakpoints = keyof typeof breakpoints;
export const darkNavPaths = [
  '/privacy-policy',
  '/terms-and-conditions',
  '/search',
];
export const pages = [
  '/',
  '/about-us',
  '/artist',
  '/audio-visual',
  '/collection',
  '/contact',
  '/event',
  '/exhibition',
  '/privacy-policy',
  '/project',
  '/publication',
  '/services',
  '/terms-and-conditions',
  '/vr',
];

export const pagesWithOutSlash = removeSlashFromArray(pages);
function removeSlashFromArray(arr: string[]) {
  return arr
    .map((item) => item.replace(/^\//, ''))
    .filter((item) => item !== '');
}

export const collectionDropdownOptions = [
  { name: 'Available', value: 'available' },
  { name: 'Artist Name', value: 'artist-name' },
  { name: 'Media', value: 'media' },
  { name: 'Year', value: 'year' },
] as const;
