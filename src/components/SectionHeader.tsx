export default function SectionHeader({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <h2
      className={`uppercase font-serif mx-auto text-3xl sm:text-4xl tracking-[-.01em] text-center sm:text-left ${className}`}
    >
      {children}
    </h2>
  )
}
