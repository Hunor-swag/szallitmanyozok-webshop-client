'use client';

import { useShoppingCart } from '@/hooks/useShoppingCart';
import { getDictionary } from '@/lib/getDictionary';
import { useEffect, useState } from 'react';

export default function CheckoutCartTable({ lang }: { lang: string }) {
  const { cart, total, discount } = useShoppingCart();

  const dict = getDictionary(lang).checkout;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cart.cartItems !== null) {
      setLoading(false);
    }
  }, [cart.cartItems]);

  return (
    <div className='w-full overflow-hidden p-6 border border-gray-300 mt-4'>
      {loading && (
        <div className='flex justify-center items-center'>
          <svg className='animate-spin h-5 w-5 mr-3' viewBox='0 0 24 24'>
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.94z'
            ></path>
          </svg>
        </div>
      )}
      {!loading && cart.cartItems && (
        <table className='w-full'>
          <thead>
            <tr className='border-b border-gray-300'>
              <th className='th'>{dict.table.tableHeaders.name}</th>
              <th className='th'>{dict.table.tableHeaders.quantity}</th>
              <th className='th text-right'>{dict.table.tableHeaders.price}</th>
            </tr>
          </thead>
          <tbody>
            {cart.cartItems?.map((item) => {
              if (item.quantity === 0) return;
              return (
                <tr key={item.product.id} className='border-b border-gray-300'>
                  <td className='td'>{item.product.attributes.name}</td>
                  <td className='td'>{item.quantity}</td>
                  <td className='td text-right'>
                    {item.product.attributes.price}
                  </td>
                </tr>
              );
            })}
            <tr>
              <td colSpan={3} className='td text-right font-semibold pt-4'>
                {discount !== 0 ? (
                  <div className='flex flex-col space-y-1'>
                    <span className='font-normal text-sm'>
                      {dict.discount}: {discount}%
                    </span>
                    <span>
                      {dict.overall}: {total}
                    </span>
                  </div>
                ) : (
                  <span>
                    {dict.overall}: {total}
                  </span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
