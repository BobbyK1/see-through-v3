/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ['@chakra-ui', '@chakra-ui/react', '@chakra-ui/next-js', '@emotion/react', '@emotion/styled', 'framer-motion']
    }
}

module.exports = nextConfig
