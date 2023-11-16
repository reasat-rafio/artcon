import { FaUserShield } from 'react-icons/fa';

const artist = {
  title: 'Artist Section',
  name: 'collection.artist',
  type: 'object',
  icon: FaUserShield,
  fields: [
    { name: 'placeholder', type: 'boolean', hidden: true, initialValue: true },
  ],
  preview: {
    prepare: () => ({
      title: 'Artist Section',
      subtitle: 'Artist Section',
    }),
  },
};

export default artist;
