import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import 'katex/dist/katex.min.css'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
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
    <html lang='en' className={inter.className}>
      <body className='flex min-h-screen flex-col bg-white'>
        <Analytics />
        <SpeedInsights />
        <Navbar />
        <main className='flex-grow p-4'>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
