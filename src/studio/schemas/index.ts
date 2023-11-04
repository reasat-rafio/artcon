import cta from './cta';
import menuItem from './menuItem';
import pages from './pages';
import seo from './seo';
import site from './site';
import portableText from './portableText';
import commonHero from './hero';
import commonHeroList from './heroList';
import commonImageAsset from './imageAsset';
import quote from './quote';
import social from './social';
import asset from './asset';
import keyValuePairs from './keyValuePairs';
import note from './note';
import commonArtwork from './artwork';
import sliderImageVideo from './sliderImageVideo';

export const schemaTypes = [
  ...site,
  ...pages,
  seo,
  menuItem,
  cta,
  quote,
  asset,
  social,
  note,
  portableText,
  commonHero,
  commonArtwork,
  commonHeroList,
  commonImageAsset,
  keyValuePairs,
  sliderImageVideo,
];
