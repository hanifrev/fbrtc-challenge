import dynamic from 'next/dynamic';

interface ProductDetailProps {
  data: {
    title: string;
    description: string;
    price: number;
    images: string[];
    stock: number;
  };
}

const Carousels = dynamic(() => import('../components/Carousel'), {
  ssr: false,
  loading: () => <p className="text-black text-bold">Loading images....</p>,
});

const ProductDetail = ({ data }: ProductDetailProps) => {
  return (
    <div className="container mx-auto py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">{data.title}</h1>
          <p className="text-2xl font-semibold text-gray-900">${data.price}</p>
        </div>

        <p className="text-gray-600 mt-4">{data.description}</p>

        <Carousels data={data} />

        <div className="mt-6">
          <span
            className={`inline-block px-3 py-1 rounded-full text-white ${
              data.stock > 0 ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {data.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
