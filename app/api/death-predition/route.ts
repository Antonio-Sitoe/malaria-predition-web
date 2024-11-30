import * as ss from 'simple-statistics';
import { DataFrame } from 'danfojs-node';
import { processData } from '@/utils/training/data-processing';
import { getProcessedMalariaData } from '@/utils/training/get-processed-malaria-data';
import { NextRequest } from 'next/server';
import { DATASET_PATH } from '@/lib/path-dataset';

function getYear(currentYearParams: any) {
  let year = Number(currentYearParams);
  const currentYear = new Date().getFullYear();
  return Number.isNaN(year) ? currentYear : year;
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  const region = params.get('region') || undefined;
  const country = params.get('country') || undefined;
  const year = getYear(params.get('year'));

  try {
    const malariaDataframe = await processData(DATASET_PATH);
    const { countryCounts, data, dataGrouped, countrys, regionsList } =
      await getProcessedMalariaData(
        malariaDataframe as DataFrame,
        region,
        country
      );
    const linearModelCases = ss.linearRegression(
      data.map((item) => [item.year, item.cases])
    );
    const linearModelDeaths = ss.linearRegression(
      data.map((item) => [item.year, item.deaths])
    );
    const predictedCases = ss.linearRegressionLine(linearModelCases)(year);
    const predictedDeaths = ss.linearRegressionLine(linearModelDeaths)(year);

    const deaths = predictedDeaths <= 0 ? 0 : predictedDeaths.toFixed();
    const cases = predictedCases <= 0 ? 0 : predictedCases.toFixed();
    const datasetQty = data.length;

    const percent = (predictedDeaths / predictedCases) * 100;
    const percentageDeaths = (percent <= 0 ? 0 : percent).toFixed(2);

    return Response.json({
      data: {
        deaths: {
          deaths,
          percentage: percentageDeaths
        },
        cases: cases,
        datasetQty,
        countryCounts,
        data: dataGrouped,
        regionsList,
        countrys
      }
    });
  } catch (error) {
    return new Response(`Erro ao buscar os dados: ${error}`, {
      status: 400
    });
  }
}
