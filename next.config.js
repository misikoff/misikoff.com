const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const config = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  images: {
    domains: ['images.unsplash.com'],
  },
}

// export default config
module.exports = withContentlayer(config)
