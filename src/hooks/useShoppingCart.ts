import { Cart, Product } from '@/types/typings';
import { useEffect, useState } from 'react';

export function useShoppingCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    const storedCart = window.localStorage.getItem('shoppingCart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (cart !== null) {
      window.localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    setCartCount(countTotalProducts());
  }, [cart]);

  const addToCart = (product: Product) => {
    if (cart === null) {
      setCart({
        products: [{ product, quantity: 1 }],
      });
    } else {
      const productIndex = cart.products.findIndex(
        (item) => item.product.id === product.id
      );
      if (productIndex !== -1) {
        const updatedCart = { ...cart };
        updatedCart.products[productIndex].quantity += 1;
        setCart(updatedCart);
      } else {
        setCart({
          ...cart,
          products: [...cart.products, { product, quantity: 1 }],
        });
      }
    }
  };

  const removeFromCart = (product: Product) => {
    if (cart !== null) {
      const productIndex = cart.products.findIndex(
        (item) => item.product.id === product.id
      );
      if (productIndex !== -1) {
        const updatedCart = { ...cart };
        updatedCart.products[productIndex].quantity -= 1;
        if (updatedCart.products[productIndex].quantity === 0) {
          updatedCart.products.splice(productIndex, 1);
        }
        setCart(updatedCart);
      }
    }
  };

  const countTotalProducts = () => {
    let totalCount = 0;

    if (cart && cart.products && cart.products.length > 0) {
      cart.products.forEach((product) => {
        totalCount += product.quantity;
      });
    }

    return totalCount;
  };

  return { cart, cartCount, addToCart, removeFromCart };
}
