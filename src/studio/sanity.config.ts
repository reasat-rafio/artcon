import { defineConfig, type SchemaTypeDefinition } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { AppStructure, DefaultDocumentNode } from './deskStructure';
import { PUBLIC_SANITY_PROJECT_ID } from '$env/static/public';
import onArtistPublishUpdateTheCollection from './lib/actions/onArtistPublishUpdateTheCollection';
import onCollectionPublishUpdateTheArtist from './lib/actions/onCollectionPublishUpdateTheArtist';
import Logo from '@/studio/components/Logo';
import { media } from 'sanity-plugin-media';
import exportTool from '@/studio/components/export';

export default defineConfig([
  {
    name: 'artcon-production-workspace',
    title: 'Production ',

    projectId: PUBLIC_SANITY_PROJECT_ID,
    dataset: 'production',

    basePath: '/studio/production',

    document: {
      actions: (prev, context) => {
        switch (context.schemaType) {
          case 'artist':
            return prev.map((originalAction) => {
              switch (originalAction.action) {
                case 'publish':
                  return onArtistPublishUpdateTheCollection(
                    originalAction,
                    context,
                  );

                default:
                  return originalAction;
              }
            });
          case 'collection':
            return prev.map((originalAction) => {
              switch (originalAction.action) {
                case 'publish':
                  return onCollectionPublishUpdateTheArtist(
                    originalAction,
                    context,
                  );

                default:
                  return originalAction;
              }
            });
          default:
            return prev;
        }
      },
    },

    plugins: [
      deskTool({
        structure: AppStructure,
        defaultDocumentNode: DefaultDocumentNode,
      }),
      media(),
      visionTool(),
    ],
    schema: {
      types: schemaTypes as SchemaTypeDefinition[],
    },
    studio: { components: { logo: Logo } },
    tools: (prev) => {
      return [...prev, exportTool()];
    },
  },
  {
    name: 'artcon-production-staging',
    title: 'Staging ',

    projectId: PUBLIC_SANITY_PROJECT_ID,
    dataset: 'staging',

    basePath: '/studio/staging',

    plugins: [
      deskTool({
        structure: AppStructure,
        defaultDocumentNode: DefaultDocumentNode,
      }),
      media(),
      visionTool(),
    ],
    schema: {
      types: schemaTypes as SchemaTypeDefinition[],
    },
  },
]);

// TODO adjust this with newly modified schema structuere
// document: {
//   actions: (prev, context) => {
//     return context.schemaType === 'artist'
//       ? [...prev, ExportArtistCSV]
//       : prev;
//   },
// },
// const isExhibition = context.schemaType === 'exhibition';
// const pubOrUnpubAction =
//   originalAction.action === 'publish' ||
//   originalAction.action === 'unpublish';

// return isExhibition && pubOrUnpubAction
//   ? customExibitionAction(originalAction)
//   : originalAction;
