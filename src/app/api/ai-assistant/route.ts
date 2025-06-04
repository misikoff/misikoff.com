import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req: Request) {
  console.log('Received request to AI assistant')

  const { message } = await req.json()
  // console.log('Request body:', body)
  // const userMessage: string = body.message
  // console.log('User message:', userMessage)
  console.log('Parsed message:', message)
  console.log('done')
  // const assistantId = 'asst_aebNDep3icTgRfCc93oNFe0L'

  const client = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
  })

  const response = await client.responses.create({
    model: 'gpt-4o',
    instructions:
      // strat 1: only include the actions that are relevant to the job description
      // 'Given the following job description link and work experiences, which jobs and actions are most relevant to the job description? Return a json dictionary with the job ids as the keys and the actions as an array of ids. do not return anything but the json object',

      // strat2 : include all actions and sort them by relevance
      'Given the following job description link and work experiences, which jobs and actions are most relevant to the job description?  Return a json dictionary with the job ids as the keys and the actions as an array of ids sorted by relevance. Include all action ids. Do not return anything but the json object',
    input: message, // this should be a string that contains the job description and the work experiences
  })

  console.log(response.output_text)

  return NextResponse.json(response.output_text)
}
