'use client';

import { useGetCategoriesQuery, useGetProductsQuery } from '@/lib/services/api';
import dynamic from 'next/dynamic';
import { useState } from 'react';

interface ProductProps {
  datas: any;
}

const ProductLists = dynamic(
  () => import('../../common/components/ProductList'),
  {
    ssr: false,
    loading: () => <p className="text-black">Loading...</p>,
  }
);

const Products: React.FC<ProductProps> = ({ datas }) => {
  const [category, setCategory] = useState('');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);

  const {
    data = datas,
    isLoading,
    error,
  } = useGetProductsQuery({
    limit: 10,
    skip: (page - 1) * 10,
    category,
    order,
  });

  const { data: categories } = useGetCategoriesQuery(undefined);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const toggleSortOrder = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-4">
          <select
            className="p-2 border border-gray-300 rounded-lg bg-black shadow-sm"
            onChange={handleCategoryChange}
            value={category}
          >
            <option value="">All Categories</option>
            {categories?.map((cat: string) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400"
            onClick={toggleSortOrder}
          >
            Sort by Price: {order === 'asc' ? 'Low to High' : 'High to Low'}
          </button>
        </div>
      </div>

      <ProductLists products={data?.products} />

      <div className="flex justify-center mt-8 space-x-4">
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 disabled:opacity-50"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 disabled:opacity-50"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!data?.products.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
