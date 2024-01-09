'use client';

import Link from 'next/link';
import TextInput from '../ui/text-input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { displayToastAfterFetch } from '@/lib/toasts';
import { useState } from 'react';
import Button from '../Button';
import { getDictionary } from '@/lib/getDictionary';

export default function ForgotPasswordForm({ lang }: { lang: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(formdata: any) {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const res = await fetch(`/api/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formdata.email,
      }),
    });

    const data = await res.json();

    displayToastAfterFetch(res, data);

    setIsSubmitting(false);
  }

  const dict = getDictionary(lang).auth.forgotPassword.form;

  return (
    <form
      className='flex flex-col space-y-4 w-full text-sm'
      onSubmit={handleSubmit(async (data) => {
        onSubmit(data);
      })}
    >
      <TextInput
        lang={lang}
        register={register}
        name='email'
        label={dict.inputText}
        placeholder={dict.inputPlaceholder}
        type='email'
        required={true}
        minLength={8}
        error={errors?.email?.message?.toString()}
      />
      <Button type='submit' disabled={isSubmitting}>
        {isSubmitting ? dict.sendingEmail : dict.sendButton}
      </Button>
    </form>
  );
}
