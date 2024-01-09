import SigninForm from '@/components/auth/signin-form';
import React from 'react';

export default function SignInPage({ params }: { params: { lang: string } }) {
  return (
    <div className='bg-white p-10 rounded-lg'>
      <SigninForm lang={params.lang} callbackUrl='/' />
    </div>
  );
}
