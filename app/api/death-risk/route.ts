import DecisionTree from 'decision-tree'
import { MalariaData } from '@/@types'
import { DataFrame } from 'danfojs-node'
import { processData } from '@/utils/training/data-processing'
import { getProcessedMalariaList } from '@/utils/training/get-processed-malaria-data'

export async function POST(req: Request) {
  // try {
  //   const { data: testData } = req.body as {
  //     data: MalariaData
  //   }
  //   const malariaDataframe = await processData('src/training/dataset.csv')
  //   const { columns, data, target } = await getProcessedMalariaList(
  //     malariaDataframe as DataFrame
  //   )
  //   const dt = new DecisionTree(data, target, columns)
  //   function predictRisk(data: Omit<MalariaData, 'riskLevel'>): string {
  //     return dt.predict(data)
  //   }
  //   const predictedRisk = predictRisk(testData)
  //   console.log(`O nível de risco previsto é: ${predictedRisk}`)
  //   return reply.status(200).send({
  //     message: `O nível de risco previsto é: ${predictedRisk}`,
  //     predictedRisk,
  //     testData,
  //     data: data,
  //   })
  // } catch (error) {
  //   console.log(error)
  //   return reply.status(400).send({
  //     error,
  //   })
  // }
}
