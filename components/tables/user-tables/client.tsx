'use client';

import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { columns } from './columns';
import { useEffect, useState } from 'react';

interface ProductsClientProps {}

export const UserClient: React.FC<ProductsClientProps> = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/get-all-data')
      .then((response) => response.json())
      .then((json) => {
        setData(json.data ? json.data : []);
      });
  }, []);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Users (${data.length})`}
          description="Manage users (Client side table functionalities.)"
        />
      </div>
      <Separator />
      <DataTable searchKey="country" columns={columns} data={data} />
    </>
  );
};
