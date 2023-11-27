import aboutUs from './about-us';
import collection from './collection';
import contact from './contact';
import documentaryPage from './documentary';
import event from './event';
import eventDetails from './[event]';
import exhibition from './exhibition';
import exhibitionDetails from './[exhibition]';
import landing from './landing';
import project from './project';
import publication from './publication';
import service from './service';
import vrListingPage from './vr';
import artistDetails from './[artist]';
import privacyPolicy from './privacyPolicy';
import termsConditions from './termsConditions';
import team from './[team]';
import projectDetail from './[project]';
import collectionDetail from './[collection]';
import vr from './[vr]';
import services from './[service]';
import publicationDetail from './[publication]';
import gallery from './[gallery]';
import documentary from './[documentary]';
import searchPage from './search';

export default [
  ...landing,
  ...exhibition,
  ...event,
  ...publication,
  ...vrListingPage,
  ...collection,
  ...documentaryPage,
  ...project,
  ...service,
  ...aboutUs,
  ...contact,
  ...exhibitionDetails,
  ...eventDetails,
  ...artistDetails,
  ...projectDetail,
  ...collectionDetail,
  ...vr,
  ...publicationDetail,
  ...documentary,
  ...searchPage,
  team,
  gallery,
  services,
  privacyPolicy,
  termsConditions,
];
