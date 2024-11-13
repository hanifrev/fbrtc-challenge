'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useGetProductByIdQuery } from '@/lib/services/api';
import dynamic from 'next/dynamic';

const ProductDetails = dynamic(
  () => import('../../common/components/ProductDetail'),
  {
    ssr: false,
    loading: () => <p className="text-black">Loading....</p>,
  }
);

const DetailProduct = () => {
  const params: any = useParams();
  console.log(params.product);

  const { data, isLoading, error } = useGetProductByIdQuery(params.product);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product</p>;

  console.log(data);

  return <ProductDetails data={data} />;
};

export default DetailProduct;
