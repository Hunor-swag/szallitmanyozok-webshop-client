import { stripe } from '@/lib/stripe/stripe';
import React from 'react';
import SuccessfulPaymentClient from './SuccessfulPaymentClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { displayToastAfterFetch } from '@/lib/toasts';

export default async function SuccessfulPaymentPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const { payment_status } = await stripe.checkout.sessions.retrieve(id);

  const session = await getServerSession(authOptions);

  const { user_id } = session.user.id;

  console.log(user_id);

  const addPayment = async () => {
    const res = await fetch(`${process.env.API_URL}/api/payments/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        checkout_session_id: id,
        user_id: user_id || null,
      }),
    });

    const data = await res.json();
    displayToastAfterFetch(res, data);
  };

  await addPayment();

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
