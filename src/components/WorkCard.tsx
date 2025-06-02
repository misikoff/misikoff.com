'use client'

import Image from 'next/image'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  // DialogDescription,
} from './ui/dialog'

export default function WorkCard({
  className,
  children,
  title,
  imagePath,
  category,
}: {
  className?: string
  children?: React.ReactNode
  title: string
  imagePath?: string // Optional, if you want to use a different image
  category?: 'SGL'
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`rounded-lg shadow-md w-full max-w-64 p-6 bg-white cursor-pointer hover:shadow-lg transition ${className ?? ''}`}
        >
          <div className='-mt-6 -mx-6 bg-blue-400 rounded-t-lg h-48 relative'>
            <Image
              className='absolute inset-0 rounded-t-lg h-64 object-cover'
              src={imagePath ?? '/default-image.jpg'}
              alt={title}
              fill
            />
            {category && (
              <span className='absolute top-2 left-2 bg-white/80 text-xs font-semibold px-2 py-1 rounded shadow'>
                {category}
              </span>
            )}
          </div>
          <h3 className='pt-4 text-lg font-semibold mb-2 text-center'>
            {title}
          </h3>
          <p className='text-gray-600'>Learn more</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className='text-center'>{title}</DialogTitle>
        {/* <DialogDescription> */}
        <div>{children}</div>
        {/* </DialogDescription> */}
      </DialogContent>
    </Dialog>
  )
}
