// import { defineType, defineField } from 'sanity';

// export default defineType({
//   name: 'product',
//   title: 'Product',
//   type: 'document',
//   fields: [
//     defineField({ name: 'name', title: 'Product Name', type: 'string' }),
//     defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
//     defineField({
//       name: 'category',
//       title: 'Category',
//       type: 'string',
//       options: {
//         list: [
//           { title: 'Engagement Rings', value: 'engagement-rings' },
//           { title: 'Earrings', value: 'earrings' },
//           { title: 'Bands', value: 'bands' },
//           { title: 'Necklaces', value: 'necklaces' },
//           { title: 'Bracelets', value: 'bracelets' },
//         ]
//       }
//     }),
//     defineField({ name: 'price', title: 'Price', type: 'number' }),
//     defineField({ name: 'image', title: 'Product Image', type: 'image', options: { hotspot: true } }),
//     defineField({
//       name: 'altText',
//       title: 'Alternative Text',
//       type: 'string',
//       description: 'Describe the image for SEO (e.g., "Halo Diamond Studs in 18k White Gold")'
//     }),
//     defineField({
//       name: 'metal',
//       title: 'Metal Type',
//       type: 'string',
//       options: { list: ['14k Yellow Gold', '18k White Gold', 'Platinum', '18k Rose Gold'] }
//     }),
//     defineField({
//       name: 'stoneShape',
//       title: 'Stone Shape',
//       type: 'string',
//       options: { list: ['Brilliant', 'Emerald', 'Heart', 'Oval'] }
//     }),
//     defineField({ 
//       name: 'isNewArrival', 
//       title: 'Mark as New Arrival', 
//       type: 'boolean',
//       description: 'Toggle this to show the product in the "New Arrivals" section on the Homepage'
//     }),
//   ],
// });









import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Product Name', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Engagement Rings', value: 'engagement-rings' },
          { title: 'Earrings', value: 'earrings' },
          { title: 'Bands', value: 'bands' },
          { title: 'Necklaces', value: 'necklaces' },
          { title: 'Bracelets', value: 'bracelets' },
        ]
      }
    }),
    defineField({ name: 'price', title: 'Price', type: 'number' }),
    defineField({ 
      name: 'image', 
      title: 'Product Image', 
      type: 'image', 
      options: { hotspot: true } // Hotspot helps define the focus if the container ever changes
    }),
    defineField({
      name: 'altText',
      title: 'Alternative Text',
      type: 'string',
      description: 'Describe the image for SEO (e.g., "Halo Diamond Studs in 18k White Gold")'
    }),
    defineField({
      name: 'metal',
      title: 'Metal Type',
      type: 'string',
      options: { list: ['14k Yellow Gold', '18k White Gold', 'Platinum', '18k Rose Gold'] }
    }),
    defineField({
      name: 'stoneShape',
      title: 'Stone Shape',
      type: 'string',
      options: { list: ['Brilliant', 'Emerald', 'Heart', 'Oval'] }
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'The narrative description of the jewelry piece.'
    }),
    defineField({ 
      name: 'isNewArrival', 
      title: 'Mark as New Arrival', 
      type: 'boolean',
      description: 'Toggle this to show the product in the "New Arrivals" section on the Homepage'
    }),
  ],
});