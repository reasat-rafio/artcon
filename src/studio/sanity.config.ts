import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { AppStructure } from './deskStucture';

export default defineConfig([
  {
    name: 'artcon-production-workspace',
    title: 'Production ',

    projectId: 'fjt1fjyt',
    dataset: 'production',

    basePath: '/studio/production',

    plugins: [deskTool({ structure: AppStructure }), visionTool()],
    schema: {
      types: schemaTypes
    }
  },
  {
    name: 'artcon-production-staging',
    title: 'Staging ',

    projectId: 'fjt1fjyt',
    dataset: 'production',

    basePath: '/studio/staging',

    plugins: [deskTool({ structure: AppStructure }), visionTool()],
    schema: {
      types: schemaTypes
    }
  }
]);
