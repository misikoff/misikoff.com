export default function Navbar({ className }: { className?: string }) {
  return (
    <nav
      className={`uppercase bg-red-400 backdrop-blur-md  opacity-50 font-serif mx-auto text-3xl sm:text-4xl tracking-[-.01em] text-center sm:text-left ${className}`}
    >
      Logo
    </nav>
  )
}
