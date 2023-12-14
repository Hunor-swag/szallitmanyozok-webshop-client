'use client';

import { User } from '@/types/typings';
import React from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '../ui/text-input';
import { displayToastAfterFetch } from '@/lib/toasts';
import { useRouter } from 'next/navigation';
import Button from '../Button';

type Props = {
  user: User;
};

export default function EditProfileForm({ user }: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const router = useRouter();

  async function onSubmit(formdata: any) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/edit-profile/${user.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      }
    );

    const data = await res.json();

    displayToastAfterFetch(res, data, router.refresh());
  }

  return (
    <form
      className='flex flex-col space-y-4'
      onSubmit={handleSubmit(async (data) => {
        onSubmit(data);
      })}
    >
      <div className='flex flex-col md:flex-row md:space-x-4'>
        <TextInput
          label='Country'
          name='firstname'
          register={register}
          type='text'
          defaultValue={user.firstname}
          error={errors.firstname?.message?.toString()}
          required
          placeholder='Firstname'
        />
        <TextInput
          label='Lastname'
          name='lastname'
          register={register}
          type='text'
          defaultValue={user.lastname}
          error={errors.lastname?.message?.toString()}
          required
          placeholder='Lastname'
        />
      </div>
      <TextInput
        label='Phone'
        name='phone'
        register={register}
        type='text'
        defaultValue={user.phone}
        error={errors.phone?.message?.toString()}
        placeholder='Phone'
      />
      <div className='flex flex-col md:flex-row md:space-x-4'>
        <TextInput
          label='Password'
          name='password'
          register={register}
          type='password'
          error={errors.password?.message?.toString()}
          placeholder='Password'
          minLength={8}
        />
        <TextInput
          label='Repeat Password'
          name='repeat_password'
          register={register}
          type='password'
          error={errors.repeat_password?.message?.toString()}
          placeholder='Repeat Password'
          minLength={8}
        />
      </div>
      <div className='w-full flex justify-end'>
        <Button type='submit' className='w-1/3'>
          Save
        </Button>
      </div>
    </form>
  );
}
