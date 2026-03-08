import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'navbar',
  title: 'Navigation Bar',
  type: 'document',
  fields: [
    defineField({
      name: 'logoText',
      title: 'Logo Text',
      type: 'string',
      initialValue: 'LUXE DIAMOND',
    }),
    defineField({
      name: 'links',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'href', title: 'URL Path', type: 'string' },
          ],
        },
      ],
    }),
    // ADDED: Field for Login/Signup configuration
    defineField({
      name: 'loginLink',
      title: 'Login/Signup Link',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string', initialValue: 'Login' },
        { name: 'href', title: 'URL Path', type: 'string', initialValue: '/login' },
      ],
    }),
    defineField({
      name: 'profileLinks',
      title: 'User Profile & History Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'href', title: 'URL Path', type: 'string' },
          ],
        },
      ],
    }),
  ],
});