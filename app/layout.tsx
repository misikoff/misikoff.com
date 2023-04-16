import { Metadata } from 'next'
import Navbar from 'components/navbar'
import Footer from 'components/footer'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})
import 'tailwindcss/tailwind.css'

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
        <Navbar />
        <main className='flex-grow p-4'>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
