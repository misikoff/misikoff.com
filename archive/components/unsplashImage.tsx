import Image from 'next/image'

import TailwindImage from '@/components/tailwindImage'

type UnsplashProps = {
  className?: string
  src: string
  alt?: string
  height: number
  width: number
  q: number
  facepad: number
  fit: string
  ixlib?: string
  auto?: string
  crop?: string
  dpr?: string
  skipTailwindWrapper?: boolean
}

export default function Layout({
  src,
  className = '',
  alt = '',
  height = 0,
  width = 0,
  q = 0,
  facepad = 0,
  fit = '',
  ixlib = '',
  auto = '',
  crop = '',
  dpr = '',
  skipTailwindWrapper = false,
}: UnsplashProps) {
  function fullSrc() {
    let fullSrc = src
    fullSrc += ixlib ? '?ixlib=' + ixlib : '?ixlib=rb-1.2.1'
    fullSrc += auto ? '&auto=' + auto : '&auto=format'
    fullSrc += fit ? '&fit=' + fit : ''
    fullSrc += crop ? '&crop=' + crop : ''
    fullSrc += width ? '&w=' + width : ''
    fullSrc += height ? '&h=' + height : ''
    fullSrc += dpr ? '&dpr=' + dpr : ''
    fullSrc += q ? '&q=' + q : ''
    fullSrc += facepad ? '&facepad=' + facepad : ''

    return fullSrc
  }

  if (skipTailwindWrapper) {
    return (
      <Image
        className={className}
        src={fullSrc()}
        alt={alt}
        width={width}
        height={height}
      />
    )
  } else {
    return <TailwindImage className={className} src={fullSrc()} alt={alt} />
  }
}
