'use client';

import { useShoppingCart } from '@/hooks/useShoppingCart';
import { displayToast } from '@/lib/toasts';
import { Product } from '@/types/typings';

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
      className='rounded-md bg-blue-900 hover:bg-blue-800 transition-all duration-200 text-white px-3 py-1'
      onClick={handleClick}
    >
      Add to cart
    </button>
  );
}
