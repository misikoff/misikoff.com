import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { Article } from 'contentlayer/generated'

import TailwindImage from '@/components/tailwindImage'

export default function ArticleList({ articles = [] as Article[] }) {
  return (
    <ul className='space-y-8'>
      {articles.map((article) => (
        <li key={article.title}>
          <Link href={article.url} className='group my-4 cursor-pointer'>
            <div className=' flex w-full max-w-lg flex-col overflow-hidden rounded-lg shadow-md transition-shadow group-hover:shadow-lg'>
              <div className='w-full flex-shrink-0'>
                <TailwindImage
                  className='h-48 w-full'
                  src={article.thumbnailUrl}
                  alt={article.alt}
                  width={600}
                  height={450}
                  unsplash={article.thumbnailUnsplash}
                />
              </div>
              <div className='flex flex-1 flex-col justify-between bg-white p-6'>
                <div className='flex-1 text-left'>
                  {article.tags && article.tags.length && (
                    <div className='inline-flex gap-x-2'>
                      {article.tags.map((tag) => (
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
                      {article.title}
                    </p>
                    <p className='mt-3 text-base text-gray-500'>
                      {article.description}
                    </p>
                  </div>
                </div>
                <div className='mt-6 flex items-center'>
                  <div className='flex w-full flex-col justify-between space-y-2 text-sm text-gray-500 sm:flex-row sm:space-x-1 sm:space-y-0'>
                    <div className='space-x-1'>
                      <time dateTime={article.date}>
                        {format(parseISO(article.date), 'LLLL d, yyyy')}
                      </time>
                      {article.readingTime && (
                        <>
                          <span aria-hidden='true'>&middot;</span>
                          <span>
                            {Math.ceil(article.readingTime / 60000)}
                            -minute read
                          </span>
                        </>
                      )}
                    </div>
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
