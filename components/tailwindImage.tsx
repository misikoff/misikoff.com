'use client'

import { useState } from 'react'

import Image from 'next/image'
import { PhotoIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'

export default function TailwindImage({
  className = '',
  priority = false,
  src = '',
  alt = '',
  height = 100,
  width = 100,
  unsplash = false,
}) {
  const [isLoading, setLoading] = useState(true)
  if (unsplash) {
    src = src + `&fit=crop&w=${width}&h=${height}&q=80`
  }

  return src ? (
    <div className='overflow-clip rounded-md'>
      <Image
        priority={priority}
        src={src}
        alt={alt}
        height={height}
        width={width}
        className={clsx(
          className,
          'object-cover duration-700 ease-in-out group-hover:opacity-75',
          isLoading
            ? 'scale-110 blur-2xl grayscale'
            : 'scale-100 blur-0 grayscale-0'
        )}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  ) : (
    <PhotoIcon className={`${className} h-full w-full stroke-gray-400`} />
  )
}
