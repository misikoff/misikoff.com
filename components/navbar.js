/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import Link from 'next/link'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Logo from 'public/icon.png'
import UserImage from 'public/userImage.jpeg'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  image: UserImage,
}

const navigation = [
  { name: 'Articles', href: 'articles', current: false },
  { name: 'Sandboxes', href: 'sandboxes', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example({ children }) {
  const router = useRouter()
  navigation.forEach((n) => {
    n.current = '/' + n.href === router.route
  })
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-white border-b border-gray-200">
          {({ open }) => (
            <>
              <div className="mx-auto px-4 max-w-7xl sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <Link href="/">
                      <a className="group flex flex-shrink-0 items-center">
                        {/* <Image
                          className="block w-auto h-8 lg:hidden"
                          src={Logo}
                          alt="snowball"
                          height="32px"
                          width="32px"
                        />
                        <Image
                          className="hidden w-auto h-8 lg:block"
                          src={Logo}
                          alt="snowball"
                          height="32px"
                          width="32px"
                        /> */}
                        <Image
                          className="block w-auto h-8"
                          src={Logo}
                          alt="snowball"
                          height="32px"
                          width="32px"
                        />
                        <span className="ml-2 group-hover:text-blue-500 text-gray-600 text-lg font-bold transition-colors duration-200">
                          misikoff
                        </span>
                      </a>
                    </Link>
                    <div className="hidden sm:flex sm:-my-px sm:ml-6 sm:space-x-8">
                      {navigation.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <a
                            className={classNames(
                              item.current
                                ? 'border-indigo-500 text-gray-900'
                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                              'inline-flex items-center pt-1 px-1 text-sm font-medium border-b-2'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:items-center sm:ml-6">
                    <button
                      type="button"
                      className="p-1 text-gray-400 hover:text-gray-500 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="w-6 h-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="sr-only">Open user menu</span>
                          <div className="relative w-8 h-8">
                            <Image
                              className="rounded-full"
                              src={user.image}
                              alt=""
                              layout="fill" // required
                              objectFit="cover"
                            />
                          </div>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 py-1 w-48 bg-white rounded-md focus:outline-none shadow-lg origin-top-right ring-1 ring-black ring-opacity-5">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link href={item.href}>
                                  <a
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-gray-700 text-sm'
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                  <div className="flex items-center -mr-2 sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block w-6 h-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block w-6 h-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="pb-3 pt-2 space-y-1">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                          : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                        'block pl-3 pr-4 py-2 text-base font-medium border-l-4'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="pb-3 pt-4 border-t border-gray-200">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <div className="relative w-10 h-10">
                        <Image
                          className="rounded-full"
                          src={user.image}
                          alt=""
                          layout="fill" // required
                          objectFit="cover"
                        />
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-gray-800 text-base font-medium">
                        {user.name}
                      </div>
                      <div className="text-gray-500 text-sm font-medium">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="flex-shrink-0 ml-auto p-1 text-gray-400 hover:text-gray-500 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block px-4 py-2 text-gray-500 hover:text-gray-800 text-base font-medium hover:bg-gray-100"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div className="py-10">
          {/* <header>
            <div className="mx-auto px-4 max-w-7xl sm:px-6 lg:px-8">
              <h1 className="text-gray-900 text-3xl font-bold leading-tight">
                Dashboard
              </h1>
            </div>
          </header> */}
          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              {/* Replace with your content */}
              {/* <div className="px-4 py-8 sm:px-0">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
              </div> */}
              {children}
              {/* /End replace */}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
