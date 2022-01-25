import Head from 'next/head'

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center py-2'>
      <Head>
        <title>Sandboxes</title>
      </Head>

      <main className='flex w-full flex-1 flex-col items-center justify-center px-20 text-center'></main>
    </div>
  )
}
