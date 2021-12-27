import { GetStaticPaths, GetStaticProps } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
// import SyntaxHighlighter from 'react-syntax-highlighter'

// const components = { Nav, Button, SyntaxHighlighter }

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join('content/articles'))

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.mdx', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug
  const markdownWithMeta = fs.readFileSync(
    path.join('content/articles', slug + '.mdx'),
    'utf-8'
  )

  const { data: frontMatter, content } = matter(markdownWithMeta)
  const mdxSource = await serialize(content)

  return {
    props: {
      frontMatter,
      slug,
      mdxSource,
    },
  }
}

const PostPage = ({
  frontMatter: { title, date },
  mdxSource,
}: {
  frontMatter: { title: string; date: Date }
  mdxSource: MDXRemoteSerializeResult
}) => {
  return (
    <div className="mt-4">
      <h1>{title}</h1>
      {/* <MDXRemote {...mdxSource} components={components} /> */}
      <MDXRemote {...mdxSource} />
    </div>
  )
}

export default PostPage
