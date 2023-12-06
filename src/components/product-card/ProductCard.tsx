import { Product } from '@/types/typings';
import Image, { StaticImageData } from 'next/image';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Button from '../Button';
import { useShoppingCart } from '@/hooks/useShoppingCart';
import AddToCartButton from './AddToCartButton';

type Props = {
  product: Product;
};

export default async function ProductCard({ product }: Props) {
  return (
    <div className='flex flex-col space-y-2 h-auto bg-slate-100 border border-gray-100 shadow-md rounded-xl p-4 m-2 items-center hover:bg-blue-100 transition-colors duration-200 cursor-pointer hover:shadow-xl hover:border-blue-200'>
      <Link href={`/product/${product.id}`} className='h-full w-44'>
        <div className='h-full'>
          {/* Image */}
          <div className='flex flex-col space-y-1'>
            <h3 className='font-semibold'>{product.attributes.name}</h3>
            <h4 className='font-semibold'>
              {product.attributes.price} {product.attributes.currency}
            </h4>
            <p className='text-sm'>
              {product.attributes.description[0].children[0].text}
            </p>
          </div>
        </div>
      </Link>
      <div className='flex justify-start w-full'>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
