import Link from 'next/link'
import Globe from 'components/globe'

export default function Example() {
  return (
    <div className="relative overflow-hidden">
      <div
        className="hidden sm:absolute sm:inset-y-0 sm:block sm:h-full sm:w-full"
        aria-hidden="true"
      >
        <div className="relative mx-auto h-full max-w-7xl">
          <svg
            className="absolute right-full translate-x-1/4 translate-y-1/4 transform lg:translate-x-1/2"
            width="404"
            height="784"
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="404"
              height="784"
              fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
            />
          </svg>
          <svg
            className="absolute left-full -translate-x-1/4 -translate-y-3/4 transform md:-translate-y-1/2 lg:-translate-x-1/2"
            width="404"
            height="784"
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="404"
              height="784"
              fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
            />
          </svg>
        </div>
      </div>

      <div className="relative pb-16 pt-6 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6" />

        <main className="mx-auto max-w-7xl px-4 sm:mt-0">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="">Thomas Misikoff</span>
              <div className="flex flex-row items-center justify-center text-2xl text-blue-600 sm:text-3xl md:text-4xl">
                <span> software engineer </span>

                <span className="px-2 text-black"> • </span>

                <span> statistical analyst </span>
              </div>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-left text-base text-gray-500 sm:text-lg md:mt-8 md:max-w-3xl md:text-xl">
              This is a growing hub where I discuss novel concepts and their
              applications.
              <br />
              <br />
              Content is broken up into{' '}
              <span className="px-1 font-mono text-blue-600">
                articles
              </span> and{' '}
              <span className="pl-1 font-mono text-blue-600">sandboxes</span>.
              Articles have a narrative focus, often introducing concepts to be
              explored experimentally through sandboxes.
            </p>
            <div className="mx-auto mt-8 max-w-md sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link href="/articles">
                  <a className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 md:px-10 md:py-4 md:text-lg">
                    Read Articles
                  </a>
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:ml-3 sm:mt-0">
                <Link href="/sandboxes">
                  <a className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-blue-600 hover:bg-gray-50 md:px-10 md:py-4 md:text-lg">
                    Explore Sandboxes
                  </a>
                </Link>
              </div>
            </div>
            <Globe />
          </div>
        </main>
      </div>
    </div>
  )
}
