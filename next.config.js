/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['geist'],
  output: 'export', // Enables static HTML export
  images: {
    unoptimized: true, // Required for static export
  },
  // Disable JavaScript
  unstable_runtimeJS: false,
  // Disable all client-side routing
  unstable_noFolderStructure: true,
  // Remove trailing slashes for traditional hosting compatibility
  trailingSlash: false,
  // Disable automatic static optimization
  experimental: {
    // This disables automatic static optimization
    isrMemoryCacheSize: 0,
  },
  // Fix the assetPrefix to start with a slash
  assetPrefix: '/',
  basePath: ''
}

module.exports = nextConfig