import { notFound } from 'next/navigation'
import { allArticles, allSandboxes } from 'contentlayer/generated'
import { getMDXComponent } from 'next-contentlayer/hooks'
import Header from 'components/header'
import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import TailwindImage from '@/components/tailwindImage'

// Multiplicative Payoffs
import MultSandbox from 'content/sandboxes/multiplicativePayoffs/helpers/sandbox'

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
  MultSandbox: () => <MultSandbox />,
}

export const generateStaticParams = async () =>
  allSandboxes.map((sandbox) => ({ slug: sandbox._raw.flattenedPath }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const sandbox = allSandboxes.find(
    (sandbox) =>
      sandbox._raw.flattenedPath === `articles/${params.slug}` ||
      `sandboxes/${params.slug}/page`
  )

  if (sandbox !== undefined) {
    return { title: sandbox.title }
  }
}

export default function ArticleLayout({
  params,
}: {
  params: { slug: string }
}) {
  const sandbox = allSandboxes.find(
    (sandbox) =>
      sandbox._raw.flattenedPath === `sandboxes/${params.slug}` ||
      sandbox._raw.flattenedPath === `sandboxes/${params.slug}/page`
  )

  if (sandbox === undefined) {
    notFound()
  }

  const MDXContent = getMDXComponent(sandbox.body.code)

  return (
    <article className='flex flex-col gap-y-6'>
      <Header title={sandbox.title} />
      <MDXContent components={mdxComponents} />
    </article>
  )
}
