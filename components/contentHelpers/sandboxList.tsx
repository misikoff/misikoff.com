import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { Sandbox } from 'contentlayer/generated'

import TailwindImage from 'components/tailwindImage'

export default function SandboxList({ sandboxes = [] as Sandbox[] }) {
  return (
    <ul className='space-y-8'>
      {sandboxes.map((sandbox) => (
        <li key={sandbox.title}>
          <Link href={sandbox.url} className='group my-4 cursor-pointer'>
            <div className=' flex w-full max-w-lg flex-col overflow-hidden rounded-lg shadow-md transition-shadow group-hover:shadow-lg'>
              <div className='w-full flex-shrink-0'>
                <TailwindImage
                  className='h-48 w-full'
                  src={sandbox.thumbnailUrl}
                  alt={sandbox.alt}
                  width={600}
                  height={450}
                  unsplash
                />
              </div>
              <div className='flex flex-1 flex-col justify-between bg-white p-6'>
                <div className='flex-1 text-left'>
                  {sandbox.tags && sandbox.tags.length && (
                    <div className='inline-flex gap-x-2'>
                      {sandbox.tags.map((tag) => (
                        <span
                          key={tag}
                          className='rounded-full bg-blue-400 px-2 py-1 text-xs font-semibold tracking-widest text-white'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className='mt-2 block'>
                    <p className='text-xl font-semibold text-gray-900'>
                      {sandbox.title}
                    </p>
                    <p className='mt-3 text-base text-gray-500'>
                      {sandbox.description}
                    </p>
                  </div>
                </div>
                <div className='mt-6 flex items-center'>
                  <div className='flex w-full flex-col justify-between space-y-2 text-sm text-gray-500 sm:flex-row sm:space-x-1 sm:space-y-0'>
                    <div className='space-x-1'>
                      <time dateTime={sandbox.date}>
                        {format(parseISO(sandbox.date), 'LLLL d, yyyy')}
                      </time>
                    </div>
                    {sandbox.numbers && (
                      <div className='space-x-3'>
                        {Object.keys(sandbox.numbers).map((name) => (
                          <span key={name}>
                            {sandbox.numbers![name] && (
                              <span className='inline-flex space-x-1 align-baseline'>
                                <span className='font-mono font-semibold text-black'>
                                  {sandbox.numbers![name]}
                                </span>
                                <span>
                                  {sandbox.numbers![name] === 1
                                    ? name.substring(0, name.length - 1)
                                    : name}
                                </span>
                              </span>
                            )}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
