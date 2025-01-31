import type { NextConfig } from 'next'


const nextConfig: NextConfig = {
  typescript:{
    ignoreBuildErrors:true,
  },
  // async headers() {
    
  //   return [
      
  //     {
        
  //       source: "/api/:path*",
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "true" },
  //         { key: "Access-Control-Allow-Origin", value: "http://10.0.38.51:3000" },
  //         { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
  //         { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Content-Type, Accept, Authorization" },
  //       ],
  //     },
  //   ];
  // },
  
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}
 
export default nextConfig