import { defineConfig, type SchemaTypeDefinition } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { AppStructure, DefaultDocumentNode } from './deskStucture';
import { PUBLIC_SANITY_PROJECT_ID } from '$env/static/public';
// import { ExportArtistCSV } from './lib/actions/artist/exportCSV';

// import { testPlugin } from './custom-plugins/test';

export default defineConfig([
  {
    name: 'artcon-production-workspace',
    title: 'Production ',

    projectId: PUBLIC_SANITY_PROJECT_ID,
    dataset: 'production',

    basePath: '/studio/production',

    // TODO adjust this with newly modified schema structuere
    // document: {
    //   actions: (prev, context) => {
    //     return context.schemaType === 'artist'
    //       ? [...prev, ExportArtistCSV]
    //       : prev;
    //   },
    // },

    plugins: [
      deskTool({
        structure: AppStructure,
        defaultDocumentNode: DefaultDocumentNode,
      }),
      visionTool(),
    ],
    schema: {
      types: schemaTypes as SchemaTypeDefinition[],
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
      visionTool(),
    ],
    schema: {
      types: schemaTypes as SchemaTypeDefinition[],
    },
  },
]);
