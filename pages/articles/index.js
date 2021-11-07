import Head from 'next/head'
import Layout from 'components/layout'

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-2">
        <Head>
          <title>Articles</title>
        </Head>

        <main className="flex flex-1 flex-col items-center justify-center px-20 w-full text-center"></main>
      </div>
    </Layout>
  )
}
