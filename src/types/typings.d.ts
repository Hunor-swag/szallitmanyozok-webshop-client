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

export type Cart = {
  products: Array<{
    product: Product;
    quantity: number;
  }>;
};
