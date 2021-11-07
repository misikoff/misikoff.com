import Layout from 'components/layout'

/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon } from '@heroicons/react/solid'

const steps = [
  {
    name: 'Create account',
    description: 'Vitae sed mi luctus laoreet.',
    href: '#',
    status: 'complete',
  },
  {
    name: 'Profile information',
    description: 'Cursus semper viverra facilisis et et some more.',
    href: '#',
    status: 'current',
  },
  {
    name: 'Business information',
    description: 'Penatibus eu quis ante.',
    href: '#',
    status: 'upcoming',
  },
  {
    name: 'Theme',
    description: 'Faucibus nec enim leo et.',
    href: '#',
    status: 'upcoming',
  },
  {
    name: 'Preview',
    description: 'Iusto et officia maiores porro ad non quas.',
    href: '#',
    status: 'upcoming',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <Layout>
      <nav aria-label="Progress">
        <ol role="list" className="overflow-hidden">
          {steps.map((step, stepIdx) => (
            <li
              key={step.name}
              className={classNames(
                stepIdx !== steps.length - 1 ? 'pb-10' : '',
                'relative'
              )}
            >
              {step.status === 'complete' ? (
                <>
                  {stepIdx !== steps.length - 1 ? (
                    <div
                      className="absolute left-4 top-4 -ml-px mt-0.5 w-0.5 h-full bg-indigo-600"
                      aria-hidden="true"
                    />
                  ) : null}
                  <a
                    href={step.href}
                    className="group relative flex items-start"
                  >
                    <span className="flex items-center h-9">
                      <span className="relative z-10 flex items-center justify-center w-8 h-8 bg-indigo-600 group-hover:bg-indigo-800 rounded-full">
                        <CheckIcon
                          className="w-5 h-5 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                    <span className="flex flex-col ml-4 min-w-0">
                      <span className="text-xs font-semibold tracking-wide uppercase">
                        {step.name}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {step.description}
                      </span>
                    </span>
                  </a>
                </>
              ) : step.status === 'current' ? (
                <>
                  {stepIdx !== steps.length - 1 ? (
                    <div
                      className="absolute left-4 top-4 -ml-px mt-0.5 w-0.5 h-full bg-gray-300"
                      aria-hidden="true"
                    />
                  ) : null}
                  <a
                    href={step.href}
                    className="group relative flex items-start"
                    aria-current="step"
                  >
                    <span className="flex items-center h-9" aria-hidden="true">
                      <span className="relative z-10 flex items-center justify-center w-8 h-8 bg-white border-2 border-indigo-600 rounded-full">
                        <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
                      </span>
                    </span>
                    <span className="flex flex-col ml-4 min-w-0">
                      <span className="text-indigo-600 text-xs font-semibold tracking-wide uppercase">
                        {step.name}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {step.description}
                      </span>
                    </span>
                  </a>
                </>
              ) : (
                <>
                  {stepIdx !== steps.length - 1 ? (
                    <div
                      className="absolute left-4 top-4 -ml-px mt-0.5 w-0.5 h-full bg-gray-300"
                      aria-hidden="true"
                    />
                  ) : null}
                  <a
                    href={step.href}
                    className="group relative flex items-start"
                  >
                    <span className="flex items-center h-9" aria-hidden="true">
                      <span className="relative z-10 flex items-center justify-center w-8 h-8 bg-white border-2 border-gray-300 group-hover:border-gray-400 rounded-full">
                        <span className="w-2.5 h-2.5 group-hover:bg-gray-300 bg-transparent rounded-full" />
                      </span>
                    </span>
                    <span className="flex flex-col ml-4 min-w-0">
                      <span className="text-gray-500 text-xs font-semibold tracking-wide uppercase">
                        {step.name}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {step.description}
                      </span>
                    </span>
                  </a>
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </Layout>
  )
}
