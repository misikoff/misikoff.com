import { jobs } from './constants/workExperience'

export function createAIRequest() {
  console.log('Creating AI request...')
  // create a the text of the request: it should be a string that lists all the work experiences as json objects
  // and then asks the ai which of the experiences are relevant to the job description

  // Given the following work experiences, which ones are relevant to the job description?\\n\\n
  const requestString = `{
  "prompt": "${JSON.stringify([...jobs], null, 2)}`

  return requestString
}
