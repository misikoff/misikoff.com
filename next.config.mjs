import nextMDX from '@next/mdx'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkBreaks from 'remark-breaks'

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypeKatex],
    remarkPlugins: [remarkBreaks, remarkMath],
  },
})

/** @type {import('next').NextConfig} */
const config = withMDX({
  experimental: {
    appDir: true,
    mdxRs: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    domains: ['images.unsplash.com'],
  },
})

export default config
