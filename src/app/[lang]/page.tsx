import ProductCard from '@/components/product-card/ProductCard';
import { Product } from '@/types/typings';
import { getProducts } from '@/lib/products';

export default async function Home({ params }: { params: { lang: string } }) {
  const products = (await getProducts()) as Array<Product>;

  return (
    <main className=''>
      <div className='bg-white bg-opacity-90 rounded-lg w-full flex justify-center py-4'>
        {/* <div className='w-full h-16 px-8 flex-wrap'>
          <LinkButton>Termékek</LinkButton>
          <LinkButton>Szolgáltatások</LinkButton>
          <LinkButton>Digitális termékek</LinkButton>
          <LinkButton>Összes</LinkButton>
        </div> */}
        <div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full max-w-4xl'>
          {products.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
