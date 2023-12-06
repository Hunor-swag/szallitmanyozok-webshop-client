'use client';

import { useShoppingCart } from '@/hooks/useShoppingCart';
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import Button from '../Button';

export default function ShoppingCartTable() {
  const { cart, addToCart, removeFromCart, getTotalPrice } = useShoppingCart();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (cart.cartItems !== null) {
      setLoading(false);
    }
  }, [cart.cartItems]);

  return (
    <div className='rounded-lg overflow-hidden'>
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
      {!loading && cart.quantity === 0 && (
        <h1 className='text-center pt-5 text-red-500 font-semibold'>
          No items in the shopping cart
        </h1>
      )}
      {!loading && cart.quantity > 0 && (
        <div>
          <table className='w-full table'>
            <thead>
              <tr className='border-gray-300 border-b'>
                <th className='shopping-cart-table-header text-left'>Name</th>
                <th className='shopping-cart-table-header'>Quantity</th>
                <th className='shopping-cart-table-header'>Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.cartItems &&
                cart?.cartItems.map((item, index) => {
                  return (
                    <tr key={index} className='border-gray-300 border-b'>
                      <td className='shopping-cart-table-cell'>
                        {item.product.attributes.name}
                      </td>
                      <td className='shopping-cart-table-cell flex justify-center'>
                        <div className='flex items-center border border-gray-400'>
                          <button
                            onClick={() => {
                              removeFromCart(item.product);
                            }}
                            className='bg-blue-900 text-white p-3 hover:bg-blue-700 transition-colors duration-100 w-9'
                          >
                            <MinusIcon className='text-white w-3 h-3' />
                          </button>
                          <div className='w-9 h-full flex justify-center items-center'>
                            <span className=''>{item.quantity}</span>
                          </div>
                          <button
                            onClick={() => {
                              addToCart(item.product);
                            }}
                            className='bg-gray-300 p-3 hover:bg-gray-400 transition-colors duration-100 w-9'
                          >
                            <PlusIcon className='text-blue-900 w-3 h-3' />
                          </button>
                        </div>
                      </td>
                      <td className='shopping-cart-table-cell'>
                        <div className='flex items-center justify-center'>
                          {/* Currency display function */}
                          {item.product.attributes.price}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className='flex justify-end mt-5 text-gray-700'>
            <div className='border-gray-300 border rounded-sm p-5 flex justify-between items-center w-40'>
              <span className='font-semibold text-sm'>Total</span>
              <span className='text-lg'>{getTotalPrice()}</span>
            </div>
          </div>
          <div className='flex justify-end py-4'>
            <Button>Checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
}
