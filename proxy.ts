// import NextAuth from "next-auth";
// import { authConfig } from "./auth.config";

// // We initialize NextAuth with the slim config that is compatible with the Edge
// const { auth } = NextAuth(authConfig);

// export default auth;

// export const config = {
//   /* Matches the Sanity Studio and any admin dashboard paths.
//      This ensures that any request to these paths will trigger the 
//      'authorized' callback in your auth.config.ts.
//   */
//   matcher: ["/studio/:path*", "/admin/:path*"],
// };















import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// Initialize NextAuth with the Edge-compatible config
const { auth } = NextAuth(authConfig);

// Next.js 16 expects the default export to be the proxy handler
export default auth;

export const config = {
  /* IMPROVED MATCHER: 
    Added 'static' and 'chunks' to the exclusion list. 
    This prevents the proxy from intercepting Sanity Studio's 
    internal files, which often causes the "Input Stream" error.
  */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|static|chunks).*)"],
};