/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                stream: false,
                crypto: false,
            };
        }
        return config;
    },
    async rewrites() {
        console.log("Rewrites applied for NODE_ENV:", process.env.NODE_ENV);
        return {
            beforeFiles: [
                {
                    source: '/python/api/:path*',
                    destination:
                        process.env.NODE_ENV === 'development'
                            ? 'http://127.0.0.1:5000/python/api/:path*'
                            : '/python/api/:path*',
                },
            ]
        }
    },
    httpAgentOptions: {
        keepAlive: true,
    },
    serverRuntimeConfig: {
        httpTimeout: 600000, // 10 minuti in millisecondi, per corrispondere al timeout Python
    },
    experimental: {
        proxyTimeout: 600000, // 10 minuti in millisecondi
    },

};

export default nextConfig;
