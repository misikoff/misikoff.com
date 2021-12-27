import { GetStaticProps } from 'next'
import Head from 'next/head'
// import { getPostBySlug, getAllPosts } from 'lib/api'

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Image from 'next/image'

export const getStaticProps: GetStaticProps = async (_) => {
  const files = fs.readdirSync(path.join('content/articles'))
  console.log(files)
  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join('content/articles', filename),
      'utf-8'
    )
    const { data: frontMatter } = matter(markdownWithMeta)

    return {
      frontMatter,
      slug: filename.split('.')[0],
    }
  })

  return {
    props: {
      posts,
    },
  }
}

const Home = ({ posts = [] as Post[] }) => {
  console.log({ posts })
  // const posts = getAllPosts(['slug'])

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Articles</title>
      </Head>

      <main className="flex flex-1 flex-col items-center justify-center px-20 w-full text-center">
        {posts.map((post, index: number) => (
          <Link href={'/articles/' + post.slug} passHref key={index}>
            <div className="card pointer mb-3" style={{ maxWidth: '540px' }}>
              <div className="row g-0">
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{post.frontMatter.title}</h5>
                    <p className="card-text">{post.frontMatter.description}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        {post.frontMatter.date}
                      </small>
                    </p>
                  </div>
                </div>
                <div className="col-md-4 m-auto">
                  <Image
                    src={post.frontMatter.thumbnailUrl}
                    className="img-fluid rounded-start mt-1"
                    alt="thumbnail"
                    width={500}
                    height={400}
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </main>
    </div>
  )
}

export default Home
