import { BsFillPostageFill } from 'react-icons/bs';

const publication = {
  title: "Publication's Publicity Materials",
  name: 'artist.publication',
  type: 'object',
  icon: BsFillPostageFill,
  fields: [
    { name: 'placeholder', type: 'boolean', hidden: true, initialValue: true },
  ],
  preview: {
    prepare: () => ({
      title: "Publication's Publicity Materials",
      subtitle: "Publication's Publicity Materials",
    }),
  },
};

export default publication;
