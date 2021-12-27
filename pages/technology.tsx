import Steps from 'components/steps'
import Header from 'components/header'
import { ArrowNarrowRightIcon } from '@heroicons/react/outline'

function TextArrow(text: string) {
  return (
    <span className="group inline-flex items-center hover:text-blue-500 text-gray-500 text-xs font-bold duration-200">
      more about {text}
      <ArrowNarrowRightIcon className="w-6 h-6 opacity-0 group-hover:opacity-100 transform duration-200" />
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
        <p>
          {'"'}Next.js gives you the best developer experience with all the
          features you need for production: hybrid static & server rendering,
          TypeScript support, smart bundling, route pre-fetching, and more. No
          config needed.{'"'}
        </p>
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
        <p>
          {'"'}A utility-first CSS framework packed with classes like{' '}
          <span className="text-black font-mono font-bold">flex</span>,{' '}
          <span className="text-black font-mono font-bold">pt-4</span>,{' '}
          <span className="text-black font-mono font-bold">text-center</span>{' '}
          and <span className="text-black font-mono font-bold">rotate-90</span>{' '}
          that can be composed to build any design, directly in your markup.
          {'"'}
        </p>
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
        <p>
          {'"'}
          <em>Anime.js</em> (<code>/ˈæn.ə.meɪ/</code>) is a lightweight
          JavaScript animation library with a simple, yet powerful API.
          <br />
          It works with CSS properties, SVG, DOM attributes and JavaScript
          Objects.{'"'}
        </p>
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
        <p>
          {'"'}Highcharts makes it easy for developers to set up interactive
          charts in their web pages
          {'"'}
        </p>
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
        <p>
          {'"'}
          Millions of developers and companies build, ship, and maintain their
          software on GitHub—the largest and most advanced development platform
          in the world.{'"'}
        </p>
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
        <p>
          {'"'}Vercel combines the best developer experience with an obsessive
          focus on end-user performance. Our platform enables frontend teams to
          do their best work.
          {'"'}
        </p>
        {TextArrow('Vercel')}
      </>
    ),
  },
]

export default function Example() {
  return (
    <div className="relative pb-16 pt-4 overflow-hidden md:pt-8">
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-prose text-lg">
          <Header category="Tech Stack" title="How It's Made" />

          <span className="flex mb-2 mt-8 text-lg font-bold">Frameworks</span>
          <Steps steps={frameWorkSteps} />

          <span className="flex mb-2 mt-8 text-lg font-bold">
            Animation Libraries
          </span>
          <Steps steps={animationSteps} />

          <span className="flex mb-2 mt-8 text-lg font-bold">
            CI/CD Pipeline
          </span>
          <Steps steps={pipelinesteps} />
        </div>
      </div>
    </div>
  )
}
