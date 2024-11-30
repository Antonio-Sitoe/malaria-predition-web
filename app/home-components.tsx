'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';

import * as React from 'react';
import { CartesianGrid, XAxis, Line, LineChart } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

import { ScrollArea } from '@/components/ui/scroll-area';
import { useQuery } from '@tanstack/react-query';

import { Database, Globe, ScissorsIcon, Skull } from 'lucide-react';
import { Combobox } from '@/components/ui/combo-box';

const chartConfig = {
  cases: {
    label: 'Casos',
    color: 'hsl(var(--chart-2))'
  },
  country: {
    label: 'Mortos',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig;

const years = [
  2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
  2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030
];

async function getDataSet({
  year,
  region,
  country
}: {
  year: number;
  region: string;
  country: string;
}) {
  const years = year ? `year=${year}` : '';
  const countrys = country ? `&country=${country}` : '';
  const regions = region ? `&region=${region}` : '';
  const data = await fetch(
    `/api/death-predition?${years}${countrys}${regions}`
  );
  const json = await data.json();
  return json?.data;
}

export function Home() {
  const [value, setValue] = React.useState('');
  const [region, setRegion] = React.useState('');
  const [year, setYear] = React.useState('');
  const { data, isLoading } = useQuery({
    queryKey: ['/getStatics', year, value, region],
    queryFn: () => getDataSet({ year: +year, region: region, country: value })
  });

  let chart_data = data?.data || [];

  if (value) {
    chart_data = chart_data.map((item: any) => {
      return {
        year: item.year,
        cases: item.data[0].cases,
        deaths: item.data[0].deaths
      };
    });
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Bem vindo ao nossa aplicacao 👋
          </h2>
          <div className="hidden items-center space-x-2 md:flex">
            <Combobox
              value={value}
              setValue={setValue}
              placeholder="Pais"
              frameworks={(data?.countrys || []).map((item: any) => ({
                label: item,
                value: item
              }))}
            />

            <Combobox
              value={region}
              setValue={setRegion}
              placeholder="Continente"
              frameworks={(data?.regionsList || []).map((item: any) => ({
                label: item,
                value: item
              }))}
            />

            <Combobox
              value={year.toString()}
              setValue={setYear}
              placeholder="Ano"
              frameworks={years.map((item: any) => ({
                label: `${item}`,
                value: `${item}`
              }))}
            />
          </div>
        </div>
        <div defaultValue="overview" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total de mortes
                </CardTitle>
                <Skull />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data?.deaths.deaths || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  {data?.deaths.percentage || 0}% de {data?.cases || 0}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total de casos
                </CardTitle>
                <ScissorsIcon />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data?.cases || 0}</div>
                <p className="text-xs text-muted-foreground">---</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Dados Analisados
                </CardTitle>
                <Database />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data?.datasetQty || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total de dados analisados.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Paises</CardTitle>
                <Globe />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data?.countryCounts || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total de paises analisados
                </p>
              </CardContent>
            </Card>
          </div>
          {isLoading ? (
            <div className="h-[40vh] w-full animate-pulse rounded-md bg-slate-200"></div>
          ) : (
            <>
              {value ? (
                <div className="grid grid-cols-1 gap-4">
                  <Card>
                    <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                      <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                        <CardTitle>
                          Grafico que ilustra os dados sobre Malaria
                        </CardTitle>
                        <CardDescription>
                          Showing total visitors for the last 3 months
                        </CardDescription>
                      </div>
                      <div className="flex">
                        <button className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                          <span className="text-xs text-muted-foreground">
                            Ano
                          </span>
                          <span className="text-lg font-bold leading-none sm:text-3xl">
                            {year}
                          </span>
                        </button>
                      </div>
                    </CardHeader>
                    <CardContent className="px-2 sm:p-6">
                      <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[250px] w-full"
                      >
                        <LineChart
                          accessibilityLayer
                          data={chart_data || []}
                          margin={{
                            left: 12,
                            right: 12
                          }}
                        >
                          <CartesianGrid vertical={false} />
                          <XAxis
                            dataKey="year"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => value}
                          />
                          <ChartTooltip
                            content={
                              <ChartTooltipContent
                                className="w-[190px]"
                                nameKey="deaths"
                              />
                            }
                          />
                          <ChartTooltip
                            content={
                              <ChartTooltipContent
                                className="w-[190px]"
                                nameKey="cases"
                              />
                            }
                          />

                          <Line
                            dataKey="deaths"
                            type="linear"
                            strokeWidth={2}
                            dot={false}
                            color="#252525"
                          />
                          <Line
                            dataKey="cases"
                            type="monotone"
                            strokeWidth={2}
                            dot={false}
                            color="#252525"
                          />
                        </LineChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {chart_data.map((item: any) => {
                    return (
                      <Card key={item.year}>
                        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                            <CardTitle>
                              Grafico que ilustra os dados sobre Malaria
                            </CardTitle>
                            <CardDescription>
                              Showing total visitors for the last 3 months
                            </CardDescription>
                          </div>
                          <div className="flex">
                            <button className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                              <span className="text-xs text-muted-foreground">
                                Ano
                              </span>
                              <span className="text-lg font-bold leading-none sm:text-3xl">
                                {item.year}
                              </span>
                            </button>
                          </div>
                        </CardHeader>
                        <CardContent className="px-2 sm:p-6">
                          <ChartContainer
                            config={chartConfig}
                            className="aspect-auto h-[250px] w-full"
                          >
                            <LineChart
                              accessibilityLayer
                              data={item.data || []}
                              margin={{
                                left: 12,
                                right: 12
                              }}
                            >
                              <CartesianGrid vertical={false} />
                              <XAxis
                                dataKey="country"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                tickFormatter={(value) => value}
                              />
                              <ChartTooltip
                                content={
                                  <ChartTooltipContent
                                    className="w-[190px]"
                                    nameKey="deaths"
                                  />
                                }
                              />
                              <ChartTooltip
                                content={
                                  <ChartTooltipContent
                                    className="w-[190px]"
                                    nameKey="cases"
                                  />
                                }
                              />

                              <Line
                                dataKey="deaths"
                                type="linear"
                                strokeWidth={2}
                                dot={false}
                                color="#252525"
                              />
                              <Line
                                dataKey="cases"
                                type="monotone"
                                strokeWidth={2}
                                dot={false}
                                color="#252525"
                              />
                            </LineChart>
                          </ChartContainer>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </ScrollArea>
  );
}
