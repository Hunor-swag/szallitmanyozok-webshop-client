'use client';

import { useShoppingCart } from '@/hooks/useShoppingCart';
import { Download } from 'lucide-react';
import { useEffect } from 'react';

export default function SuccessfulPaymentClient() {
  const { resetCart } = useShoppingCart();

  useEffect(() => {
    resetCart();
  }, []);

  const handleDownload = async () => {};

  return (
    <div className='py-4'>
      <button
        onClick={handleDownload}
        className='rounded-md bg-blue-900 hover:bg-blue-800 px-3 py-1 text-white flex items-center space-x-2'
      >
        <Download className='h-4 w-4' />
        <span>Download</span>
      </button>
    </div>
  );
}
