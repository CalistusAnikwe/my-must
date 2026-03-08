// import { createClient } from 'next-sanity';

// export const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
//   apiVersion: '2024-02-28', 
//   useCdn: false, // Must stay 'false' for writing data (orders)
//   // ADDED: This token allows the project to create "Order" documents
//   token: process.env.SANITY_API_WRITE_TOKEN, 
// });










import { createClient } from 'next-sanity';

// 1. Define the configuration separately
const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-02-28',
  /* useCdn: false is necessary because you are handling 
     User Signups and Orders. The CDN would delay those updates.
  */
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
};

// 2. Create the client
export const client = createClient(config);

/**
 * BEST PRACTICE: Custom Fetch Wrapper
 * Instead of forcing a fetch override into the config (which causes TS errors),
 * we use this pattern to ensure stability on slower machines.
 */
export async function sanityFetch<QueryResponse>({
  query,
  params = {},
}: {
  query: string;
  params?: any;
}) {
  return client.fetch<QueryResponse>(query, params, {
    // This 'next' property helps mitigate 'SocketError: other side closed'
    // by allowing Next.js to handle the request more robustly.
    next: {
      revalidate: 30, // Cache for 30 seconds to reduce CPU load
    },
  });
}