import type { StructureBuilder } from 'sanity/desk';
import { FaSitemap } from 'react-icons/fa';
import { RiPagesLine } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';
import { PiProjectorScreenChartLight, PiVirtualReality } from 'react-icons/pi';
import {
  FcAbout,
  FcCalendar,
  FcContacts,
  FcDocument,
  FcExport,
  FcHome,
  FcPodiumWithAudience,
  FcServices,
  FcStackOfPhotos,
} from 'react-icons/fc';
import { BsFillCollectionFill } from 'react-icons/bs';

// TODO put this in separet file
interface PageItemProps {
  schemaType: string;
  id: string;
  title: string;
  icon?: any;
  slug?: string;
}

const pageItem = (
  S: StructureBuilder,
  { schemaType, id, title, icon = GrEdit }: PageItemProps
) =>
  S.documentListItem({ schemaType, id, title, icon }).child(
    S.editor()
      .schemaType(schemaType)
      .views([S.view.form().icon(icon)])
  );

const singleItem = (
  S: StructureBuilder,
  { schemaType, id, title, icon }: PageItemProps
) =>
  S.listItem({ schemaType, title, id, icon }).child(
    S.editor().id(id).title(title).schemaType(schemaType)
  );

export const AppStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .id('__root__')
    .items([
      S.listItem()
        .title('Site')
        .icon(FaSitemap)
        .child(
          S.list()
            .title('Site')
            .items([
              singleItem(S, {
                schemaType: 'site.logos',
                id: 'siteLogos',
                title: 'Logos',
              }),
              singleItem(S, {
                schemaType: 'site.nav',
                id: 'siteNav',
                title: 'Navigation',
              }),
              singleItem(S, {
                schemaType: 'site.contact',
                id: 'siteContacs',
                title: 'Contacts',
              }),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Pages')
        .icon(RiPagesLine)
        .child(
          S.list()
            .title('Pages')
            .items([
              pageItem(S, {
                schemaType: 'landingPage',
                id: 'landingPage',
                title: 'Landing',
                icon: FcHome,
              }),
              pageItem(S, {
                schemaType: 'exhibitionPage',
                id: 'exhibitionPage',
                title: 'Exhibition',
                icon: FcStackOfPhotos,
              }),
              pageItem(S, {
                schemaType: 'eventPage',
                id: 'eventPage',
                title: 'Event',
                icon: FcPodiumWithAudience,
              }),
              pageItem(S, {
                schemaType: 'publicationPage',
                id: 'publicationPage',
                title: 'Publication',
                icon: FcExport,
              }),
              pageItem(S, {
                schemaType: 'vrPage',
                id: 'vrPage',
                title: 'VR',
                icon: PiVirtualReality,
              }),
              pageItem(S, {
                schemaType: 'collectionPage',
                id: 'collectionPage',
                title: 'Collection',
                icon: BsFillCollectionFill,
              }),
              pageItem(S, {
                schemaType: 'documentaryPage',
                id: 'documentaryPage',
                title: 'Documentary',
                icon: FcDocument,
              }),
              pageItem(S, {
                schemaType: 'projectPage',
                id: 'projectPage',
                title: 'Project',
                icon: PiProjectorScreenChartLight,
              }),
              pageItem(S, {
                schemaType: 'servicePage',
                id: 'servicePage',
                title: 'Service',
                icon: FcServices,
              }),
              pageItem(S, {
                schemaType: 'aboutUsPage',
                id: 'aboutUsPage',
                title: 'About Us',
                icon: FcAbout,
              }),
              pageItem(S, {
                schemaType: 'contactPage',
                id: 'contactPage',
                title: 'Contact',
                icon: FcContacts,
              }),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Exhibition')
        .icon(FcStackOfPhotos)
        .child(
          S.list()
            .title('Exhibition')
            .items([
              S.documentTypeListItem('exhibition').title('Exhibitions'),
              S.documentTypeListItem('exhibitionTag').title('Tags'),
            ])
        ),
      S.listItem()
        .title('Event')
        .icon(FcCalendar)
        .child(
          S.list()
            .title('Event')
            .items([
              S.documentTypeListItem('event').title('Events'),
              S.documentTypeListItem('eventTag').title('Tags'),
            ])
        ),
    ]);
