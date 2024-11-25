import { IMalariaDataType } from '@/@types'
import * as DF from 'danfojs-node'
import { getCentralValue } from './get-central-value'
import { fillMissingWithMean } from './prepare-data-off-nullable-fields'

export async function getProcessedMalariaData(
  csvData: DF.DataFrame,
  region?: string,
  country?: string
): Promise<IMalariaDataType> {
  let dfs: DF.DataFrame = csvData

  if (country) {
    const regionSeries = dfs['Country']
    dfs = dfs.query(regionSeries.eq(country)) as DF.DataFrame
  } else if (region) {
    const regionSeries = dfs['WHO Region'] // Coluna de região
    dfs = dfs.query(regionSeries.eq(region)) as DF.DataFrame
  }

  dfs.$setColumnNames(['country', 'year', 'cases', 'deaths', 'region'])

  const malariaData = await fillMissingWithMean(dfs)

  const malariaDataList: IMalariaDataType = malariaData.values.map(
    (row: any) => {
      return {
        country: String(row[0]),
        year: Number(row[1]),
        cases: getCentralValue(row[2]),
        deaths: getCentralValue(row[3]),
        region: String(row[4]),
      }
    }
  )

  return malariaDataList
}

export async function getProcessedMalariaList(dfs: DF.DataFrame) {
  dfs.$setColumnNames(['country', 'year', 'cases', 'deaths', 'region'])
  const malariaData = await fillMissingWithMean(dfs)

  const malariaDataList: IMalariaDataType = malariaData.values.map(
    (row: any) => {
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
    }
  )
  const target = 'riskLevel'
  const columns = malariaData.columns
  malariaData.head().print()
  return {
    data: malariaDataList,
    columns,
    target,
  }
}
