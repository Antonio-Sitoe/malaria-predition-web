import { getCentralValue } from '@/utils/training/get-central-value'
import { processData } from '@/utils/training/data-processing'

export async function GET() {
  const malariaDataframe = await processData('src/utils/training/dataset.csv')
  const malariaDataList = malariaDataframe?.values.map((row: any) => {
    const cases = getCentralValue(row[2])
    const deaths = getCentralValue(row[3])
    const riskLevel = cases > 20000 || deaths > 5000 ? 'Alto' : 'Baixo'
    return {
      country: String(row[0]),
      year: Number(row[1]),
      region: String(row[4]),
      cases,
      deaths,
      riskLevel,
    }
  })
  return Response.json({ data: malariaDataList })
}
