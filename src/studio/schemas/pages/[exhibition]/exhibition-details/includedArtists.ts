import { FaUserShield } from 'react-icons/fa';

const includedArtists = {
  title: 'Exhibition Artist"s Section',
  name: 'exhibition.includedArtists',
  type: 'object',
  icon: FaUserShield,
  fields: [
    { type: 'boolean', name: 'placeholder', hidden: true, initialValue: true },
  ],
  preview: {
    prepare: () => ({
      title: 'Exhibition Artist"s Section',
    }),
  },
};

export default includedArtists;
