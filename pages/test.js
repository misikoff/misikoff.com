import { useState } from 'react'
import Layout from 'components/layout'
var faunadb = require('faunadb'),
  q = faunadb.query

var client = new faunadb.Client({
  secret: process.env.NEXT_PUBLIC_FAUNA_SECRET,
  domain: 'db.us.fauna.com',
  // NOTE: Use the correct domain for your database's Region Group.
  port: 443,
  scheme: 'https',
})

// var createP = client.query(
//   q.Create(q.Collection('session'), { data: { testField: 'testValue' } })
// )

export default function Example() {
  const [doc, setDoc] = useState({ position: 4 })
  const docRef = q.Ref(q.Collection('session'), '314648997131190343')
  async function getDoc() {
    // console.log('get doc called')
    const y = await client.query(q.Get(docRef))
    console.log({ ydata: y.data })

    setDoc(y.data)
  }
  async function changeData() {
    console.log({ doc })
    console.log({ data: doc.active })
    await client.query(
      q.Update(docRef, {
        data: { active: !doc.active },
      })
    )
    console.log('updated')
  }

  var stream
  const startStream = () => {
    console.log('started stream')
    stream = client.stream
      .document(docRef)
      .on('snapshot', (snapshot) => {
        console.log({ snapshot })
        // report(snapshot)
      })
      .on('version', (version) => {
        console.log({ version })
        // report(version)
        setDoc(version.document.data)
      })
      .on('error', (error) => {
        console.log('Error:', error)
        stream.close()
        setTimeout(startStream, 1000)
      })
      .start()
  }

  startStream()

  //   const x = getDoc()
  //   setDoc(x.data)
  //   console.log({ doc: x })

  return (
    <Layout>
      here we go
      <br />
      <button onClick={() => getDoc()}>Click me to refetch </button>
      <br />
      <button onClick={() => changeData()}>Toggle Active</button>
      <br />
      position: <span>{doc.position}</span>
      <br />
      active: <span>{doc.active ? 'true' : 'false'}</span>
      <br />
    </Layout>
  )
}
