import { FcInfo } from 'react-icons/fc';
import type { Rule } from 'sanity';

const createDescriptionBlock = ({
  name,
  fields,
}: {
  fields: unknown[];
  name?: string;
}) => {
  return {
    name: name ?? 'descriptionBlock',
    type: 'object',
    icon: FcInfo,
    validation: (Rule: Rule) => Rule.required(),
    fields: [
      ...fields,
      {
        name: 'description',
        type: 'array',
        of: [{ type: 'block' }],
        validation: (Rule: Rule) => Rule.required(),
      },
    ],
  };
};

export default createDescriptionBlock;
