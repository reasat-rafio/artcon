import { defineField, defineType } from 'sanity';
import YouTubeInput from '../components/YouTubeInput';
// import YouTubePreview from '../components/YouTubePreview';
import { BsYoutube } from 'react-icons/bs';

const youtube = defineType({
  name: 'youtube',
  title: 'Youtube',
  type: 'object',
  icon: BsYoutube,
  fields: [
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      components: {
        input: YouTubeInput,
      },
    }),
    {
      name: 'thumbnail',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'caption',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'url',
      media: 'thumbnail',
    },
  },
  // components: {
  //   preview: YouTubePreview,
  // },
});

export default youtube;
