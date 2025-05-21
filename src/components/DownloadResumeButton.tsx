'use client'

import posthog from 'posthog-js'

export default function DownloadResumeButton() {
  return (
    <a
      href='/TM-resume.pdf'
      onClick={() => {
        console.log('clicked')
        posthog.capture('download_resume', {
          // distinct_id: posthog.get_distinct_id(),
          // href: '/TM-resume.pdf',
          // href: process.env.NEXT_PUBLIC_RESUME_DOWNLOAD_URL,
        })
      }}
      // href={process.env.NEXT_PUBLIC_RESUME_DOWNLOAD_URL}
      download
      className='flex items-center drop-shadow-sm hover:drop-shadow-md justify-center font-medium px-3 py-1 border-stone-300  text-black border-1 rounded-full bg-stone-100 hover:bg-stone-200 transition duration-300 ease-in-out'
    >
      Download Resume
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth='2'
        stroke='currentColor'
        className='ml-2 size-4'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3'
        />
      </svg>
    </a>
  )
}
