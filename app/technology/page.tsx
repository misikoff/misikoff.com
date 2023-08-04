import type { Metadata } from 'next'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

// import Hexagon from '@/components/fragments/hexagon'
// import HexagonGrid from '@/components/fragments/hexagonGrid'
import HexagonGridAbsol from '@/components/fragments/hexagonGridAbsol'
import Header from '@/components/header'
import Steps from '@/components/steps'
// import TailwindImage from '@/components/tailwindImage'

export const metadata: Metadata = {
  title: 'Technology - Misikoff',
  description: 'Learn about the technology powering the site',
}

function TextArrow(text: string) {
  return (
    <span className='group inline-flex items-center text-xs font-bold text-gray-500 duration-200 hover:text-blue-500'>
      more about {text}
      <ArrowLongRightIcon className='h-6 w-6 transform opacity-0 duration-200 group-hover:opacity-100' />
    </span>
  )
}

const frameWorkSteps = [
  {
    name: 'Next.js',
    description: '',
    href: 'https://nextjs.com',
    status: 'current',
    bonusBlock: (
      <>
        <q>
          Next.js gives you the best developer experience with all the features
          you need for production: hybrid static & server rendering, TypeScript
          support, smart bundling, route pre-fetching, and more. No config
          needed.
        </q>
        <br />
        {TextArrow('Next.js')}
      </>
    ),
  },
  {
    name: 'Tailwind CSS',
    description: '',
    href: 'https://tailwindcss.com',
    status: 'current',
    bonusBlock: (
      <>
        <q>
          A utility-first CSS framework packed with classes like{' '}
          <span className='font-mono font-bold text-black'>flex</span>,{' '}
          <span className='font-mono font-bold text-black'>pt-4</span>,{' '}
          <span className='font-mono font-bold text-black'>text-center</span>{' '}
          and <span className='font-mono font-bold text-black'>rotate-90</span>{' '}
          that can be composed to build any design, directly in your markup.
        </q>
        <br />
        {TextArrow('Tailwind CSS')}
      </>
    ),
  },
]

const animationSteps = [
  {
    name: 'Framer Motion',
    description: '',
    href: 'https://www.framer.com/motion/',
    status: 'current',
    bonusBlock: (
      <>
        <q>Framer Motion is a simple yet powerful motion library for React.</q>
        <br />
        {TextArrow('Framer Motion')}
      </>
    ),
  },
  {
    name: 'Chart.js',
    description: '',
    href: 'https://chartjs.org',
    status: 'current',
    bonusBlock: (
      <>
        <q>
          Chart.js provides a set of frequently used chart types, plugins, and
          customization options.
        </q>
        <br />
        {TextArrow('Chart.js')}
      </>
    ),
  },
]

const pipelinesteps = [
  {
    name: 'GitHub',
    description: '',
    href: 'https://github.com',
    status: 'current',
    bonusBlock: (
      <>
        <q>
          Millions of developers and companies build, ship, and maintain their
          software on GitHub—the largest and most advanced development platform
          in the world.
        </q>
        <br />
        {TextArrow('GitHub')}
      </>
    ),
  },
  {
    name: 'Vercel',
    description: '',
    href: 'https://vercel.com',
    status: 'current',
    bonusBlock: (
      <>
        <q>
          Vercel combines the best developer experience with an obsessive focus
          on end-user performance. Our platform enables frontend teams to do
          their best work.
        </q>
        <br />
        {TextArrow('Vercel')}
      </>
    ),
  },
]

export default function TechnologyPage() {
  return (
    <div className='relative overflow-hidden pb-16 pt-4 md:pt-8'>
      <div className='relative px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-prose text-lg'>
          <Header category='Tech Stack' title="How It's Made" />

          <span className='mb-2 mt-8 flex text-lg font-bold'>Frameworks</span>
          <Steps steps={frameWorkSteps} />

          <span className='mb-2 mt-8 flex text-lg font-bold'>
            Animation Libraries
          </span>
          <Steps steps={animationSteps} />

          <span className='mb-2 mt-8 flex text-lg font-bold'>
            CI/CD Pipeline
          </span>
          <Steps steps={pipelinesteps} />
        </div>
        {/* <TailwindImage
          src='/misc/test.png'
          className='mx-auto h-32 w-32 transform rounded-lg border-2 border-gray-200 duration-200 ease-in-out hover:scale-150 hover:shadow-lg'
        /> */}
        {/* <span style={{ color: '#6C6', fontSize: '135px' }}>
          &#x2B22; &#x2B22;
        </span> */}
        {/* <Hexagon className='h-8 transform fill-blue-400 duration-200 ease-in-out hover:rotate-90' /> */}
        {/* <Hexagon className='h-8 w-8 transform fill-blue-400 duration-200 ease-in-out hover:rotate-90' />

        <Hexagon className='h-8 w-8 transform fill-blue-400 duration-200 ease-in-out hover:rotate-90' /> */}
        {/* <HexagonGrid rows={8} cols={13} /> */}
        {/* <HexagonGridAbsol rows={10} cols={20} /> */}
      </div>
    </div>
  )
}
