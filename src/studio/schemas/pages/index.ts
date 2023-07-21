import aboutUs from './about-us';
import collection from './collection';
import contact from './contact';
import documentary from './documentary';
import event from './event';
import eventDetails from './[event]';
import exhibition from './exhibition';
import exhibitionDetails from './[exhibition]';
import landing from './landing';
import project from './project';
import publication from './publication';
import service from './service';
import vr from './vr';

export default [
  ...landing,
  ...exhibition,
  ...event,
  ...publication,
  ...vr,
  ...collection,
  ...documentary,
  ...project,
  ...service,
  ...aboutUs,
  ...contact,
  ...exhibitionDetails,
  ...eventDetails,
];
