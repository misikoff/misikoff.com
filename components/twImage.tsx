import Image from 'next/image'

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#222" offset="20%" />
      <stop stop-color="#333" offset="50%" />
      <stop stop-color="#222" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" class="fill-black" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export default function Example({
  className = '',
  priority = false,
  src = '',
  alt = '',
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        priority={priority}
        placeholder='blur'
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(50, 50))}`}
        src={src}
        alt={alt}
        fill
        className='rounded-md object-cover'
      />
      {/* <img
        src={`data:image/svg+xml;base64,${toBase64(shimmer(50, 50))}`}
        className="rounded-md"
      /> */}
    </div>
  )
}
