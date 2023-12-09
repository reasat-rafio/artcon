import type {
  DefaultDocumentNodeResolver,
  StructureBuilder,
} from 'sanity/desk';
import { FaPaintBrush, FaSitemap, FaTag } from 'react-icons/fa';
import { RiPagesLine } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';
import {
  PiProjectorScreenChartLight,
  PiUsersThreeLight,
  PiVirtualReality,
  PiVirtualRealityFill,
} from 'react-icons/pi';
import {
  FcAbout,
  FcCalendar,
  FcContacts,
  FcDocument,
  FcExport,
  FcHome,
  FcPodiumWithAudience,
  FcPortraitMode,
  FcPrivacy,
  FcRules,
  FcSearch,
  FcServices,
  FcStackOfPhotos,
  FcVideoProjector,
} from 'react-icons/fc';
import { BsFillCollectionFill, BsFillPostageFill } from 'react-icons/bs';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import type { ConfigContext } from 'sanity';
import type { IconType } from 'react-icons/lib';
import DocumentsPane from 'sanity-plugin-documents-pane';
import { VscReferences } from 'react-icons/vsc';
import { BiCameraMovie } from 'react-icons/bi';

// TODO put this in separet file
interface PageItemProps {
  schemaType: string;
  id: string;
  title: string;
  icon?: IconType;
  slug?: string;
}

const pageItem = (
  S: StructureBuilder,
  { schemaType, id, title, icon = GrEdit }: PageItemProps,
) =>
  S.documentListItem({ schemaType, id, title, icon }).child(
    S.editor()
      .schemaType(schemaType)
      .views([S.view.form().icon(icon)]),
  );

const singleItem = (
  S: StructureBuilder,
  { schemaType, id, title, icon }: PageItemProps,
) =>
  S.listItem({ schemaType, title, id, icon }).child(
    S.editor().id(id).title(title).schemaType(schemaType),
  );

export const AppStructure = (S: StructureBuilder, context: ConfigContext) =>
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
              singleItem(S, {
                schemaType: 'site.footer',
                id: 'siteFooter',
                title: 'Footer',
              }),
            ]),
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
                title: 'Exhibition Listing',
                icon: FcStackOfPhotos,
              }),
              pageItem(S, {
                schemaType: 'artistPage',
                id: 'artistPage',
                title: 'Artists Listing',
                icon: FcPortraitMode,
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
              pageItem(S, {
                schemaType: 'searchPage',
                id: 'searchPage',
                title: 'Search',
                icon: FcSearch,
              }),
              pageItem(S, {
                schemaType: 'privacyPolicyPage',
                id: 'privacyPolicyPage',
                title: 'Privacy Policy',
                icon: FcPrivacy,
              }),
              pageItem(S, {
                schemaType: 'termsConditionsPage',
                id: 'termsConditionsPage',
                title: 'Terms And Conditions',
                icon: FcRules,
              }),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Exhibition')
        .icon(FcStackOfPhotos)
        .child(
          S.list()
            .title('Exhibition')
            .items([
              orderableDocumentListDeskItem({
                type: 'exhibition',
                S,
                context,
                title: 'Exhibitions',
                icon: FcStackOfPhotos,
              }),
              orderableDocumentListDeskItem({
                type: 'exhibitionTag',
                S,
                context,
                title: 'Tags',
                icon: FaTag,
              }),
            ]),
        ),
      S.listItem()
        .title('Artist')
        .icon(FcPortraitMode)
        .child(
          S.list()
            .title('Artist')
            .items([
              S.documentTypeListItem('artist').title('Artists'),
              orderableDocumentListDeskItem({
                type: 'artistTag',
                S,
                context,
                title: 'Tags',
                icon: FaTag,
              }),
            ]),
        ),

      S.listItem()
        .title('Collections')
        .icon(FaPaintBrush)
        .child(
          S.list()
            .title('Collections')
            .items([
              orderableDocumentListDeskItem({
                type: 'collection',
                S,
                context,
                title: 'Collections',
                icon: FaPaintBrush,
              }),
              orderableDocumentListDeskItem({
                type: 'collectionTag',
                S,
                context,
                title: 'Tags',
                icon: FaTag,
              }),
            ]),
        ),

      S.listItem()
        .title('Event')
        .icon(FcCalendar)
        .child(
          S.list()
            .title('Event')
            .items([
              orderableDocumentListDeskItem({
                type: 'event',
                S,
                context,
                title: 'Events',
                icon: FcCalendar,
              }),
              orderableDocumentListDeskItem({
                type: 'eventTag',
                S,
                context,
                title: 'Tags',
                icon: FaTag,
              }),
            ]),
        ),

      S.listItem()
        .title('Projects')
        .icon(FcStackOfPhotos)
        .child(
          S.list()
            .title('Projects')
            .items([
              orderableDocumentListDeskItem({
                type: 'project',
                S,
                context,
                title: 'Projects',
                icon: FcVideoProjector,
              }),
              orderableDocumentListDeskItem({
                type: 'projectTag',
                S,
                context,
                title: 'Tags',
                icon: FaTag,
              }),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title("VR's")
        .icon(PiVirtualRealityFill)
        .child(
          S.list()
            .title("VR's")
            .items([
              orderableDocumentListDeskItem({
                type: 'vr',
                S,
                context,
                title: "VR's",
                icon: PiVirtualRealityFill,
              }),
              orderableDocumentListDeskItem({
                type: 'vrCategory',
                S,
                context,
                title: 'Category',
                icon: FaTag,
              }),
            ]),
        ),
      S.listItem()
        .title('Publications')
        .icon(BsFillPostageFill)
        .child(
          S.list()
            .title('Publications')
            .items([
              orderableDocumentListDeskItem({
                type: 'publication',
                S,
                context,
                title: 'Publications',
                icon: BsFillPostageFill,
              }),
              orderableDocumentListDeskItem({
                type: 'publicationCategory',
                S,
                context,
                title: 'Category',
                icon: FaTag,
              }),
            ]),
        ),
      S.listItem()
        .title('Documentaries')
        .icon(BiCameraMovie)
        .child(
          S.list()
            .title('Documentary')
            .items([
              orderableDocumentListDeskItem({
                type: 'documentary',
                S,
                context,
                title: 'Documentary',
                icon: BiCameraMovie,
              }),
              orderableDocumentListDeskItem({
                type: 'documentaryCategory',
                S,
                context,
                title: 'Category',
                icon: FaTag,
              }),
            ]),
        ),

      S.divider(),
      orderableDocumentListDeskItem({
        type: 'service',
        S,
        context,
        title: 'Services',
        icon: FcServices,
      }),

      S.documentTypeListItem('gallery').title('Gallery'),
      orderableDocumentListDeskItem({
        type: 'team',
        S,
        context,
        title: 'Team',
        icon: PiUsersThreeLight,
      }),
    ]);

const refDocumentsPaneSchemas = [
  'vr',
  'artist',
  'collection',
  'gallery',
  'publication',
];
export const DefaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType },
) => {
  if (refDocumentsPaneSchemas.includes(schemaType)) {
    return S.document().views([
      S.view.form(),
      S.view
        .component(DocumentsPane)
        .options({
          query: `*[!(_id in path("drafts.**")) && references($id)]`,
          params: { id: `_id` },
        })
        .icon(VscReferences)
        .title('References'),
    ]);
  }

  return S.document().views([S.view.form()]);
};
