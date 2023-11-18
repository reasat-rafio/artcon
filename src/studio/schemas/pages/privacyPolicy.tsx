import type { Rule } from 'sanity';
import React from 'react';
import { TbHighlight } from 'react-icons/tb';

const privacyPolicy = {
  name: 'privacyPolicyPage',
  title: 'Privacy Policy',
  type: 'document',
  fields: [
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
    {
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'privacyPolicy',
      type: 'array',
      of: [
        {
          type: 'block',
          lists: [],
          styles: [],
          marks: {
            decorators: [
              {
                title: 'Header',
                value: 'header',
                blockEditor: {
                  icon: () => <TbHighlight />,
                  render: ({ children }: { children: React.ReactNode }) => (
                    <p
                      style={{
                        fontSize: 18,
                        display: 'inline',
                        fontWeight: 700,
                      }}>
                      {children}
                    </p>
                  ),
                },
              },
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Button',
      name: 'cta',
      type: 'cta',
    },
  ],
  preview: {
    select: {
      title: 'seo.title',
      subtitle: 'seo.description',
    },
  },
};

export default privacyPolicy;
