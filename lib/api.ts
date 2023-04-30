import dynamic from 'next/dynamic'
import fs from 'fs'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import { join } from 'path'
import rehypeKatex from 'rehype-katex'
import remarkBreaks from 'remark-breaks'
import remarkMath from 'remark-math'
const Link = dynamic(() => import('next/link'))
const Header = dynamic(() => import('components/header'))
const TailwindImage = dynamic(() => import('components/tailwindImage'))
const UnsplashImage = dynamic(() => import('components/unsplashImage'))
const Chassis = dynamic(() => import('components/blogHelpers/mult/chassis'))
const MultSandbox = dynamic(() => import('components/blogHelpers/mult/sandbox'))

const components = {
  Header,
  Link,
  TailwindImage,
  UnsplashImage,
  Chassis,
  MultSandbox,
}

const postsDirectory = join(process.cwd(), 'content/articles')
console.log({ postsDirectory })
export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(
  slug: string,
  fields = [] as string[]
): { date?: Date } {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {} as any

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields = [] as any[]) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) =>
      post1.date && post2.date && post1.date > post2.date ? -1 : 1
    )
  return posts
}

export async function customParser(source: string) {
  return await compileMDX<{ title: string }>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [rehypeKatex],
        remarkPlugins: [remarkBreaks, remarkMath],
      },
    },
    components,
  })
}
