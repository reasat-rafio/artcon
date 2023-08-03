import { FcStackOfPhotos } from 'react-icons/fc';

const exhibitions = {
  title: 'Exhibitions',
  name: 'artist.exhibitions',
  icon: FcStackOfPhotos,
  type: 'object',
  fields: [
    {
      name: 'exhibitions',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'exhibition' }],
        },
      ],
    },
  ],
  preview: {
    prepare: () => ({
      title: 'Exhibitions',
    }),
  },
};

export default exhibitions;
