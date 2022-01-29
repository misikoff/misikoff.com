import TaillwindImage from 'components/twImage'
import Link from 'next/link'

function prettyDate(dateString: string) {
  const date = dateString
  const targetTime = new Date(date)
  const timeZoneFromDB = 6.0 // time zone value from database
  // get the timezone offset from local time in minutes
  const tzDifference = timeZoneFromDB * 60 + targetTime.getTimezoneOffset()
  // convert the offset to milliseconds, add to targetTime, and make a new Date
  const offsetTime = new Date(targetTime.getTime() + tzDifference * 60 * 1000)

  return offsetTime.toLocaleString([], {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
}

export default function PostList({
  posts = [] as Post[],
  pathPrefix = '',
  hideReadTime = false,
}) {
  console.log({ received: posts })
  return (
    <ul className='space-y-8'>
      {posts.map((article) => (
        <li key={article.frontMatter.title}>
          <Link href={pathPrefix + article.slug}>
            <a className='group my-4 cursor-pointer'>
              <div className=' flex w-full max-w-lg flex-col overflow-hidden rounded-lg shadow-md transition-shadow group-hover:shadow-lg'>
                <div className='w-full flex-shrink-0'>
                  <TaillwindImage
                    className='h-48 w-full'
                    src={article.frontMatter.thumbnailUrl}
                    alt='Article Image'
                    width={400}
                    height={200}
                  />
                </div>
                <div className='flex flex-1 flex-col justify-between bg-white p-6'>
                  <div className='flex-1 text-left'>
                    {article.frontMatter.tags &&
                      article.frontMatter.tags.length && (
                        <div className='inline-flex gap-x-2'>
                          {article.frontMatter.tags.map((tag) => (
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
                        {article.frontMatter.title}
                      </p>
                      <p className='mt-3 text-base text-gray-500'>
                        {article.frontMatter.description}
                      </p>
                    </div>
                  </div>
                  <div className='mt-6 flex items-center'>
                    <div className='flex w-full flex-col justify-between space-y-2 text-sm text-gray-500 sm:flex-row sm:space-x-1 sm:space-y-0'>
                      <div className='space-x-1'>
                        <time dateTime={article.frontMatter.date}>
                          {prettyDate(article.frontMatter.date)}
                        </time>
                        {article.frontMatter.readingTime && !hideReadTime && (
                          <>
                            <span aria-hidden='true'>&middot;</span>
                            <span>
                              {Math.ceil(
                                article.frontMatter.readingTime.time / 60000
                              )}
                              -minute read
                            </span>
                          </>
                        )}
                      </div>
                      {article.frontMatter.numbers && (
                        <div className='space-x-3'>
                          {Object.keys(article.frontMatter.numbers).map(
                            (name) => (
                              <span key={name}>
                                {article.frontMatter.numbers![name] && (
                                  <span className='inline-flex space-x-1 align-baseline'>
                                    <span className='font-mono font-semibold text-black'>
                                      {article.frontMatter.numbers![name]}
                                    </span>
                                    <span>
                                      {article.frontMatter.numbers![name] === 1
                                        ? name.substring(0, name.length - 1)
                                        : name}
                                    </span>
                                  </span>
                                )}
                              </span>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
