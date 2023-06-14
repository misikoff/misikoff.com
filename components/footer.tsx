import Link from 'next/link'

/* This example requires Tailwind CSS v2.0+ */
import CodePenIcon from 'components/icons/social/CodePen'
import DevpostIcon from 'components/icons/social/Devpost'
import GitHubIcon from 'components/icons/social/GitHub'
import LinkedInIcon from 'components/icons/social/LinkedIn'
import TwitterIcon from 'components/icons/social/Twitter'

const curYear = new Date().getFullYear()

const navigation = {
  main: [{ name: 'Technology', href: '/technology' }],
  social: [
    {
      name: 'Twitter',
      href: 'https://twitter.com/tmisikoff',
      icon: TwitterIcon,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/misikoff',
      icon: GitHubIcon,
    },
    {
      name: 'CodePen',
      href: 'https://codepen.io/misikoff',
      icon: CodePenIcon,
    },
    {
      name: 'Devpost',
      href: 'https://devpost.com/misikoff',
      icon: DevpostIcon,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/misikoff',
      icon: LinkedInIcon,
    },
  ],
}

export default function Example() {
  return (
    <footer className='bg-white'>
      <div className='mx-auto max-w-7xl overflow-hidden px-4 py-12 sm:px-6 lg:px-8'>
        <nav
          className='-mx-5 -my-2 flex flex-wrap justify-center'
          aria-label='Footer'
        >
          {navigation.main.map((item) => (
            <div key={item.name} className='px-5 py-2'>
              <Link
                href={item.href}
                className='text-base text-gray-500 hover:text-gray-900'
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <div className='mt-8 flex justify-center space-x-6'>
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className='transform fill-gray-400 transition-all duration-75 hover:scale-125 hover:fill-gray-500'
            >
              <span className='sr-only'>{item.name}</span>
              <item.icon aria-hidden='true' />
            </a>
          ))}
        </div>
        <p className='mt-8 text-center text-base text-gray-500'>
          &copy; {curYear} Thomas Misikoff. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
