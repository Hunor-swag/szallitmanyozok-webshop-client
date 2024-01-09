'use client';

import Link from 'next/link';
import TextInput from '../ui/text-input';
import { signIn } from 'next-auth/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { usePathname, useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/store';
import Button from '../Button';
import { getDictionary } from '@/lib/getDictionary';

type Props = {
  callbackUrl: string;
  lang: string;
};

export default function SigninForm({ callbackUrl, lang }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dict = getDictionary(lang).auth.signIn.form;

  const router = useRouter();

  async function onSubmit(data: any) {
    const user = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (user?.error) {
      toast.error('Invalid email or password', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        theme: 'dark',
        style: {
          backgroundColor: 'gray',
        },
      });
    } else {
      toast.success('Login successful!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        theme: 'dark',
        style: {
          backgroundColor: 'gray',
        },
      });

      router.push(callbackUrl);
    }
  }

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
        label={dict.emailLabel}
        placeholder={dict.emailPlaceholder}
        type='email'
        required={true}
        error={errors?.email?.message?.toString()}
      />
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
      <Link href='/forgot-password' className='self-end'>
        {dict.forgotPassword}
      </Link>
      <Button>{dict.signInButton}</Button>
    </form>
  );
}
