import ForgotPasswordForm from '@/components/auth/forgot-password-form';
import { getDictionary } from '@/lib/getDictionary';
import Link from 'next/link';
import React from 'react';

export default function ForgotPasswordPage({
  params,
}: {
  params: { lang: string };
}) {
  const dict = getDictionary(params.lang).auth.forgotPassword;
  return (
    <div className='bg-white p-10 rounded-lg'>
      <div className='flex flex-col space-y-4 justify-center items-center h-full w-full'>
        <h1 className='text-xl font-semibold'>{dict.forgotYourPassword}</h1>
        <h2>{dict.enterYourEmail}</h2>
        <ForgotPasswordForm lang={params.lang} />
        <span className='whitespace-nowrap'>
          <Link href='/'>{dict.signIn}</Link>
        </span>
      </div>
    </div>
  );
}
