import Products from '@/modules/Products/page';

export default async function Home() {
  const data = await fetch(
    'https://dummyjson.com/products?limit=10&skip=0&sortBy=price&order=asc',
    { cache: 'no-store' }
  );
  const initialData = JSON.parse(JSON.stringify(data));
  return <Products datas={initialData} />;
}
