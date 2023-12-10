import LinkButton from '@/components/LinkButton';
import ProductCard from '@/components/product-card/ProductCard';
import { Product } from '@/types/typings';
import { getProducts } from '@/lib/products';

export default async function Home({ params }: { params: { lang: string } }) {
  const products = (await getProducts()) as Array<Product>;

  return (
    <main className=''>
      <div className='h-[160px]'>
        <h1 className='text-center text-white font-bold text-4xl shadow-black drop-shadow'>
          Webshop
        </h1>
      </div>
      <div className='bg-white bg-opacity-90 p-10 rounded-lg w-full'>
        <div className='w-full h-16 px-8 flex-wrap'>
          <LinkButton>Termékek</LinkButton>
          <LinkButton>Szolgáltatások</LinkButton>
          <LinkButton>Digitális termékek</LinkButton>
          <LinkButton>Összes</LinkButton>
        </div>
        <div className='w-full px-8 flex flex-wrap'>
          {products.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
