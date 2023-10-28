import { BsFillPostageFill } from 'react-icons/bs';

const publication = {
  title: 'Publicity Materials',
  name: 'artist.publication',
  type: 'object',
  icon: BsFillPostageFill,
  fields: [
    { name: 'placeholder', type: 'boolean', hidden: true, initialValue: true },
  ],
  preview: {
    prepare: () => ({
      title: 'Publicity Materials',
    }),
  },
};

export default publication;
