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
  // add a prop for a component to render in the dialog
  Icon,
}: {
  className?: string
  children?: React.ReactNode
  title: string
  imagePath?: string // Optional, if you want to use a different image
  category?: 'SGL'
  Icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`rounded-lg shadow-md w-full p-6 bg-white cursor-pointer hover:shadow-lg transition ${className ?? ''}`}
        >
          <div className='-mt-6 -mx-6 rounded-t-lg h-48 relative'>
            <Image
              className='absolute inset-0 rounded-t-lg h-64 object-cover opacity-80 bg-[#f2f4f1]'
              src='/demo/image.png'
              alt={title}
              fill
            />
            <Icon className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2/3' />
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
