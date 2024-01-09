import SignupForm from '@/components/auth/signup-form';
import { getDictionary } from '@/lib/getDictionary';
import React from 'react';

export default function SignUpPage({ params }: { params: { lang: string } }) {
  const dict = getDictionary(params.lang).auth.signUp;

  return (
    <div className='bg-gray-100 w-full p-10 rounded-lg'>
      <h1 className='mb-6 font-semibold text-xl'>{dict.signUp}</h1>
      <SignupForm lang={params.lang} />
    </div>
  );
}
