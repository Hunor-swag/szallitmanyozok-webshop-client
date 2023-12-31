'use client';

import Link from 'next/link';
import React from 'react';

type Props = {
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
};

export default function LinkButton({
  onClick,
  href,
  children,
  disabled = false,
  type,
}: Props) {
  return (
    <Link href={href || '#'} className='m-2'>
      <button
        type={type}
        className='bg-[#010140] hover:bg-[#303070] shadow-xl hover:shadow-none text-white py-1.5 px-5 text-sm rounded-md transition-colors duration-200'
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </Link>
  );
}
