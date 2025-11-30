const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static HTML export
  images: {
    unoptimized: true, // Required for static export
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Remove trailing slashes for traditional hosting compatibility
  trailingSlash: false,
  // Fix the assetPrefix to start with a slash
  assetPrefix: '/',
  basePath: ''
}

module.exports = withMDX(nextConfig)
