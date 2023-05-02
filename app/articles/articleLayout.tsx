import { Metadata } from 'next'
import Header from 'components/header'

// export const metadata: Metadata = {
//   title: 'Misikoff',
//   description:
//     'This is a growing hub where I discuss novel concepts and their applications.',
// }

export default function ArticleLayout({
  children,
  title,
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <div className='mx-auto mt-4'>
      <Header title={title} className='mb-6' />
      <div className='prose mx-auto'>{children}</div>
    </div>
  )
}
