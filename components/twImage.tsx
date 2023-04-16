'use client'

import { useState } from 'react'
import Image from 'next/image'
import { clsx as classNames } from 'clsx'
import { PhotoIcon } from '@heroicons/react/24/outline'

export default function Example({
  className = '',
  priority = false,
  src = '',
  alt = '',
}) {
  const [isLoading, setLoading] = useState(true)

  return src ? (
    <div className='overflow-clip rounded-md'>
      <Image
        priority={priority}
        src={src}
        alt={alt}
        height={300}
        width={400}
        className={classNames(
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
