import SigninForm from '@/components/auth/signin-form';
import React from 'react';

export default function SignInPage() {
  return (
    <div className='bg-white p-10 rounded-lg'>
      <SigninForm callbackUrl='/' />
    </div>
  );
}
