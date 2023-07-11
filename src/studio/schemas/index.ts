import menuItems from './menuItem';
import pages from './pages';
import seo from './seo';
import site from './site';

export const schemaTypes = [...site, ...pages, seo, menuItems];
