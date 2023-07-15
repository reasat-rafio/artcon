import {
  defineType,
  defineArrayMember,
  type BlockDecoratorProps,
} from 'sanity';
import { ImList2, ImFontSize } from 'react-icons/im';
import { MdOutlineHighlight } from 'react-icons/md';
import { BsFileBreak } from 'react-icons/bs';
import type { Rule } from 'sanity';
import React from 'react';

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

const HighlightDecorator = (props: BlockDecoratorProps) => (
  <span className="text-theme-primary">{props.children}</span>
);

const portableText = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'H5', value: 'h5' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        {
          title: 'Primary Bullet',
          value: 'primaryBullet',
          icon: ImList2,
          //TODO add studio preview
          // component: Component,
        },
        { title: 'Number', value: 'number' },
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Underline', value: 'underline' },
          {
            title: 'Highlight',
            value: 'highlight',
            icon: MdOutlineHighlight,
            component: HighlightDecorator,
          },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'string',
              },
              {
                title: 'Hover Effect',
                name: 'hoverEffect',
                type: 'boolean',
              },
              {
                title: 'Highlight',
                name: 'highlight',
                type: 'boolean',
                description:
                  'Enabling this will make the link text primary color.',
              },
            ],
          },
          {
            title: 'Styled',
            name: 'styled',
            type: 'object',
            icon: ImFontSize,
            fields: [
              {
                name: 'paddingLeft',
                type: 'number',
                title: 'Padding Left',
                description: 'Padding Left',
                initialValue: 30,
              },
            ],
          },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
      name: 'image',
      type: 'image',
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          name: 'title',
          type: 'string',
          title: 'Title',
        },
        {
          name: 'description',
          type: 'blockContent',
          title: 'Description',
        },
      ],
    }),
    defineArrayMember({
      name: 'break',
      type: 'object',
      title: 'Break',
      fields: [
        {
          name: 'style',
          type: 'string',
          options: {
            list: ['Thematic break'],
          },
        },
      ],
      preview: {
        prepare() {
          return {
            title: 'Thematic break',
            media: BsFileBreak,
          };
        },
      },
    }),
  ],
});

export default portableText;
