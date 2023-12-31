import Button from '@/components/Button';
import AddToCartButton from '@/components/product/AddToCartButton';
import { generatePriceString } from '@/lib/price';
import { getProduct } from '@/lib/products';
import { Product } from '@/types/typings';

export default async function ProductPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = params;

  const product = (await getProduct(id)) as Product;

  if (!product) return <div>404 not found</div>;

  return (
    <div className='p-10 border-gray-300 border'>
      <div className='flex space-x-6'>
        <div className='w-60 rounded-lg overflow-hidden'>
          <img
            src={`http://localhost:1337${product.attributes.image.data[0].attributes.url}`}
            alt={product.attributes.name}
          />
        </div>

        <div>
          <h1 className='text-3xl font-semibold'>{product.attributes.name}</h1>
          <h2 className='text-xl font-semibold'>
            {generatePriceString(
              product.attributes.price,
              product.attributes.currency
            )}
          </h2>
          <p className='text-sm'>
            {product.attributes.description[0].children[0].text}
          </p>
        </div>
      </div>
      <div className='flex justify-end w-full'>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
