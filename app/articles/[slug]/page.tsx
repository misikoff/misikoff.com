import { notFound } from 'next/navigation'
import { allArticles } from 'contentlayer/generated'
import { getMDXComponent } from 'next-contentlayer/hooks'
import Header from 'components/header'
import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import TailwindImage from '@/components/tailwindImage'

// Multiplicative Payoffs
import Chassis from 'content/articles/multiplicativePayoffs/helpers/chassis'

// Define your custom MDX components.
const mdxComponents: MDXComponents = {
  // General
  Link: ({ className, href, children }) => (
    <Link className={className} href={href as string}>
      {children}
    </Link>
  ),
  TailwindImage: (props) => <TailwindImage {...props} />,

  // Multiplicative Payoffs
  Chassis: () => <Chassis />,
}

export const generateStaticParams = async () =>
  allArticles.map((article) => ({ slug: article._raw.flattenedPath }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const article = allArticles.find(
    (article) =>
      article._raw.flattenedPath === `articles/${params.slug}` ||
      `articles/${params.slug}/page`
  )

  if (article !== undefined) {
    return {
      title: article.title,
      openGraph: {
        image: article.thumbnailUrl,
        title: article.title,
        description: article.description,
        url: article.url,
      },
      twitter: {
        title: article.title,
        image: article.thumbnailUrl,
        card: 'summary',
        description: article.description,
      },
    }
  }
}

export default function ArticleLayout({
  params,
}: {
  params: { slug: string }
}) {
  const article = allArticles.find(
    (article) =>
      article._raw.flattenedPath === `articles/${params.slug}` ||
      article._raw.flattenedPath === `articles/${params.slug}/page`
  )

  if (article === undefined) {
    notFound()
  }

  const MDXContent = getMDXComponent(article.body.code)

  console.log({ mdxComponents })

  return (
    <article className='mx-auto max-w-xl py-8'>
      <Header title={article.title} className='mb-6' />
      <div className='prose mx-auto'>
        <MDXContent components={mdxComponents} />
      </div>
    </article>
  )
}
