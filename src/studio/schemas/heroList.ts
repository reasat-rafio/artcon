import { FcHome } from 'react-icons/fc';

const heroList = {
  name: 'common.heroList',
  title: 'Hero',
  type: 'object',
  icon: FcHome,
  fields: [{ name: 'blocks', type: 'array', of: [{ type: 'common.hero' }] }],
  preview: {
    prepare: () => ({
      title: 'Hero',
    }),
  },
};

export default heroList;
