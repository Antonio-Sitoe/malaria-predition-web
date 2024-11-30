'use client';

import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { columns } from './columns';
import { useQuery } from '@tanstack/react-query';
import { DataTableSkeleton } from '@/components/ui/data-table-skeleton';

interface ProductsClientProps {}

async function getDataSet() {
  const data = await fetch('/api/get-all-data');
  const json = await data.json();
  return json?.data;
}

export const UserClient: React.FC<ProductsClientProps> = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['/todos-data'],
    queryFn: getDataSet
  });

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Dados (${data?.length || 0})`}
          description="Encontre aqui a lista completa de todo dataset de (Malaria)"
        />
      </div>
      <Separator />
      {isLoading ? (
        <DataTableSkeleton
          columnCount={3}
          searchableColumnCount={1}
          filterableColumnCount={2}
          cellWidths={['10rem', '40rem', '12rem', '12rem']}
          shrinkZero
        />
      ) : (
        <DataTable searchKey="country" columns={columns} data={data} />
      )}
    </>
  );
};
