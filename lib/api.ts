import fs from 'fs'
import { readdir } from 'fs/promises'
import matter from 'gray-matter'
import { join } from 'path'

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

export const getFileList: any = async (dirName: string) => {
  let files = [] as any[]
  const items = await readdir(dirName, { withFileTypes: true })

  for (const item of items) {
    if (item.isDirectory()) {
      files = [...files, ...(await getFileList(`${dirName}/${item.name}`))]
    } else if (item.name.endsWith('.mdx')) {
      files.push(`${dirName}/${item.name}`)
    }
  }

  return files
}
