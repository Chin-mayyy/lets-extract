import { google } from '@ai-sdk/google'
import { generateObject } from 'ai'
import { voter_schema } from './schema'
import { readFile } from 'fs/promises'

const model = google('gemini-2.5-pro-exp-03-25')

export async function extractDataFromPdf(pdfPath: string) {
  return generateObject({
    model,
    schema: voter_schema,
    system:
      `you will get a pdf with the details of the voters` +
      `plese extract the data from the pdf` +
      `ignore the pages which do not include voters data`,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'file',
            data: await readFile(pdfPath),
            mimeType: 'application/pdf',
          },
        ],
      },
    ],
  })
}
