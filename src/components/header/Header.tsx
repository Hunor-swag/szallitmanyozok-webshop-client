'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import MenuItem from './MenuItem';
import Image from 'next/image';
import logo from '@/../public/mszsz_logo_feher.png';
import logo2 from '@/../public/mszsz_logo_en_feher2.png';
import LanguageSelector from './LanguageSelector';
import { getDictionary } from '@/lib/getDictionary';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useShoppingCart } from '@/hooks/useShoppingCart';

export default function Header({ lang }: { lang: string }) {
  const dict = getDictionary(lang);

  const menuItems = [
    {
      href: '#',
      text: dict.header.events.toUpperCase(),
    },
    {
      href: '#',
      text: dict.header.members.toUpperCase(),
    },
  ];

  const { cart, cartCount, addToCart, removeFromCart } = useShoppingCart();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isTop = currentScrollPos > 50; // Adjust this value based on when you want the header to disappear

      setIsScrolled(isTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 w-full bg-gray-800 bg-opacity-50 transition-all duration-300 whitespace-nowrap ${
        isScrolled ? 'md:-translate-y-16' : 'md:translate-y-0'
      }`}
    >
      <div
        className={`h-16 w-full p-4 md:px-[5%] lg:px-[20%] text-gray-300 hidden md:block`}
      >
        <div
          className={`relative transition-all duration-300 ${
            isScrolled && 'opacity-0'
          }`}
        >
          <div className='flex space-x-4'>
            <div>
              <h3 className='text-xs '>{dict.header.address}</h3>
              <span className='text-sm'>
                H-1211 Budapest, Szikratávíró u. 17-21.
              </span>
            </div>
            <div>
              <h3 className='text-xs '>{dict.header.email}</h3>
              <span className='text-sm'>info@szallitmanyozok.hu</span>
            </div>
            <div>
              <h3 className='text-xs '>{dict.header.phone}</h3>
              <span className='text-sm'>(+36-1) 452-8143, 452-8142</span>
            </div>
          </div>
          <hr
            className={`relative -bottom-2 border-gray-300 transition-all duration-300 ${
              isScrolled && 'border-opacity-0'
            }`}
          />
        </div>
      </div>
      <div
        className={`z-50 w-full flex justify-between space-x-6 p-4 transition-all duration-300 items-center text-white md:px-[5%] lg:px-[20%] h-[72px]`}
      >
        <div className='w-44 overflow-hidden h-10'>
          <Link href='/'>
            {lang === 'hu' && (
              <Image
                alt='logo'
                src={logo}
                width={160}
                className='h-full w-auto max-w-none'
              />
            )}
            {lang === 'en' && (
              <Image
                alt='logo2'
                src={logo2}
                width={180}
                className='mt-[-22px] h-auto max-w-none'
              />
            )}
          </Link>
        </div>
        <div className='flex space-x-4'>
          <ul className='space-x-2 hidden md:flex'>
            {menuItems.map((item, index) => (
              <MenuItem key={index} href={item.href} text={item.text} />
            ))}
          </ul>
          <div>
            <LanguageSelector lang={lang} />
          </div>
          <div className='flex items-center pl-5 '>
            <ShoppingCartIcon className='w-6 h-6' />
            {/* Display the number of items in the shopping cart */}
          </div>
        </div>
      </div>
    </header>
  );
}
