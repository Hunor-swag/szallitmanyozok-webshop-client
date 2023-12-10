import CheckoutCartTable from '@/components/checkout/checkout-cart-table';
import CheckoutForm from '@/components/checkout/checkout-form';

export default function CheckoutPage() {
  return (
    <div className='bg-gray-300 rounded-lg p-10'>
      <h1 className='text-2xl font-semibold text-center mb-8'>Checkout</h1>
      <CheckoutForm />
    </div>
  );
}
