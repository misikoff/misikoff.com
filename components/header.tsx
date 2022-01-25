export default function Header({
  category,
  title,
}: {
  category?: string
  title?: string
}) {
  return (
    <div>
      {category && (
        <span className='block text-center text-base font-semibold uppercase tracking-wide text-blue-600'>
          {category}
        </span>
      )}
      {title && (
        <h1>
          <span className='mt-2 block text-center text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl'>
            {title}
          </span>
        </h1>
      )}
    </div>
  )
}
