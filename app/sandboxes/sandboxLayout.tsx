import { Metadata } from 'next'
import Header from 'components/header'
// import { title } from './multiplicativePayoffs/page.mdx'

export const metadata: Metadata = {
  title: 'Misikoff',
  description:
    'This is a growing hub where I discuss novel concepts and their applications.',
}

export default function SandboxLayout({
  children,
  title,
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <div className='mx-auto mb-16 mt-4'>
      <Header title={title} className='mb-6' />
      {children}
    </div>
  )
}
