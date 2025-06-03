'use client'

export default function VercelIcon({ className }: { className?: string }) {
  return (
    // <svg
    //   className={className}
    //   xmlns='http://www.w3.org/2000/svg'
    //   viewBox='0 0 24 24'
    //   fill='#000000'
    // >
    //   <path
    //     d='M12 2L1.5 21h21L12 2zM12 5.5l7.5 13.5H4.5L12 5.5z'
    //     fill='black'
    //   />
    // </svg>
    <svg
      className={`${className}`}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 100 100'
      fill='black'
    >
      <polygon points='50,5 95,86.6 5,86.6' />
    </svg>
  )
}
