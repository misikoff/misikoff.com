import Link from 'next/link'
import TailwindImage from 'components/tailwindImage'
import { Article, Sandbox } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'

export default function PostList({
  posts = [] as Article[] | Sandbox[],
  hideReadTime = false,
}) {
  return (
    <ul className='space-y-8'>
      {posts.map((post) => (
        <li key={post.title}>
          <Link href={post.url} className='group my-4 cursor-pointer'>
            <div className=' flex w-full max-w-lg flex-col overflow-hidden rounded-lg shadow-md transition-shadow group-hover:shadow-lg'>
              <div className='w-full flex-shrink-0'>
                <TailwindImage
                  className='h-48 w-full'
                  src={post.thumbnailUrl}
                  alt={post.alt}
                  width={600}
                  height={450}
                  unsplash
                />
              </div>
              <div className='flex flex-1 flex-col justify-between bg-white p-6'>
                <div className='flex-1 text-left'>
                  {post.tags && post.tags.length && (
                    <div className='inline-flex gap-x-2'>
                      {post.tags.map((tag) => (
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
                      {post.title}
                    </p>
                    <p className='mt-3 text-base text-gray-500'>
                      {post.description}
                    </p>
                  </div>
                </div>
                <div className='mt-6 flex items-center'>
                  <div className='flex w-full flex-col justify-between space-y-2 text-sm text-gray-500 sm:flex-row sm:space-x-1 sm:space-y-0'>
                    <div className='space-x-1'>
                      <time dateTime={post.date}>
                        {format(parseISO(post.date), 'LLLL d, yyyy')}
                      </time>
                      {post.readingTime && !hideReadTime && (
                        <>
                          <span aria-hidden='true'>&middot;</span>
                          <span>
                            {Math.ceil(post.readingTime / 60000)}
                            -minute read
                          </span>
                        </>
                      )}
                    </div>
                    {post.numbers && (
                      <div className='space-x-3'>
                        {Object.keys(post.numbers).map((name) => (
                          <span key={name}>
                            {post.numbers![name] && (
                              <span className='inline-flex space-x-1 align-baseline'>
                                <span className='font-mono font-semibold text-black'>
                                  {post.numbers![name]}
                                </span>
                                <span>
                                  {post.numbers![name] === 1
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
