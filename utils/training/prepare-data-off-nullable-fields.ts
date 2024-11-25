import { DataFrame } from 'danfojs-node'

export async function fillMissingWithMean(df: any): Promise<DataFrame> {
  df.columns.forEach((column: any) => {
    if (typeof df[column]?.values[0] === 'number') {
      const columnMean = df[column].mean()
      df[column] = df[column].fillna(columnMean)
    }
  })
  return df
}
