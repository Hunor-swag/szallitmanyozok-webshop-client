import SignupForm from '@/components/auth/signup-form';
import React from 'react';

export default function SignUpPage() {
  return (
    <div className='bg-gray-100 w-full p-10 rounded-lg'>
      <h1 className='mb-6 font-semibold text-xl'>Sign Up</h1>
      <SignupForm />
    </div>
  );
}
