/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

module.exports = withPWA(
  withMDX({
    pwa: {
      dest: 'public',
    },
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    images: {
      domains: ['images.unsplash.com'],
    },
  })
)
