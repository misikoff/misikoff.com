'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import clsx from 'clsx'
import { ImGithub, ImNpm } from 'react-icons/im'
import { IoLogoPython, IoPower } from 'react-icons/io5'
import { Package } from 'contentlayer/generated'

import RIcon from '@/components/icons/r'
import { shuffle } from '@/lib/utilityFunctions'

export default function PackageList({ packages }: { packages: Package[] }) {
  function PackageBlock({ pack }: { pack: Package }) {
    const packageFound = displayPackages.includes(pack)

    return (
      <div className='@container'>
        <figure
          className={clsx(
            'group space-y-6 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5 transition hover:shadow-xl @lg:space-y-8 @lg:p-10',
            !packageFound && 'hidden',
          )}
        >
          {pack.ecosystem === 'npm' && (
            <div className='ml-auto mr-0 flex flex-row-reverse'>
              <ImNpm className='h-4 w-4' />
            </div>
          )}
          {pack.ecosystem === 'r' && (
            <div className='ml-auto mr-0 flex flex-row-reverse'>
              <RIcon className='h-4 w-4' />
            </div>
          )}
          {pack.ecosystem === 'python' && (
            <div className='ml-auto mr-0 flex flex-row-reverse'>
              <IoLogoPython className='h-4 w-4' />
            </div>
          )}
          <p className='text-left text-gray-900 @lg:text-xl @lg:font-semibold @lg:tracking-tight'>
            {pack.description}
          </p>
          <figcaption className='flex items-center gap-x-4'>
            <div className='flex-auto'>
              <Link
                href={pack.url}
                className='font-semibold transition-colors duration-150 hover:text-blue-600'
              >
                {pack.title}
              </Link>
            </div>
          </figcaption>
          <div className='flex justify-between'>
            <div>
              {pack.enabled && (
                <div className='items-top flex gap-2'>
                  <IoPower className='h-4 w-4 fill-green-400 group-hover:animate-pulse' />
                  <span className='font-mono text-xs'>enabled</span>
                </div>
              )}
            </div>
            {pack.repo && (
              <a href={pack.repo}>
                <span className='sr-only'>{pack.title} repository</span>
                <ImGithub
                  className='h-6 w-6 fill-gray-400 transition-all duration-75 hover:fill-gray-500'
                  aria-hidden='true'
                />
              </a>
            )}
          </div>
        </figure>
      </div>
    )
  }

  const [allPacks, setAllPacks] = useState<Package[]>([])
  const [displayPackages, setDisplayPackages] = useState<Package[]>([])
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    const packs = shuffle(packages)
    setAllPacks(packs)
  }, [packages])

  useEffect(() => {
    setDisplayPackages(
      allPacks.filter((pack) => {
        return pack.title.toLowerCase().includes(search.toLowerCase())
      }),
    )
  }, [allPacks, search])

  return (
    <>
      {/* <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
        <div>
          <label
            htmlFor='search'
            className='block text-sm font-semibold leading-6 text-gray-900'
          >
            Search
          </label>
          <div className='mt-2.5'>
            <input
              type='text'
              name='search'
              id='search'
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
              }}
              className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
          searching for {search}
        </div>
      </div> */}
      <div
        className='mx-auto mt-4 grid w-full max-w-md grid-flow-dense
          grid-cols-1 grid-rows-[masonry] gap-8 text-sm
          leading-6 text-gray-900 sm:mt-20 sm:max-w-2xl
          sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-cols-4'
      >
        {packages.map((pack) => (
          <div
            key={pack.title}
            className='odd:sm:col-span-2 first:xl:col-start-2'
          >
            <PackageBlock pack={pack} />
          </div>
        ))}
      </div>
    </>
  )
}
