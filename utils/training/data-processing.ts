import * as dfd from 'danfojs-node';

export async function processData(path: string) {
  try {
    const csvFile = await dfd.readCSV(path);
    const csvData = csvFile.loc({
      columns: [
        'Country',
        'Year',
        'No. of cases',
        'No. of deaths',
        'WHO Region'
      ]
    });

    return csvData;
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
    return null;
  }
}
