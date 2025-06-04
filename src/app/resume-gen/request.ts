export async function createAIRequest(jobs: any, body: string) {
  console.log('Creating AI request...')
  // create a the text of the request: it should be a string that lists all the work experiences as json objects
  // and then asks the ai which of the experiences are relevant to the job description

  // Given the following work experiences, which ones are relevant to the job description?\\n\\n

  console.log({ jobs })
  const payload = jobs.map((job: any, index: number) => ({
    id: index,
    actions: job.actions.map((action: any, aIndex: number) => ({
      index: aIndex,
      text: action.text,
      stack: action.stack || [],
    })),
  }))
  console.log({ payload })

  const message = { message: `${body} \n${JSON.stringify(payload)}` }

  console.log(message)

  const res = await fetch('/api/ai-assistant', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  })

  const data = await res.json()
  console.log('AI response:', data)
  console.log({
    res: JSON.parse(data.replaceAll('```', '').replace('json', '')),
  })

  // example response from AI
  // // assumes bestSkills is an object where keys are job indices and values are arrays of action indices and does not order remaining items
  // const bestSkills = {
  //   '0': [0, 1, 2, 9, 10, 17, 18, 21],
  //   '1': [0, 1, 2, 3],
  //   '2': [0, 3, 5],
  // }

  return JSON.parse(data.replaceAll('```', '').replace('json', '')) as {
    [key: string]: number[]
  }
}
