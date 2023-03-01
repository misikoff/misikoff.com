/** @type {import('next').NextConfig} */
// const withPWA = require('next-pwa')
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

const withPWA = require('next-pwa')({
  dest: 'public',
})

module.exports = withPWA(
  withMDX({
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    images: {
      domains: ['images.unsplash.com'],
    },
  })
)
