export default function Header({
  category,
  title,
  className,
  children,
}: {
  category?: string
  title?: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={className}>
      {category && (
        <span className='block text-center text-base font-semibold uppercase tracking-wide text-blue-600'>
          {category}
        </span>
      )}
      {title && (
        <h1>
          <span className=' mt-2 flex items-center justify-center gap-4 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl'>
            {title} {children}
          </span>
        </h1>
      )}
    </div>
  )
}
