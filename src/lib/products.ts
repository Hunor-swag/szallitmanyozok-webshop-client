export const getProducts = async () => {
  const res = await fetch(
    'https://webshop-admin.ceodash.hu/api/products?populate=*',
    {
      cache: 'no-cache',
    }
  );
  const data = await res.json();
  return data.data;
};

export const getProduct = async (id: number) => {
  const res = await fetch(
    `https://webshop-admin.ceodash.hu/api/products/${id}?populate=*`
  );

  const product = await res.json();

  return product.data;
};
