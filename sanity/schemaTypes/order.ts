// // sanity/schemaTypes/order.ts
// import { defineType, defineField } from 'sanity';

// export default defineType({
//   name: 'order',
//   title: 'Orders',
//   type: 'document',
//   fields: [
//     defineField({ name: 'customerName', type: 'string' }),
//     defineField({ name: 'email', type: 'string' }),
//     defineField({ name: 'address', type: 'string' }),
//     defineField({ name: 'amount', type: 'number' }),
//     defineField({ name: 'status', type: 'string', initialValue: 'pending' }),
//     defineField({
//       name: 'items',
//       type: 'array',
//       of: [{ type: 'object', fields: [
//         { name: 'name', type: 'string' },
//         { name: 'price', type: 'number' },
//         { name: 'quantity', type: 'number' }
//       ]}]
//     }),
//   ],
// });
















// sanity/schemaTypes/order.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'order',
  title: 'Orders',
  type: 'document',
  fields: [
    defineField({ 
      name: 'customerName', 
      title: 'Customer Name',
      type: 'string' 
    }),
    defineField({ 
      name: 'email', 
      title: 'Email Address',
      type: 'string' 
    }),
    defineField({ 
      name: 'address', 
      title: 'Shipping Address',
      type: 'string' 
    }),
    defineField({ 
      name: 'amount', 
      title: 'Total Amount',
      type: 'number' 
    }),
    defineField({ 
      name: 'reference', 
      title: 'Payment Reference (Paystack)',
      type: 'string' 
    }),
    defineField({ 
      name: 'status', 
      title: 'Order Status',
      type: 'string', 
      initialValue: 'In Progress',
      options: {
        list: [
          { title: 'In Progress', value: 'In Progress' },
          { title: 'Shipped', value: 'Shipped' },
          { title: 'Delivered', value: 'Delivered' },
          { title: 'Cancelled', value: 'Cancelled' },
        ],
      },
    }),
    defineField({ 
      name: 'trackingNumber', 
      title: 'Tracking Number',
      type: 'string',
      description: 'The courier tracking number (e.g., FEDEX-9921-884-21)'
    }),
    defineField({
      name: 'items',
      title: 'Purchased Items',
      type: 'array',
      of: [{ 
        type: 'object', 
        fields: [
          { name: 'name', type: 'string' },
          { name: 'price', type: 'number' },
          { name: 'quantity', type: 'number' },
          { name: 'image', type: 'image', options: { hotspot: true } }
        ]
      }]
    }),
    defineField({
      name: 'createdAt',
      title: 'Order Date',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
    }),
  ],
});