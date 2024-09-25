/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['media.cnn.com', 'b.zmtcdn.com', 'www.eatthis.com', 'www.holidify.com', 'i0.wp.com', 'localhost', 'vercel-blob.com']
    },
    env:{
        MONGODB_URI: process.env.MONGODB_URI
    }
};

export default nextConfig;
