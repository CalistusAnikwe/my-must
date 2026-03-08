// /**
//  * This route is responsible for the built-in authoring environment using Sanity Studio.
//  * All routes under your studio path is handled by this file using Next.js' catch-all routes:
//  * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
//  *
//  * You can learn more about the next-sanity package here:
//  * https://github.com/sanity-io/next-sanity
//  */












// 'use client'

// import { NextStudio } from 'next-sanity/studio'
// /* Using the '@' alias is safer in Next.js to ensure 
//    the config is found regardless of folder depth */
// import config from '@/sanity.config' 

// /* These exports are essential for SEO and mobile scaling 
//    within the Sanity Studio environment */
// export { metadata, viewport } from 'next-sanity/studio'

// export default function StudioPage() {
//   return <NextStudio config={config} />
// }
















/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 */

import Studio from './studio'

/* These exports are essential for SEO and mobile scaling 
   within the Sanity Studio environment. They only work in Server Components. */
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <Studio />
}