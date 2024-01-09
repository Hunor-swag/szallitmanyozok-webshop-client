'use client';

import TextInput from '../ui/text-input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { displayToastAfterFetch } from '@/lib/toasts';
import { useState } from 'react';
import Button from '../Button';
import { getDictionary } from '@/lib/getDictionary';

export default function ResetPasswordForm({
  token,
  lang,
}: {
  token: string;
  lang: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  //   console.log(errors);

  async function onSubmit(formdata: any) {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const res = await fetch(`/api/auth/forgot-password/change`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: formdata.password,
        repeat_password: formdata.repeat_password,
        token,
      }),
    });

    const data = await res.json();

    displayToastAfterFetch(res, data, () => router.push('/'));
    setIsSubmitting(false);
  }

  const dict = getDictionary(lang).auth.resetPassword.form;

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
        name='password'
        label={dict.passwordLabel}
        placeholder={dict.passwordPlaceholder}
        type='password'
        required={true}
        minLength={8}
        error={errors?.password?.message?.toString()}
      />
      <TextInput
        lang={lang}
        register={register}
        name='repeat_password'
        label={dict.repeatPasswordLabel}
        placeholder={dict.repeatPasswordPlaceholder}
        type='password'
        required={true}
        minLength={8}
        error={errors?.repeat_password?.message?.toString()}
      />
      <Button type='submit' disabled={isSubmitting}>
        {isSubmitting ? dict.changingPassword : dict.changePasswordButton}
      </Button>
    </form>
  );
}
