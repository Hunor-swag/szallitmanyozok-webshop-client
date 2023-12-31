'use client';

import { useShoppingCart } from '@/hooks/useShoppingCart';
import { displayToast } from '@/lib/toasts';
import { Product } from '@/types/typings';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

type Props = {
  product: Product;
};

export default function AddToCartButton({ product }: Props) {
  const { addToCart } = useShoppingCart();

  const handleClick = () => {
    addToCart(product);
    displayToast('success', `${product.attributes.name} added to cart`);
  };

  return (
    <button
      onClick={handleClick}
      className='bg-blue-900 text-white rounded-md h-full aspect-square flex justify-center items-center relative hover:-translate-y-1 transition-all duration-200 hover:bg-blue-800'
    >
      <ShoppingBagIcon className='w-5 h-5' />
      <span className='text-xs absolute right-[6px] top-[1px]'>+</span>
    </button>
  );
}
