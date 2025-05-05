import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import readingTime from 'reading-time'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { rehypePrettyCodeOptions } from './content/theme'

export const HEADING_LINK_ANCHOR = `before:content-['#'] before:absolute before:-ml-[1em] before:text-rose-100/0 hover:before:text-rose-100/50 pl-[1em] -ml-[1em]`

const Article = defineDocumentType(() => ({
  name: 'Article',
  filePathPattern: `**/articles/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    category: {
      type: 'string',
      description: 'The category of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    thumbnailUrl: {
      type: 'string',
      required: true,
    },
    thumbnailUnsplash: {
      type: 'boolean',
      required: false,
      default: false,
    },
    alt: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      required: false,
    },
    published: {
      type: 'boolean',
      required: true,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/${doc._raw.flattenedPath.replace('/page', '')}`,
    },
    readingTime: {
      type: 'number',
      resolve: (doc) => readingTime(doc.body.raw).time,
    },
    wordCount: {
      type: 'number',
      resolve: (doc) => doc.body.raw.split(/\s+/gu).length,
    },
  },
}))

const Sandbox = defineDocumentType(() => ({
  name: 'Sandbox',
  filePathPattern: `**/sandboxes/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    numbers: {
      type: 'json',
      // of: { variables: 'number', measures: 'number', charts: 'number' },
      required: false,
    },
    thumbnailUrl: {
      type: 'string',
      required: true,
    },
    thumbnailUnsplash: {
      type: 'boolean',
      required: false,
      default: false,
    },
    alt: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      required: false,
    },
    published: {
      type: 'boolean',
      required: true,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/${doc._raw.flattenedPath.replace('/page', '')}`,
    },
  },
}))

const Word = defineDocumentType(() => ({
  name: 'Word',
  filePathPattern: `**/words/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    author: {
      type: 'string',
      description: 'who said it',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    title: {
      type: 'string',
      description: 'The entry of the post',
      required: false,
    },
    description: {
      type: 'string',
      description: 'The entry of the post',
      required: false,
    },
    place: {
      type: 'string',
      description: 'The entry of the post',
      required: false,
    },
    icon: {
      type: 'enum',
      options: [
        'capitol',
        'temple',
        'dumbbell',
        'boxing glove',
        'feather',
        'Star Wars',
        'British flag',
        'fire',
        'arch',
      ],
      default: 'dark',
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/${doc._raw.flattenedPath.replace('/page', '')}`,
    },
  },
}))

const Package = defineDocumentType(() => ({
  name: 'Package',
  filePathPattern: `**/packages/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The entry of the post',
      required: true,
    },
    description: {
      type: 'string',
      description: 'The entry of the post',
      required: false,
    },
    repo: {
      type: 'string',
      description: 'The entry of the post',
      required: false,
    },
    website: {
      type: 'string',
      description: 'The entry of the post',
      required: false,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      required: false,
    },
    ecosystem: {
      type: 'string',
      required: false,
    },
    enabled: {
      type: 'boolean',
      required: false,
      default: false,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/${doc._raw.flattenedPath.replace('/page', '')}`,
    },
  },
}))

// readingTime: readingTime(markdownWithMeta) as { time: number },
export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Article, Sandbox, Word, Package],
  mdx: {
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [
      rehypeKatex,
      [rehypePrettyCode as any, rehypePrettyCodeOptions],
      // [rehypeSlug],
      // [
      //   rehypeAutolinkHeadings,
      //   {
      //     behavior: 'wrap',
      //     properties: {
      //       className: [HEADING_LINK_ANCHOR],
      //     },
      //   },
      // ],
    ],
  },
})
