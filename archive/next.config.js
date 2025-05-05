const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const config = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    domains: ['images.unsplash.com'],
  },
}

// export default config
module.exports = withContentlayer(config)
