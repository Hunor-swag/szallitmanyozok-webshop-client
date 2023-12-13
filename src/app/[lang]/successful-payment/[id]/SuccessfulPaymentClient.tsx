'use client';

import { useShoppingCart } from '@/hooks/useShoppingCart';
import { useEffect } from 'react';

export default function SuccessfulPaymentClient() {
  const { resetCart } = useShoppingCart();

  useEffect(() => {
    resetCart();
  }, []);

  return <div></div>;
}
