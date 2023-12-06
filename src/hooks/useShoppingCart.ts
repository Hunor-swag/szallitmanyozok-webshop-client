import { displayToast } from '@/lib/toasts';
import { CartItem, Product } from '@/types/typings';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/store';
import {
  handleAddToCart,
  handleRemoveFromCart,
  setCartItems,
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
    }
  }, []);

  const addToCart = (product: Product) => {
    dispatch(handleAddToCart(product));
    displayToast('success', `${product.attributes.name} added to cart`);
  };

  const removeFromCart = (product: Product) => {
    dispatch(handleRemoveFromCart(product));
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

  return { cart, cartCount, addToCart, removeFromCart, getTotalPrice };
}
