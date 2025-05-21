import DownloadResumeButton from './DownloadResumeButton'
import GitHubIcon from './icons/GitHub'
import LinkedInIcon from './icons/LinkedIn'

type LinkType = {
  name: string
  href: string
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

const links: LinkType[] = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/misikoff/',
    icon: LinkedInIcon,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/misikoff',
    icon: GitHubIcon,
  },
]

export function getSocialIcon(link: LinkType) {
  return (
    <a
      // key={i}
      href={link.href}
      target='_blank'
      rel='noopener noreferrer'
      className='flex items-center justify-center w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 transition duration-300 ease-in-out'
    >
      <span className='sr-only'>{link.name}</span>
      <span className='w-6 h-6'>
        <link.icon />
      </span>
    </a>
  )
}

export default function Footer({ className }: { className?: string }) {
  return (
    <footer className='w-full py-4'>
      <div className='flex md:flex-row w-full justify-center items-center gap-4 mt-2'>
        {getSocialIcon(links[0])}
        <DownloadResumeButton />
        {getSocialIcon(links[1])}
        {/* <a
          href='https://www.linkedin.com/in/misikoff/'
          target='_blank'
          rel='noopener noreferrer'
          className={`flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition duration-300 ease-in-out ${className}`}
        {/* {links.map((l, i) => {
          return (
            <a
              key={i}
              href={l.href}
              target='_blank'
              rel='noopener noreferrer'
              className={`flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition duration-300 ease-in-out ${className}`}
            >
              <span className='sr-only'>{l.name}</span>
              <span className='w-6 h-6'>
                <l.icon />
              </span>
            </a>
          )
        })}{' '} */}
      </div>
      <p className='text-sm text-gray-500 mt-3 mb-1 text-center'>
        © MMXXV {/* {new Date().getFullYear()} */}
        Tommy Misikoff. All rights reserved.
      </p>
    </footer>
  )
}
