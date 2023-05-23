import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import readingTime from 'reading-time'

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
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    thumbnailUrl: {
      type: 'string',
      required: true,
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
      of: { variables: 'number', measures: 'number', charts: 'number' },
      required: false,
    },
    thumbnailUrl: {
      type: 'string',
      required: true,
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
  documentTypes: [Article, Sandbox],
})
