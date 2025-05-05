import Link from 'next/link'
import { ImCodepen, ImGithub, ImLinkedin, ImTwitter } from 'react-icons/im'
import { SiDevpost } from 'react-icons/si'

const curYear = new Date().getFullYear()

const navigation = {
  main: [{ name: 'Technology', href: '/technology' }],
  social: [
    {
      name: 'Twitter',
      href: 'https://twitter.com/tmisikoff',
      icon: ImTwitter,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/misikoff',
      icon: ImGithub,
    },
    {
      name: 'CodePen',
      href: 'https://codepen.io/misikoff',
      icon: ImCodepen,
    },
    {
      name: 'Devpost',
      href: 'https://devpost.com/misikoff',
      icon: SiDevpost,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/misikoff',
      icon: ImLinkedin,
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
              className='transform transition-all duration-150 hover:scale-125 '
            >
              <span className='sr-only'>{item.name}</span>
              <item.icon
                className='h-6 w-6 fill-gray-400 transition-all duration-150 hover:fill-gray-500 '
                aria-hidden='true'
              />
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
