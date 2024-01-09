'use client';

import { useShoppingCart } from '@/hooks/useShoppingCart';
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { ChangeEvent, useEffect, useState } from 'react';
import Button from '../LinkButton';
import LoadingSpinner from '../ui/loading-spinner';
import { Product } from '@/types/typings';
import { getDictionary } from '@/lib/getDictionary';

export default function ShoppingCartTable({ lang }: { lang: string }) {
  const {
    cart,
    addToCart,
    removeFromCart,
    resetCart,
    setProductQuantity,
    removeProduct,
    total,
  } = useShoppingCart();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (cart.cartItems !== null) {
      setLoading(false);
    }
  }, [cart.cartItems]);

  const dict = getDictionary(lang).cart;

  const handleQuantityChange = (
    e: ChangeEvent<HTMLInputElement>,
    product: Product,
    currentQuantity: number
  ) => {
    const inputValue = e.target.value.trim();

    // check if the input is a number or empty
    if (/^\d*$/.test(inputValue) || inputValue === '') {
      let newQuantity = parseInt(inputValue);
      if (isNaN(newQuantity)) {
        newQuantity = currentQuantity;
      }
      setProductQuantity(product, newQuantity);
    } else {
      console.log('Invalid input, please enter a number');
    }
  };

  return (
    <div className='overflow-hidden border border-gray-300 p-4'>
      {loading && (
        <div className='flex justify-center items-center'>
          <LoadingSpinner />
        </div>
      )}
      {!loading && cart.quantity === 0 && (
        <h1 className='text-center py-5 text-red-500 font-semibold'>
          {dict.noItems}
        </h1>
      )}
      {!loading && cart.quantity > 0 && (
        <div>
          <div className='flex justify-end'>
            <Button onClick={resetCart}>{dict.emptyCartButton}</Button>
          </div>
          <table className='w-full table'>
            <thead>
              <tr className='border-gray-300 border-b'>
                <th className='shopping-cart-table-header text-left'>
                  {dict.cartTable.tableHeaders.name}
                </th>
                <th className='shopping-cart-table-header'>
                  {dict.cartTable.tableHeaders.quantity}
                </th>
                <th className='shopping-cart-table-header'>
                  {dict.cartTable.tableHeaders.price}
                </th>
                <th className='shopping-cart-table-header'></th>
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
                      <td className='shopping-cart-table-cell flex justify-center items-center'>
                        <div className='flex items-center border border-gray-400 h-full'>
                          <button
                            onClick={() => {
                              removeFromCart(item.product);
                            }}
                            className='bg-blue-900 text-white p-3 hover:bg-blue-700 transition-colors duration-100 w-9'
                          >
                            <MinusIcon className='text-white w-3 h-3' />
                          </button>
                          <div className='w-9 h-full flex justify-center items-center'>
                            {/* <input
                              className='w-9 outline-none text-center h-full'
                              value={
                                item.quantity !== null &&
                                item.quantity !== undefined
                                  ? item.quantity
                                  : ''
                              }
                              onChange={(e) =>
                                handleQuantityChange(
                                  e,
                                  item.product,
                                  item.quantity !== null &&
                                    item.quantity !== undefined
                                    ? item.quantity
                                    : 0
                                )
                              }
                            /> */}
                            <span>{item.quantity}</span>
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
                      <td className='shopping-cart-table-cell'>
                        <button
                          className='flex justify-center items-center w-4 h-4 mx-auto text-red-700'
                          onClick={() => removeProduct(item.product)}
                        >
                          <XMarkIcon className='' />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className='flex justify-end mt-5 text-gray-700'>
            <div className='border-gray-300 border rounded-sm p-5 flex justify-between items-center w-40'>
              <span className='font-semibold text-sm'>{dict.total}</span>
              <span className='text-lg'>{total}</span>
            </div>
          </div>
          <div className='flex justify-end py-4'>
            <Button href='/checkout'>{dict.checkoutButton}</Button>
          </div>
        </div>
      )}
    </div>
  );
}
