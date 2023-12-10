'use client';

import { useShoppingCart } from '@/hooks/useShoppingCart';
import { displayToast } from '@/lib/toasts';
import { Product } from '@/types/typings';
import { useRouter } from 'next/navigation';
type Props = {
  product: Product;
};

export default function AddToCartButton({ product }: Props) {
  const { addToCart } = useShoppingCart();
  const router = useRouter();

  return (
    <button
      className='bg-[#010140] hover:bg-[#303070] shadow-xl hover:shadow-none text-white py-1.5 px-5 text-sm rounded-full transition-colors duration-200'
      onClick={() => {
        addToCart(product);

        displayToast('success', `${product.attributes.name} added to cart`);
      }}
    >
      Add To Cart
    </button>
  );
}
