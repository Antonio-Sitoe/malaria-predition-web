import * as ss from 'simple-statistics'
import { DataFrame } from 'danfojs-node'
import { processData } from '@/utils/training/data-processing'
import { getProcessedMalariaData } from '@/utils/training/get-processed-malaria-data'

export async function POST(req: Request) {
  // const {
  //   region,
  //   country,
  //   year = new Date().getFullYear(),
  // } = req.query as {
  //   region?: string
  //   country?: string
  //   year?: number
  // }
  // try {
  //   const malariaDataframe = await processData('src/training/dataset.csv')
  //   const malariaLista = await getProcessedMalariaData(
  //     malariaDataframe as DataFrame,
  //     region,
  //     country
  //   )
  //   const linearModelCases = ss.linearRegression(
  //     malariaLista.map((item) => [item.year, item.cases])
  //   )
  //   const linearModelDeaths = ss.linearRegression(
  //     malariaLista.map((item) => [item.year, item.deaths])
  //   )
  //   const predictedCases = ss.linearRegressionLine(linearModelCases)(year)
  //   const predictedDeaths = ss.linearRegressionLine(linearModelDeaths)(year)
  //   return reply.status(200).send({
  //     data: {
  //       deaths: {
  //         qty: predictedDeaths.toFixed(),
  //         message: `Previsão de Mortes para o ano (${year}): ${predictedDeaths.toFixed()}`,
  //       },
  //       cases: {
  //         qty: predictedCases.toFixed(),
  //         message: `Previsão de Casos para o ano (${year}): ${predictedCases.toFixed()}`,
  //       },
  //       data: malariaLista,
  //     },
  //   })
  // } catch (error) {
  //   return reply.status(400).send({
  //     error,
  //   })
  // }
}
