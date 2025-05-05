import { Metadata } from 'next'
import Link from 'next/link'

import Hexagon from '@/components/blocks/hexagon'
import DotPattern from '@/components/dotPattern'
import Globe from '@/components/globe'

export const metadata: Metadata = {
  title: 'misikoff - about',
}

export default async function IndexPage() {
  return (
    <section className='max-w-3xl mx-auto px-6 py-16 space-y-12 text-gray-800'>
      <header className='space-y-4'>
        <h1 className='text-4xl font-bold tracking-tight'>
          Building Systems That Endure
        </h1>
        <p className='text-lg text-gray-600'>
          I’m a frontend and fullstack engineer who cares about building things
          that are clean, lasting, and purposeful. I believe good engineering
          isn’t about noise or flash — it’s about clarity, consistency, and
          quiet excellence.
        </p>
      </header>

      <section className='space-y-4'>
        <p>
          I work at the intersection of idealism and reality — holding a vision
          for how things ought to be, while delivering what is needed in the
          world as it is.
        </p>
        <p>
          I value systems that are thoughtful, interfaces that are honest, and
          work that stands up over time.
        </p>
        <p>
          My approach isn’t about chasing perfection. It’s about getting the
          essentials right — with patience, precision, and a sense of purpose.
        </p>
      </section>

      <section className='space-y-4'>
        <p>
          I specialize in building clear, reliable, user-focused experiences —
          whether at the interface or through fullstack systems.
        </p>
        <p>
          I focus on clean architecture, well-crafted interactions, accessible
          design, and writing code meant to be understood and maintained.
        </p>
        <p>
          I treat frameworks and tools as means to an end, not the end itself.
          The goal is always the same: build something that works well, feels
          right, and lasts.
        </p>
      </section>

      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold tracking-tight'>Skills</h2>
        <ul className='space-y-2 text-gray-700 list-disc list-inside'>
          <li>
            <span className='font-medium text-gray-800'>Frontend:</span> React,
            Next.js, TypeScript, Tailwind, Framer Motion
          </li>
          <li>
            <span className='font-medium text-gray-800'>Fullstack:</span>{' '}
            Node.js, Supabase, Postgres, DrizzleORM
          </li>
          <li>
            <span className='font-medium text-gray-800'>Architecture:</span> API
            design, cloud-first development, serverless systems
          </li>
          <li>
            <span className='font-medium text-gray-800'>Craftsmanship:</span>{' '}
            Accessible UI, microinteractions, design systems
          </li>
          <li>
            <span className='font-medium text-gray-800'>Workflow:</span> GitHub,
            Linear, Expo, Vercel
          </li>
        </ul>
      </section>

      <section className='space-y-4'>
        <h2 className='text-2xl font-semibold tracking-tight'>
          Currently Building
        </h2>
        <p>
          Through my studio,{' '}
          <a
            href='https://snowgalelabs.com'
            className='text-blue-600 hover:underline'
          >
            Snow Gale Labs
          </a>
          , I focus on clarity, craft, and thoughtful technology.
        </p>
        <p>
          Our first release is{' '}
          <a
            href='https://toron.snowgalelabs.com'
            className='text-blue-600 hover:underline'
          >
            Toron
          </a>
          , a workout tracking app for those who train with purpose, not noise.
        </p>
      </section>

      <section className='space-y-4'>
        <p>
          If you value clean systems and lasting work, we’ll build something
          worth building.
        </p>
      </section>
    </section>
  )
}
