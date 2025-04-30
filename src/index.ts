import fs from 'fs/promises'
import path from 'path'
import { extractDataFromPdf } from './extract'

const pdfDirPath = path.resolve(__dirname, '../pdfs')
const outputDirPath = path.resolve(__dirname, '../output')

async function makeCache() {
  const outputExists = await fs.exists(outputDirPath)
  if (!outputExists) {
    await fs.mkdir(outputDirPath)
  }

  const cacheExists = await fs.exists('cache.json')
  if (!cacheExists) {
    const pdfs = await fs.readdir(pdfDirPath)
    const cache = pdfs.map((pdf) => {
      return {
        name: pdf,
        done: false,
        path: path.resolve(pdfDirPath, pdf),
        outputPath: path.resolve(outputDirPath, pdf) + '.json',
      }
    })
    await fs.writeFile('cache.json', JSON.stringify(cache, null, 2))
  }
}

await makeCache()

type PDF = {
  name: string
  done: boolean
  path: string
  outputPath: string
}

async function main() {
  const pdfs: PDF[] = JSON.parse(await fs.readFile('cache.json', 'utf8'))
  for await (const pdf of pdfs) {
    if (pdf.done) continue

    console.log(`extracting data for ${pdf.name}`)
    pdf.done = true
    await fs.writeFile('cache.json', JSON.stringify(pdfs, null, 2))

    try {
      const { object: response } = await extractDataFromPdf(pdf.path)
      await fs.writeFile(pdf.outputPath, JSON.stringify(response, null, 2))
      process.exit(0)
    } catch (e) {
      console.log(e)
      pdf.done = false
      await fs.writeFile('cache.json', JSON.stringify(pdfs, null, 2))
      process.exit(1)
    }
  }
}

await main()
