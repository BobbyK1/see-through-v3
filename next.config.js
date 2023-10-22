/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ['@chakra-ui', 'react-icons', '@chakra-ui/react', '@chakra-ui/next-js', '@emotion/react', '@emotion/styled', 'framer-motion', '@supabase/auth-helpers-nextjs', '@supabase/supabase-js']
    }
}

module.exports = nextConfig
