import { BsFillPostageFill } from 'react-icons/bs';

const publications = {
  title: 'Publications Section',
  name: 'collection.publications',
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

export default publications;
