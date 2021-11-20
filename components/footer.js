import Link from 'next/link'
/* This example requires Tailwind CSS v2.0+ */
import GitHubIcon from 'components/icons/social/GitHub'
import CodePenIcon from 'components/icons/social/CodePen'
import TwitterIcon from 'components/icons/social/Twitter'
import LinkedInIcon from 'components/icons/social/LinkedIn'
import DevpostIcon from 'components/icons/social/Devpost'

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
    <footer className="bg-white">
      <div className="mx-auto px-4 py-12 max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <nav
          className="flex flex-wrap justify-center -mx-5 -my-2"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <Link href={item.href}>
                <a className="text-gray-500 hover:text-gray-900 text-base">
                  {item.name}
                </a>
              </Link>
            </div>
          ))}
        </nav>
        <div className="flex justify-center mt-8 space-x-6">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-gray-500 transform hover:scale-125 transition-all duration-75"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="w-6 h-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-gray-400 text-base">
          &copy; {curYear} Thomas Misikoff. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
