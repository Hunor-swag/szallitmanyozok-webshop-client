'use client';

import Link from 'next/link';
import React from 'react';

type Props = {
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
};

export default function Button({ onClick, href, children }: Props) {
  return (
    <Link href={href || '#'} className='m-2'>
      <button
        className='bg-[#010140] hover:bg-[#303070] shadow-xl hover:shadow-none text-white py-1.5 px-5 text-sm rounded-full transition-colors duration-200'
        onClick={onClick}
      >
        {children}
      </button>
    </Link>
  );
}
