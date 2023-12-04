export type Product = {
  id: number;
  attributes: {
    name: string;
    description: Array;
    currency: string;
    price: number;
    imageSrc: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    type: string;
  };
};
