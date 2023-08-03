import { FcInfo } from 'react-icons/fc';
import type { Rule } from 'sanity';

const createDescriptionBlock = (props: unknown[]) => {
  return {
    name: 'descriptionBlock',
    type: 'object',
    icon: FcInfo,
    validation: (Rule: Rule) => Rule.required(),
    fields: [
      ...props,
      {
        name: 'description',
        type: 'text',
        validation: (Rule: Rule) => Rule.required(),
      },
    ],
  };
};

export default createDescriptionBlock;
