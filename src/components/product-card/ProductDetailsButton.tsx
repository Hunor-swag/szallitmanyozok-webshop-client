'use client';

import { useShoppingCart } from '@/hooks/useShoppingCart';
import { displayToast } from '@/lib/toasts';
import { Product } from '@/types/typings';
import { useRouter } from 'next/navigation';
type Props = {
  product: Product;
};

export default function ProductDetailsButton({ product }: Props) {
  const router = useRouter();

  return (
    <button
      className='w-[80%] bg-white text-base font-semibold text-blue-900 border-2 border-blue-900 hover:border-white hover:shadow-md py-1.5 px-5 rounded-md transition-all duration-200 ease-in-out '
      onClick={() => {
        router.push(`/product/${product.id}`);

        // addToCart(product);

        // displayToast('success', `${product.attributes.name} added to cart`);
      }}
    >
      Details
    </button>
  );
}
