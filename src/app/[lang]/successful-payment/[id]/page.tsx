import { stripe } from '@/lib/stripe/stripe';
import React from 'react';
import SuccessfulPaymentClient from './SuccessfulPaymentClient';

export default async function SuccessfulPaymentPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const { payment_status } = await stripe.checkout.sessions.retrieve(id);

  console.log(await stripe.paymentIntents.list());

  return (
    <div className='bg-white p-10 rounded-lg'>
      {payment_status === 'paid' ? (
        <>
          <h1>Successful payment!</h1>
          <SuccessfulPaymentClient />
        </>
      ) : (
        <h1>Payment failed.</h1>
      )}
    </div>
  );
}
