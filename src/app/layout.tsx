import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '@/assets/globals.css'

import Footer from '@/components/Footer'
import { PostHogProvider } from '@/components/PostHogProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Tommy Misikoff | Product Engineer',
  description:
    'Experienced software engineer specializing in building elegant, performant frontend experiences. Let’s create something impactful.',
  keywords: [
    'Tommy Misikoff',
    'Senior Engineer',
    'Product Engineer',
    'Frontend Developer',
    'React',
    'JavaScript',
    'TypeScript',
    'UX Design',
  ],
  authors: [
    {
      name: 'Tommy Misikoff',
      url: 'https://misikoff.com',
    },
  ],
  openGraph: {
    type: 'website',
    url: 'https://misikoff.com',
    title: 'Tommy Misikoff | Senior Product Engineer',
    description:
      'Experienced software engineer specializing in building elegant, performant frontend experiences. Let’s create something impactful.',
    // images: [
    //   {
    //     url: 'https://misikoff.com/preview.jpg',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Tommy Misikoff Personal Website Preview',
    //   },
    // ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tommy Misikoff | Senior Product Engineer',
    description:
      "Experienced software engineer specializing in building elegant, performant frontend experiences. Let's create something impactful.",
    // images: ['https://misikoff.com/preview.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
  // themeColor: '#0A192F',
  // viewport: {
  //   width: 'device-width',
  //   initialScale: 1,
  // },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f2f4f1]`}
      >
        <PostHogProvider>
          <div className='flex flex-col justify-between min-h-screen p-4'>
            {children}
            <SpeedInsights />
            <Analytics />

            <Footer />
          </div>
        </PostHogProvider>
      </body>
    </html>
  )
}
