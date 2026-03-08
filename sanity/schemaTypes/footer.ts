import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'brandDescription',
      title: 'Brand Description',
      type: 'text',
      initialValue: 'Crafting brilliance for a century. We specialize in the world\'s most exquisite certified diamonds.',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      initialValue: '© 2026 LUXE DIAMOND LTD. ALL RIGHTS RESERVED.',
    }),
    // ADDED: Field for Login/Signup configuration in Footer
    defineField({
      name: 'loginLink',
      title: 'Login/Signup Link',
      type: 'object',
      fields: [
        { name: 'label', title: 'Label', type: 'string', initialValue: 'Sign In / Register' },
        { name: 'href', title: 'URL Path', type: 'string', initialValue: '/login' },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', title: 'Platform' },
            { name: 'url', type: 'url', title: 'URL' },
          ],
        },
      ],
    }),
  ],
});