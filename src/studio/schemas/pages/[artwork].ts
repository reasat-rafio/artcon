import { PiPaintBucketFill } from 'react-icons/pi';

const artwork = {
  name: 'artwork',
  type: 'document',
  icon: PiPaintBucketFill,
  fields: [
    { name: 'name', type: 'string' },
    { name: 'description', type: 'text' },
    { name: 'images', type: 'array', of: [{ type: 'image' }] },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'images[0]',
    },
  },
};

export default artwork;
