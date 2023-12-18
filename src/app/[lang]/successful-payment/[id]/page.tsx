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

  const session = await getServerSession(authOptions);

  const { user_id } = session.user.id;

  const updatePayment = async () => {
    const res = await fetch(
      `${process.env.API_URL}/api/payments/update/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          paid: true,
        }),
      }
    );

    const data = await res.json();
    return res.status;
  };

  const status = await updatePayment();

  return (
    <div className='bg-white p-10 rounded-lg'>
      {status === 200 ? (
        <>
          <h1>Successful payment!</h1>
          <SuccessfulPaymentClient />
        </>
      ) : (
        <>
          <h1>Payment failed</h1>
        </>
      )}
    </div>
  );
}
