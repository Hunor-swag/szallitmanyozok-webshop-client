import { displayToast } from '@/lib/toasts';
import { CartItem, Product } from '@/types/typings';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { store, useAppSelector } from '@/redux/store';
import {
  handleAddToCart,
  handleRemoveFromCart,
  setCartItems,
  handleSetProductQuantity,
  handleRemoveProduct,
} from '@/redux/features/cart-slice';

export function useShoppingCart() {
  const dispatch = useDispatch();
  const cart = useAppSelector((state) => state.cartReducer);
  const cartCount = useAppSelector((state) => state.cartReducer.quantity);

  useEffect(() => {
    const storedCart = window.localStorage.getItem('shoppingCart');
    if (storedCart) {
      const cartJson = JSON.parse(storedCart) as {
        cartItems: Array<CartItem>;
        quantity: number;
      };
      dispatch(setCartItems(cartJson.cartItems));
    } else {
      window.localStorage.setItem(
        'shoppingCart',
        JSON.stringify({
          cartItems: [] as Array<CartItem>,
          quantity: 0,
        })
      );
      dispatch(setCartItems([]));
    }
  }, []);

  const addToCart = (product: Product) => {
    dispatch(handleAddToCart(product));
  };

  const removeFromCart = (product: Product) => {
    dispatch(handleRemoveFromCart(product));
  };

  const removeProduct = (product: Product) => {
    dispatch(handleRemoveProduct(product));
    // cart.cartItems?.forEach((item: CartItem) => {
    //   for (let i = 0; i < item.quantity; i++)
    //     dispatch(handleRemoveFromCart(product));
    // });
  };

  const getTotalPrice = () => {
    const items = cart.cartItems;
    let totalPrice = 0;

    if (items && items.length > 0) {
      items.forEach((item: CartItem) => {
        totalPrice += item.product.attributes.price * item.quantity;
      });
    }

    return totalPrice;
  };

  const resetCart = () => {
    dispatch(setCartItems([]));
    window.localStorage.removeItem('shoppingCart');
  };

  const setProductQuantity = (product: Product, quantity: number) => {
    dispatch(handleSetProductQuantity({ product, quantity }));
  };

  return {
    cart,
    cartCount,
    addToCart,
    removeFromCart,
    getTotalPrice,
    resetCart,
    setProductQuantity,
    removeProduct,
  };
}
