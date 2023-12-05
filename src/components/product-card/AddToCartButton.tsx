'use client';

import React from 'react';
import Button from '../Button';
import { useShoppingCart } from '@/hooks/useShoppingCart';
import { Product } from '@/types/typings';

type Props = {
  product: Product;
};

export default function AddToCartButton({ product }: Props) {
  const { addToCart } = useShoppingCart();

  return <Button onClick={() => addToCart(product)}>Add To Cart</Button>;
}
