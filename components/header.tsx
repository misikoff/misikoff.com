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
        <span className="block text-center text-blue-600 text-base font-semibold tracking-wide uppercase">
          {category}
        </span>
      )}
      {title && (
        <h1>
          <span className="block mt-2 text-center text-gray-900 text-3xl font-extrabold tracking-tight leading-8 sm:text-4xl">
            {title}
          </span>
        </h1>
      )}
    </div>
  )
}
