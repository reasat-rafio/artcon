// after: productionUrlPlugin.js
import { definePlugin } from 'sanity';

export const testPlugin = definePlugin({
  name: 'test',

  document: {
    productionUrl: async (prev, { document }) => {
      return prev;
    },
  },
});
