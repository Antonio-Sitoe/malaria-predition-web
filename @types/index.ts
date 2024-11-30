export interface MalariaData {
  country: string;
  year: number;
  cases: number;
  deaths: number;
  region: string;
}

export type IMalariaDataType = MalariaData[];
