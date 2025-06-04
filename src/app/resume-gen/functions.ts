export default async function getParsedJobDescription(jobUrl: string) {
  // curl the jasync async ob link and return the body
  const res = await fetch(`https://corsproxy.io/?url=${jobUrl}`)
  console.log({ res })
  // read body and log it
  const body = await res.text() // Read the response body as text
  console.log({ body })
  // remove all svgs
  const parser = new DOMParser()
  const doc = parser.parseFromString(body, 'text/html')
  doc.querySelectorAll('svg').forEach((svg) => {
    svg.remove()
  })
  // remove all script tags
  doc.querySelectorAll('script').forEach((script) => {
    script.remove()
  })
  // remove all style tags
  doc.querySelectorAll('style').forEach((style) => {
    style.remove()
  })
  // remove all meta tags
  doc.querySelectorAll('meta').forEach((meta) => {
    meta.remove()
  })
  // remove all classes
  doc.querySelectorAll('*').forEach((el) => {
    // el.removeAttribute('class')
    // el.removeAttribute('style')
    // el.removeAttribute('id')
    Array.from(el.attributes).forEach((attr) => el.removeAttribute(attr.name))
  })

  // remove empty elements
  doc.querySelectorAll('*:empty').forEach((el) => {
    el.remove()
  })
  doc.querySelectorAll('*:empty').forEach((el) => {
    el.remove()
  })
  doc.querySelectorAll('*:empty').forEach((el) => {
    el.remove()
  })
  doc.querySelectorAll('*:empty').forEach((el) => {
    el.remove()
  })
  doc.querySelectorAll('*:empty').forEach((el) => {
    el.remove()
  })

  // remove all comments
  doc.querySelectorAll('*').forEach((el) => {
    if (el.nodeType === Node.COMMENT_NODE) {
      el.remove()
    }
  })
  const parsedBody = doc.body.innerHTML
  console.log({ parsedBody })
  return parsedBody
}
