'use client';

import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import ResetPasswordForm from '@/components/auth/reset-password-form';
import { getDictionary } from '@/lib/getDictionary';

export default function PasswordRecovery({
  params,
}: {
  params: { lang: string };
}) {
  const [tokenIsValid, setTokenIsValid] = useState<boolean | null>(null);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const token = useSearchParams().get('token');

  useEffect(() => {
    const checkToken = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/auth/forgot-password/check_token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        }
      );

      const data = await res.json();

      if (res.status !== 200) {
        setMessage(data.message);
        setTokenIsValid(false);
      } else {
        setTokenIsValid(true);
      }
    };
    checkToken();
  }, []);

  const dict = getDictionary(params.lang).auth.resetPassword;

  return (
    <div className='w-full p-10 bg-white rounded-lg'>
      {tokenIsValid === null ? (
        <p>{dict.loading}</p>
      ) : tokenIsValid ? (
        <div className='flex flex-col space-y-4 justify-center items-center h-full w-full'>
          <h1 className='text-xl font-semibold'>{dict.resetPassword}</h1>
          <h2>{dict.enterNewPassword}</h2>
          <ResetPasswordForm lang={params.lang} token={token!} />
        </div>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
}
