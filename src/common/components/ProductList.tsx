import Image from 'next/image';

interface ProductType {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  price: number;
}

interface ProductListProps {
  products: ProductType[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="container mx-auto py-8">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <li
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src={product.thumbnail}
              alt={product.title}
              loading="lazy"
              className="w-full h-48 object-cover"
              width={100}
              height={100}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 truncate">
                {product.title}
              </h2>
              <p className="text-gray-600 text-sm mt-2 truncate">
                {product.description}
              </p>
              <p className="text-gray-900 font-bold mt-4">${product.price}</p>
              <a
                href={`/${product.id}`}
                className="inline-block mt-4 text-blue-500 hover:underline"
              >
                View Details
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
