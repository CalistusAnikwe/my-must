// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* This version removes the experimental turbo key to fix the Red Underline */
//   reactStrictMode: true,
//   // Add any other standard config here
// };

// export default nextConfig;












import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  /* Critical Fix: This tells Next.js to exclude bcrypt from the 
     standard bundling process, preventing "Unknown module type" 
     errors caused by its internal C++ components.
  */
  serverExternalPackages: ["bcrypt"],
};

export default nextConfig;