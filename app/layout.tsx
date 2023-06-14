import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

import Footer from 'components/footer'
import Navbar from 'components/navbar'
import 'katex/dist/katex.min.css'
import 'tailwindcss/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Misikoff',
  description:
    'This is a growing hub where I discuss novel concepts and their applications.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={`${inter.variable} flex min-h-screen flex-col bg-white font-sans`}
      >
        <Analytics />
        <Navbar />
        <main className='flex-grow p-4'>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
