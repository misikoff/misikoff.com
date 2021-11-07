import Navbar from 'components/navbar'
import Footer from 'components/footer'

export default function Layout({ children }) {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  )
}
