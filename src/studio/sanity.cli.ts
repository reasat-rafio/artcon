import { defineCliConfig } from 'sanity/cli';
import {
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
} from '$env/static/public';

export default defineCliConfig({
  api: {
    projectId: 'fjt1fjyt',
    dataset: 'production',
  },
});
