import { IMalariaDataType } from '@/@types';
import * as DF from 'danfojs-node';
import { getCentralValue } from './get-central-value';
import { fillMissingWithMean } from './prepare-data-off-nullable-fields';

import * as dfd from 'danfojs-node';

export async function getProcessedMalariaData(
  csvData: dfd.DataFrame,
  region?: string,
  country?: string
) {
  let dfs: dfd.DataFrame = csvData;

  // Filtragem de acordo com os parâmetros
  if (country) {
    const regionSeries = dfs['Country'];
    dfs = dfs.query(regionSeries.eq(country)) as dfd.DataFrame;
  } else if (region) {
    const regionSeries = dfs['WHO Region']; // Coluna de região
    dfs = dfs.query(regionSeries.eq(region)) as dfd.DataFrame;
  }

  // Renomeia as colunas
  dfs.$setColumnNames(['country', 'year', 'cases', 'deaths', 'region']);

  // Preenchimento de valores ausentes
  const malariaData = await fillMissingWithMean(dfs);

  // Agrupamento por "country" e contagem
  const grouped = malariaData.groupby(['country']);
  const countryCounts = grouped.col(['country']).agg({
    country: 'count'
  });

  const regionsList = malariaData
    .groupby(['region'])
    .col(['region'])
    .count()
    .values.flatMap((item) => item)
    .filter((item) => typeof item === 'string');

  const countrys = malariaData
    .groupby(['country'])
    .col(['country'])
    .count()
    .values.flatMap((item) => item)
    .filter((item) => typeof item === 'string');

  const malariaDataList = malariaData.values.map((row: any) => ({
    country: String(row[0]),
    year: Number(row[1]),
    cases: getCentralValue(row[2]),
    deaths: getCentralValue(row[3]),
    region: String(row[4])
  }));

  // Agrupando por ano usando JavaScript
  const dataGroupedByYear = malariaDataList.reduce(
    (acc, item) => {
      const year = item.year;
      if (!acc[year]) {
        acc[year] = { year, data: [] };
      }
      acc[year].data.push(item as any);
      return acc;
    },
    {} as Record<number, { year: number; data: IMalariaDataType[] }>
  );

  const groupedArray = Object.values(dataGroupedByYear);

  return {
    data: malariaDataList || [],
    dataGrouped: groupedArray || [],
    countryCounts: countryCounts.values.length || 0,
    regionsList,
    countrys
  };
}

export async function getProcessedMalariaList(dfs: DF.DataFrame) {
  dfs.$setColumnNames(['country', 'year', 'cases', 'deaths', 'region']);
  const malariaData = await fillMissingWithMean(dfs);

  const malariaDataList: IMalariaDataType = malariaData.values.map(
    (row: any) => {
      const cases = getCentralValue(row[2]);
      const deaths = getCentralValue(row[3]);
      const riskLevel = cases > 20000 || deaths > 5000 ? 'Alto' : 'Baixo';
      return {
        country: String(row[0]),
        year: Number(row[1]),
        region: String(row[4]),
        cases,
        deaths,
        riskLevel
      };
    }
  );
  const target = 'riskLevel';
  const columns = malariaData.columns;
  malariaData.head().print();
  return {
    data: malariaDataList,
    columns,
    target
  };
}
