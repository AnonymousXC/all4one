/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.freepik.com'
            }
        ]
    },
    experimental: {
        serverActions: {
            allowedForwardedHosts: ['localhost'],
            allowedOrigins: ['localhost:3000', 'translate.allforone.ai', 'api.allforone.ai']
        },
    }
};

export default nextConfig;
