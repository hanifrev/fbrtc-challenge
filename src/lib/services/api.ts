import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import type { Action, PayloadAction } from '@reduxjs/toolkit';

type RootState = any;

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export const productApi = createApi({
  reducerPath: 'productApi',
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ limit = 10, skip = 0, category = '', order = 'asc' }) => {
        if (category) {
          return `products/category/${category}?limit=${limit}&skip=${skip}&sortBy=price&order=${order}`;
        }
        return `products?limit=${limit}&skip=${skip}&sortBy=price&order=${order}`;
      },
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),
    getCategories: builder.query({
      query: () => 'products/category-list',
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
} = productApi;
