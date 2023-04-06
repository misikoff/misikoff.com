import Steps from 'components/steps'
import Header from 'components/header'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
// import HeadHelper from 'components/headHelper'

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
    name: 'Anime.js',
    description: '',
    href: 'https://animejs.com',
    status: 'current',
    bonusBlock: (
      <>
        <q>
          <em>Anime.js</em> (<code>/ˈæn.ə.meɪ/</code>) is a lightweight
          JavaScript animation library with a simple, yet powerful API.
          <br />
          It works with CSS properties, SVG, DOM attributes and JavaScript
          Objects.
        </q>
        <br />
        {TextArrow('Anime.js')}
      </>
    ),
  },
  {
    name: 'Highcharts',
    description: '',
    href: 'https://highcharts.com',
    status: 'current',
    bonusBlock: (
      <>
        <q>
          Highcharts makes it easy for developers to set up interactive charts
          in their web pages
        </q>
        <br />
        {TextArrow('Highcharts')}
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

{
  /* <HeadHelper
        pageTitle='Technology'
        title='Technology - Misikoff'
        description='Learn about the technology powering the site'
        url='https://misikoff/technology'
      /> */
}

export default function TechnologyPage() {
  return (
    // <>
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
      </div>
    </div>
    // </>
  )
}
