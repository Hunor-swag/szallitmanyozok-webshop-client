import { getDictionary } from '@/lib/getDictionary';
import { Span } from 'next/dist/trace';
import React from 'react';

type Props = {
  label: string;
  placeholder?: string;
  type: string;
  error?: string;
  name: string;
  register: any;
  required?: boolean;
  minLength?: number;
  defaultValue?: string;
  maxLength?: number;
  lang: string;
};

export default function TextInput({
  lang,
  label,
  placeholder,
  type,
  error,
  name,
  register,
  required = false,
  minLength = 0,
  defaultValue = '',
  maxLength = 255,
}: Props) {
  const dict = getDictionary(lang).messages;

  return (
    <div className='flex flex-col space-y-2 text-sm w-full'>
      <label className=''>{label}</label>
      <input
        {...register(name, {
          required: required && dict.requiredField,
          maxLength: {
            value: maxLength,
            message: `${dict.maxLength_1} ${maxLength} ${dict.maxLength_2}`,
          },
          minLength: {
            value: minLength,
            message: `${dict.minLength_1} ${minLength} ${dict.minLength_2}`,
          },
        })}
        className={`  rounded-sm border px-2 py-2 outline-none focus:border-gray-500 focus:shadow-md transition-all duration-200 ${
          error ? 'border-red-600 focus:border-red-600' : 'border-gray-200'
        }`}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
      />
      {error && <span className='text-red-500'>{error}</span>}
    </div>
  );
}
