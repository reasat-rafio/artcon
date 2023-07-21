import type { StructureBuilder } from 'sanity/desk';
import { FaHome, FaSitemap } from 'react-icons/fa';
import { RiPagesLine } from 'react-icons/ri';
import { GrEdit, GrView } from 'react-icons/gr';
import {
  FcBookmark,
  FcExport,
  FcHome,
  FcPodiumWithAudience,
} from 'react-icons/fc';

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
                icon: FcBookmark,
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
            ])
        ),
    ]);
