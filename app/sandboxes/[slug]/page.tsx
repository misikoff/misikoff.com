import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { MDXComponents } from 'mdx/types'
import { getMDXComponent } from 'next-contentlayer/hooks'
import { allSandboxes } from 'contentlayer/generated'

// Multiplicative Payoffs
import MultSandbox from 'content/sandboxes/multiplicativePayoffs/helpers/sandbox'
import MerchantSandbox from 'content/sandboxes/petersburgMerchant/helpers/sandbox'
import Header from '@/components/header'
import TailwindImage from '@/components/tailwindImage'

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

  // Merchant Sandbox
  MerchantSandbox: () => <MerchantSandbox />,
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
    return {
      title: sandbox.title,
      openGraph: {
        image: sandbox.thumbnailUrl,
        title: sandbox.title,
        description: sandbox.description,
        url: `https://misikoff.com/${sandbox._raw.flattenedPath.replace(
          '/page',
          ''
        )}`,
        siteName: 'Misikoff',
        images: [
          {
            url: sandbox.thumbnailUrl.replace('auto=format', 'fm=png'),
            alt: sandbox.alt,
            // width: 800,
            // height: 600,
          },
        ],
        locale: 'en-US',
        type: 'website',
      },
      twitter: {
        title: sandbox.title,
        card: 'summary',
        description: sandbox.description,
        images: [
          {
            url: sandbox.thumbnailUrl.replace('auto=format', 'fm=png'),
            alt: sandbox.alt,
            // width: 800,
            // height: 600,
          },
        ],
      },
    }
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
      <span className='main-content flex flex-col items-center gap-1 px-2' />
      <Header title={sandbox.title} />
      <MDXContent components={mdxComponents} />
    </article>
  )
}
