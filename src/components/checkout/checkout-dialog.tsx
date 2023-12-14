'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import TextInput from '../ui/text-input';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function CheckoutDialog({ open, setOpen }: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formdata: any) => {
    setOpen(false);
    await signIn('credentials', {
      email: formdata.email,
      password: formdata.password,
      redirect: false,
    });
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>Sign in to your account</DialogDescription>
        </DialogHeader>
        <div className=''></div>
        <DialogFooter>
          <div className='flex flex-col w-full'>
            <form
              className='flex flex-col space-y-4'
              onSubmit={handleSubmit(async (data) => {
                onSubmit(data);
              })}
            >
              <TextInput
                label='Email'
                name='email'
                register={register}
                type='email'
              />
              <TextInput
                label='Password'
                name='password'
                register={register}
                type='password'
              />
              <div className='flex justify-end mt-4'>
                <Button type='submit'>Sign In</Button>
              </div>
            </form>
            <p>
              Don't have an account?{' '}
              <Link href='/auth/sign-up' className='text-blue-600'>
                Sign Up
              </Link>
            </p>
            <p className='pt-4'>
              Or{' '}
              <button className='text-gray-400' onClick={() => setOpen(false)}>
                continue without an account
              </button>
            </p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
