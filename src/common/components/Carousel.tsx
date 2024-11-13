import Image from 'next/image';
import React from 'react';

interface CarouselProps {
  data: {
    title: string;
    // description: string;
    // price: number;
    images: string[];
    // stock: number;
  };
}

const Carousel: React.FC<CarouselProps> = ({ data }) => {
  return (
    <div className="mt-6">
      <div className="flex space-x-4 overflow-x-scroll no-scrollbar">
        {data.images.map((img: any, index: number) => (
          <div
            key={index}
            className="flex-shrink-0 rounded-lg overflow-hidden shadow-md"
          >
            <Image
              src={img}
              alt={data.title}
              width={600}
              height={400}
              className="object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
