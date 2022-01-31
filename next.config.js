/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

module.exports = withPWA(
  withMDX({
    async rewrites() {
      return [
        {
          source: '/bear.js',
          destination: 'https://cdn.panelbear.com/analytics.js',
        },
      ]
    },
    pwa: {
      dest: 'public',
    },
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    images: {
      domains: ['images.unsplash.com'],
    },
  })
)
