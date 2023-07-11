import type { ConfigContext } from 'sanity';
import type { StructureBuilder } from 'sanity/desk';
import { FaSitemap } from 'react-icons/fa';

// TODO put this in separet file
interface PageItemProps {
  schemaType: string;
  id: string;
  title: string;
  icon?: any;
  slug?: string;
}

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
                title: 'Logos'
              }),
              singleItem(S, {
                schemaType: 'site.nav',
                id: 'siteNav',
                title: 'Navigation'
              })
            ])
        )
    ]);
