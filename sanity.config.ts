// 'use client'

// /**
//  * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
//  */

// import {visionTool} from '@sanity/vision'
// import {defineConfig} from 'sanity'
// import {structureTool} from 'sanity/structure'

// // Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
// import {apiVersion, dataset, projectId} from './sanity/env'
// import {schema} from './sanity/schemaTypes'
// import {structure} from './sanity/structure'

// export default defineConfig({
//   basePath: '/studio',
//   projectId,
//   dataset,
//   // Add and edit the content schema in the './sanity/schemaTypes' folder
//   schema,
//   plugins: [
//     structureTool({structure}),
//     // Vision is for querying with GROQ from inside the Studio
//     // https://www.sanity.io/docs/the-vision-plugin
//     visionTool({defaultApiVersion: apiVersion}),
//   ],
// })












// 'use client'

// /**
//  * This configuration is used for the Sanity Studio mounted on the `/app/studio/[[...tool]]/page.tsx` route
//  */

// import {visionTool} from '@sanity/vision'
// import {defineConfig} from 'sanity'
// import {structureTool} from 'sanity/structure'

// // Import environment variables and schemas
// import {apiVersion, dataset, projectId} from './sanity/env'
// import {schema} from './sanity/schemaTypes'
// import {structure} from './sanity/structure'

// export default defineConfig({
//   /* 1. Ensure basePath matches your /app/studio folder exactly. 
//      No trailing slash is best practice here. */
//   basePath: '/studio', 
  
//   projectId,
//   dataset,
  
//   /* 2. Your schema already points to ./sanity/schemaTypes. 
//      Make sure you have added the NextAuth types (user, account, etc.) 
//      inside that folder's index.ts as we discussed earlier. */
//   schema,

//   plugins: [
//     structureTool({structure}),
    
//     /* 3. Vision tool for testing GROQ queries */
//     visionTool({defaultApiVersion: apiVersion}),
//   ],

//   /* 4. Optional: Customizing the Studio appearance for your client */
//   title: 'Art of Cleaning Admin',
// })












'use client'

/**
 * This configuration is used for the Sanity Studio mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Import environment variables and schemas
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

export default defineConfig({
  basePath: '/studio', 
  
  projectId,
  dataset,
  
  schema,

  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: apiVersion}),
  ],

  title: 'Art of Cleaning Admin',

  // --- ADDED: AUTHENTICATION HANDLING ---
  /* This ensures that the Studio uses the same session as your 
     Next.js frontend, preventing "Input Stream" errors.
  */
  auth: {
    redirectOnSingle: true, // Automatically uses your NextAuth login
    mode: 'replace',
  },

  /* Ensures the Studio doesn't crash if the connection is slow 
     (useful for 4GB RAM setups)
  */
  scheduledPublishing: {
    enabled: false,
  }
})