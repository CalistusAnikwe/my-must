// import { defineType, defineField } from 'sanity';

// export default defineType({
//   name: 'hero',
//   title: 'Hero Section',
//   type: 'document',
//   fields: [
//     defineField({ name: 'headingScript', title: 'Script Heading (Meie)', type: 'string' }),
//     defineField({ name: 'subheading', title: 'Subheading', type: 'text' }),
//     defineField({ name: 'backgroundImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
//     defineField({ name: 'ctaText', title: 'Primary Button Text', type: 'string' }),
//   ],
// });

















import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({ name: 'headingScript', title: 'Script Heading (Meie)', type: 'string' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'text' }),
    defineField({ name: 'backgroundImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'ctaText', title: 'Primary Button Text', type: 'string' }),
    // New field for the Heritage section image
    defineField({ 
      name: 'heritageImage', 
      title: 'Heritage Section Image (Craftsman)', 
      type: 'image', 
      options: { hotspot: true } 
    }),
  ],
});