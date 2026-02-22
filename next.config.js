const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Enables static HTML export
  images: {
    unoptimized: true, // Required for static export
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Use trailing slashes for proper static export routing
  trailingSlash: true,
  // Fix the assetPrefix to start with a slash
  assetPrefix: '/',
  basePath: ''
}

module.exports = withMDX(nextConfig)
