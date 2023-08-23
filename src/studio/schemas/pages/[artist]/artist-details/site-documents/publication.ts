import { BsFillPostageFill } from 'react-icons/bs';

const publication = {
  title: 'Publication Section',
  name: 'artist.publication',
  type: 'object',
  icon: BsFillPostageFill,
  fields: [
    { name: 'placeholder', type: 'boolean', hidden: true, initialValue: true },
  ],
  preview: {
    prepare: () => ({
      title: 'Publications Section',
    }),
  },
};

export default publication;
