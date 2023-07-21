import cta from './cta';
import menuItem from './menuItem';
import pages from './pages';
import seo from './seo';
import site from './site';
import portableText from './portableText';
import commonHero from './hero';

export const schemaTypes = [
  ...site,
  ...pages,
  seo,
  menuItem,
  cta,
  portableText,
  commonHero,
];
