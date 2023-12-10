'use client';

import { useForm } from 'react-hook-form';
import TextInput from '../ui/text-input';
import { useEffect, useState } from 'react';
import { CheckoutDialog } from './checkout-dialog';
import CheckoutCartTable from './checkout-cart-table';
import Button from '../Button';
import { useSession } from 'next-auth/react';
import { User } from '@/types/typings';

export default function CheckoutForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const session = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (session && session.data && session.data.user) {
      const res = fetch(`/api/auth/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session.data.user.email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        });
    }
  }, [session]);

  const [dialogOpen, setDialogOpen] = useState(false);

  async function onSubmit(formdata: any) {}

  return (
    <div>
      {!session && (
        <div className='flex flex-col justify-start w-full mb-6'>
          <p>
            Already have an account?{' '}
            <button
              type='button'
              onClick={() => setDialogOpen(true)}
              className='text-blue-700'
            >
              Sign in
            </button>
          </p>
          <CheckoutDialog open={dialogOpen} setOpen={setDialogOpen} />
        </div>
      )}

      <form
        className='flex flex-col space-y-4'
        onSubmit={handleSubmit(async (data) => {
          onSubmit(data);
        })}
      >
        <div className={`flex flex-col space-y-4`}>
          <div className='space-y-4 md:space-y-0 md:flex md:space-x-4'>
            <TextInput
              label='Firstname'
              name='firstname'
              register={register}
              type='text'
              defaultValue={user ? user.firstname : undefined}
              error={errors.firstname?.message?.toString()}
              required={true}
              placeholder='Firstname'
            />
            <TextInput
              label='Lastname'
              name='lastname'
              register={register}
              type='text'
              defaultValue={user ? user.lastname : undefined}
              error={errors.lastname?.message?.toString()}
              required={true}
              placeholder='Lastname'
            />
          </div>
          <div className='space-y-4 md:space-y-0 md:flex md:space-x-4'>
            <TextInput
              label='Email'
              name='email'
              register={register}
              type='email'
              defaultValue={user ? user.email : undefined}
              error={errors.email?.message?.toString()}
              required={true}
              placeholder='email@example.com'
            />
            <TextInput
              label='Phone Number'
              name='phone'
              register={register}
              type='text'
              defaultValue={user ? user.phone : undefined}
              error={errors.phone?.message?.toString()}
              required={true}
              placeholder='Phone Number'
            />
          </div>
        </div>

        <hr className='border-gray-400' />

        <CheckoutCartTable />
        <div className='flex justify-end py-4'>
          <Button>Proceed To Checkout</Button>
        </div>
      </form>
    </div>
  );
}
