'use client';

import TextInput from '../ui/text-input';
import { useForm } from 'react-hook-form';
import { displayToastAfterFetch } from '@/lib/toasts';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '../Button';
import { getDictionary } from '@/lib/getDictionary';

export default function SignupForm({ lang }: { lang: string }) {
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

    const res = await fetch(`/api/auth/sign-up/email-verification`, {
      method: 'POST',
      body: JSON.stringify({
        email: formdata.email,
        password: formdata.password,
        repeat_password: formdata.repeat_password,
        firstname: formdata.firstname,
        lastname: formdata.lastname,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    displayToastAfterFetch(res, data);
    setIsSubmitting(false);
  }

  const dict = getDictionary(lang).auth.signUp.form;

  return (
    <form
      className='flex flex-col space-y-4 w-full text-sm'
      onSubmit={handleSubmit(async (data) => {
        onSubmit(data);
      })}
    >
      <TextInput
        lang={lang}
        label={dict.firstnameLabel}
        placeholder={dict.firstnamePlaceholder}
        type='text'
        register={register}
        name='firstname'
        required={true}
        error={errors.firstname?.message?.toString()}
      />
      <TextInput
        lang={lang}
        label={dict.lastnameLabel}
        placeholder={dict.lastnamePlaceholder}
        type='text'
        register={register}
        name='lastname'
        required={true}
        error={errors.lastname?.message?.toString()}
      />

      <TextInput
        lang={lang}
        label={dict.emailLabel}
        placeholder={dict.emailPlaceholder}
        type='email'
        register={register}
        name='email'
        required={true}
        error={errors.email?.message?.toString()}
      />
      <TextInput
        lang={lang}
        label={dict.passwordLabel}
        placeholder={dict.passwordPlaceholder}
        type='password'
        register={register}
        name='password'
        required={true}
        minLength={8}
        error={errors.password?.message?.toString()}
      />
      <TextInput
        lang={lang}
        label={dict.repeatPasswordLabel}
        placeholder={dict.repeatPasswordPlaceholder}
        type='password'
        register={register}
        name='repeat_password'
        required={true}
        error={errors.repeat_password?.message?.toString()}
      />
      <div className={`flex whitespace-nowrap text-xs space-x-2`}>
        <input
          type='checkbox'
          {...register('terms', {
            required: true,
          })}
        />
        <label className={`${errors.terms && 'text-red-500'}`}>
          {dict.termsAndConditions}
        </label>
      </div>
      <Button type='submit' disabled={isSubmitting}>
        {isSubmitting ? dict.signingUp : dict.signUpButton}
      </Button>
    </form>
  );
}
