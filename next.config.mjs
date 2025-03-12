/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    experimental: {
        serverActions: true,
        trustedHost: [
            "localhost:3000",
            "20vw1rwb-3000.inc1.devtunnels.ms", // Add your DevTunnel domain
        ],
    },
};

export default nextConfig;
