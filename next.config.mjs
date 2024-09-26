/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'media.cnn.com',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'b.zmtcdn.com',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'www.eatthis.com',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'www.holidify.com',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'i0.wp.com',
            pathname: '/**',
          },
          {
            protocol: 'http',
            hostname: 'localhost',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'vercel-blob.com',
            pathname: '/**',
          },
        ],
      },
    env:{
        MONGODB_URI: process.env.MONGODB_URI
    }
};

export default nextConfig;
