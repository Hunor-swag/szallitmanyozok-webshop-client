import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/typings";
import { getProducts } from "@/lib/products";

export default async function Home({ params }: { params: { lang: string } }) {
  const products = (await getProducts()) as Array<Product>;

  return (
    <main className="">
      <div className="h-[160px]">
        <h1 className="text-center text-white font-bold text-4xl shadow-black drop-shadow">
          Webshop
        </h1>
      </div>
      <div className="bg-white bg-opacity-90 p-10 rounded-lg w-full">
        <div className="w-full h-16 px-8 flex-wrap space-x-2">
          <Button>Termékek</Button>
          <Button>Szolgáltatások</Button>
          <Button>Digitális termékek</Button>
          <Button>Összes</Button>
        </div>
        <div className="w-full px-8 flex space-x-6">
          {products.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
