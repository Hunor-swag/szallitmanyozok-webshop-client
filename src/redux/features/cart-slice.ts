import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getDictionary } from '@/lib/getDictionary';
import { CartItem, Product } from '@/types/typings';
import { displayToast } from '@/lib/toasts';

type InitialState = {
  cartItems: Array<CartItem> | null;
  quantity: number;
  discount: number;
  total: number;
};

const countTotalProducts = (items: Array<CartItem>) => {
  let totalCount = 0;

  if (items && items && items.length > 0) {
    items.forEach((product) => {
      totalCount += product.quantity;
    });
  }

  return totalCount;
};

const countTotal = (items: Array<CartItem>) => {
  let total = 0;

  if (items && items && items.length > 0) {
    items.forEach((product) => {
      total += product.quantity * product.product.attributes.price;
    });
  }

  return total;
};

const calculateTotalWithDiscount = (
  items: Array<CartItem>,
  discount: number
) => {
  let total = countTotal(items);

  // Apply discount logic here based on your requirements
  total -= total * (discount / 100); // Example: Applying a percentage discount

  return total;
};

const initialState = {
  cartItems: null,
  quantity: 0,
  discount: 0,
  total: 0,
} as InitialState;

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<Array<CartItem>>) => {
      state.cartItems = action.payload;
      state.quantity = countTotalProducts(action.payload);
      state.total = countTotal(action.payload);
      if (typeof window !== 'undefined') {
        window?.localStorage.setItem(
          'shoppingCart',
          JSON.stringify({
            cartItems: action.payload,
            quantity: state.quantity,
          })
        );
      }
    },
    handleSetProductQuantity: (
      state,
      action: PayloadAction<{ product: Product; quantity: number }>
    ) => {
      const { product, quantity } = action.payload;

      const updatedProducts = state.cartItems?.map((item: CartItem) => {
        if (item.product.id === product.id) {
          item.quantity = quantity;
        }
        return item;
      });

      state.cartItems = updatedProducts!;
      state.quantity = countTotalProducts(state.cartItems);
      state.total = countTotal(state.cartItems);
      localStorage.setItem('shoppingCart', JSON.stringify(state));
    },
    handleRemoveProduct: (state, action: PayloadAction<Product>) => {
      const productToRemove = action.payload;
      const updatedProducts = state.cartItems?.filter(
        (item: CartItem) => item.product.id !== productToRemove.id
      );
      state.cartItems = updatedProducts!;
      state.quantity = countTotalProducts(state.cartItems);
      state.total = countTotal(state.cartItems);
      localStorage.setItem('shoppingCart', JSON.stringify(state));
    },
    handleAddToCart: (state, action: PayloadAction<Product>) => {
      const productToAdd = action.payload;

      if (!state.cartItems) {
        state.cartItems = [{ product: productToAdd, quantity: 1 }];
      } else {
        const existingProduct = state.cartItems.find(
          (item: CartItem) => item.product.id === productToAdd.id
        );

        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          state.cartItems = [
            ...state.cartItems,
            { product: productToAdd, quantity: 1 },
          ];
        }
      }

      state.quantity = countTotalProducts(state.cartItems); // Update total quantity
      state.total = countTotal(state.cartItems); // update total price
      localStorage.setItem('shoppingCart', JSON.stringify(state)); // Update localStorage
    },
    handleRemoveFromCart: (state, action: PayloadAction<Product>) => {
      const productToRemove = action.payload;

      const quantityOfProductToRemove = state.cartItems?.find(
        (item: CartItem) => item.product.id === productToRemove.id
      )?.quantity;

      if (quantityOfProductToRemove === 1) {
        const updatedProducts = state.cartItems?.filter(
          (item: CartItem) => item.product.id !== productToRemove.id
        );
        state.cartItems = updatedProducts!;
        state.quantity = countTotalProducts(state.cartItems);
        state.total = countTotal(state.cartItems);
        localStorage.setItem('shoppingCart', JSON.stringify(state));
      } else if (quantityOfProductToRemove! > 0) {
        const updatedProducts = state.cartItems?.map((item: CartItem) => {
          if (item.product.id === productToRemove.id) {
            item.quantity -= 1;
          }
          return item;
        });
        state.cartItems = updatedProducts!;
        state.quantity = countTotalProducts(state.cartItems);
        state.total = countTotal(state.cartItems);
        localStorage.setItem('shoppingCart', JSON.stringify(state));
      }
    },
    handleApplyDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
      state.total = calculateTotalWithDiscount(
        state.cartItems!,
        state.discount
      );
      localStorage.setItem('shoppingCart', JSON.stringify(state));
    },
  },
});

export const {
  setCartItems,
  handleAddToCart,
  handleRemoveFromCart,
  handleSetProductQuantity,
  handleRemoveProduct,
  handleApplyDiscount,
} = cartSlice.actions;
export default cartSlice.reducer;
