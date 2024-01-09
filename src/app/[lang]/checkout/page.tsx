import CheckoutCartTable from '@/components/checkout/checkout-cart-table';
import CheckoutForm from '@/components/checkout/checkout-form';
import { getDictionary } from '@/lib/getDictionary';

export default function CheckoutPage({ params }: { params: { lang: string } }) {
  const dict = getDictionary(params.lang).checkout;

  return (
    <div className='border border-gray-300 p-10'>
      <h1 className='text-2xl font-semibold text-center mb-8'>{dict.title}</h1>
      <CheckoutForm lang={params.lang} />
    </div>
  );
}
