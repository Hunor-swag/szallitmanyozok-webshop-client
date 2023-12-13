export type Product = {
  id: number;
  attributes: {
    name: string;
    description: Array;
    currency: string;
    price: number;
    image: {
      data: Array;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    type: string;
  };
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type User = {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  billing_address: string;
  billing_city: string;
  billing_state: string;
  billing_country: string;
  billing_postalCode: string;
};

export type Cart = {
  cartItems: Array<CartItem> | null;
  quantity: number;
};
