export const getProducts = async () => {
  const res = await fetch("http://127.0.0.1:1337/api/products", {
    cache: "no-cache",
  });
  const data = await res.json();
  return data.data;
};

export const getProduct = async (id: number) => {
  const res = await fetch(`http://127.0.0.1:1337/api/products/${id}`);

  const product = await res.json();

  return product.data;
};
