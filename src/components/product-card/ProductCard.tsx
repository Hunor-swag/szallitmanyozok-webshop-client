import { Product } from '@/types/typings';
import Link from 'next/link';
import ProductDetailsButton from './ProductDetailsButton';
import AddToCartButton from './AddToCartButton';
import Image from 'next/image';

type Props = {
  product: Product;
};

export default async function ProductCard({ product }: Props) {
  const hasImage =
    Array.isArray(product.attributes.image?.data) &&
    product.attributes.image?.data[0].attributes.url;

  return (
    <div className='flex flex-col space-y-2 border border-gray-300 p-6 items-center transition-colors duration-200 cursor-pointer hover:shadow-xl hover:border-blue-300 text-lg'>
      {/* className='flex flex-col space-y-2 border border-gray-300 p-6 items-center
      transition-colors duration-200 cursor-pointer hover:shadow-xl
      hover:border-blue-300 xs:w-full sm:w-1/2 xs:mx-[5%] sm:mx-0 md:w-1/3
      sm:max-w-xs text-lg' */}
      <div className='h-full w-full mb-8'>
        <Link href={`/product/${product.id}`} className='h-full w-full'>
          {/* Image */}
          <img
            src={
              hasImage
                ? `http://localhost:1337${product.attributes.image?.data[0].attributes.url}`
                : ''
            }
            alt={product.attributes.name}
            className='aspect-square w-5/6 mx-auto mb-4 rounded-md'
          />
          <div className='flex flex-col space-y-10 mt-4'>
            <h3 className=''>{product.attributes.name}</h3>
            <h4 className='font-semibold'>€ {product.attributes.price}</h4>
            <p className='text-sm'>
              {product.attributes.description[0].children[0].text}
            </p>
          </div>
        </Link>
      </div>
      <div className='flex w-full space-x-2'>
        <ProductDetailsButton product={product} />
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
