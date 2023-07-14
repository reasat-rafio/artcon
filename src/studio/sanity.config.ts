import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { AppStructure } from './deskStucture';
import { PUBLIC_SANITY_PROJECT_ID } from '$env/static/public';

export default defineConfig([
	{
		name: 'artcon-production-workspace',
		title: 'Production ',

		projectId: PUBLIC_SANITY_PROJECT_ID,
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

		projectId: PUBLIC_SANITY_PROJECT_ID,
		dataset: 'staging',

		basePath: '/studio/staging',

		plugins: [deskTool({ structure: AppStructure }), visionTool()],
		schema: {
			types: schemaTypes
		}
	}
]);
