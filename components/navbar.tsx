'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from 'public/icon.png'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { clsx as classNames } from 'clsx'
import { motion } from 'framer-motion'

const navigation = [
  { name: 'Articles', href: '/articles', current: false },
  { name: 'Sandboxes', href: '/sandboxes', current: false },
]

export default function Example({ className = '' }) {
  const pathname = usePathname() || '/'
  navigation.forEach((n) => {
    n.current = pathname.startsWith(n.href)
  })

  function hoverBar(path: string, startsWith = false) {
    const shouldShowBar = startsWith
      ? pathname.startsWith(path)
      : pathname === path

    return (
      <div className='relative hidden sm:flex'>
        {/* <div className='absolute bottom-0 w-full '> */}
        <div className='absolute top-[18px] w-full '>
          {shouldShowBar ? (
            <motion.div
              layoutId='bottomBar'
              transition={{
                ease: 'easeInOut',
                duration: 0.25,
              }}
            >
              <div className='rounded-full border-b-2 border-indigo-500' />
            </motion.div>
          ) : (
            <div className='rounded-full border-b-2 border-transparent transition-colors duration-150 group-hover:border-gray-300' />
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={`${className} min-h-full`}>
        <Disclosure as='nav' className='border-b border-gray-200 bg-white'>
          {({ open }) => (
            <>
              <div className='mx-auto max-w-7xl px-4 sm:px-6 md:mx-0 lg:px-8'>
                <div className='flex h-16 justify-between'>
                  <div className='flex'>
                    <div className='flex items-center'>
                      <Link href='/' className='group flex flex-shrink-0'>
                        <div className='flex space-x-2'>
                          <Image
                            className='block h-8 w-auto'
                            src={Logo}
                            alt='snowball'
                            height={32}
                            width={32}
                          />
                          <div>
                            <span className='text-lg font-bold text-gray-600 transition-colors duration-200 group-hover:text-blue-500'>
                              misikoff
                            </span>
                            {hoverBar('/')}
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className='hidden items-center sm:-my-px sm:ml-6 sm:flex sm:space-x-8 md:flex'>
                      {navigation.map((item) => (
                        <div className='group' key={item.name}>
                          <Link
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'text-gray-900'
                                : 'text-gray-600 group-hover:text-gray-700',
                              ' inline-flex items-center px-1 text-sm font-medium transition-colors duration-150'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </Link>
                          {hoverBar(item.href, true)}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='-mr-2 flex items-center sm:hidden'>
                    {/* Mobile menu button */}
                    <Disclosure.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                      <span className='sr-only'>Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className='block h-6 w-6'
                          aria-hidden='true'
                        />
                      ) : (
                        <Bars3Icon
                          className='block h-6 w-6'
                          aria-hidden='true'
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className='sm:hidden'>
                <div className='space-y-1 pb-3 pt-2'>
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as='a'
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800',
                        'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  )
}
