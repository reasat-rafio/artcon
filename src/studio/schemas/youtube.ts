import { defineField, defineType } from 'sanity';
import YouTubePreview from '../components/YouTubePreview';

const youtube = defineType({
  name: 'youtube',
  title: 'Youtube',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      components: {
        input: YouTubePreview,
      },
    }),
  ],
  preview: {
    select: {
      url: 'url',
    },
  },
});

export default youtube;
