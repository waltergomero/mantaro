import Search from '@/components/ui/search';
import Table from '@/components/products/table';
import { CreateProduct } from '@/components/products/buttons';
import { Suspense } from 'react';

export const metadata = {  title: 'Products',};

export default async function ProductPage({ searchParams,}) {

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
 
  return (
    <div className="w-full">

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-2">
        <Search placeholder="Search for products..." />
        <CreateProduct />
      </div>
      <Suspense key={query + currentPage} >
        <Table query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}