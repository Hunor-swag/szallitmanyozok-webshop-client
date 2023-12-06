'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import MenuItem from './MenuItem';
import Image from 'next/image';
import logo from '@/../public/mszsz_logo_feher.png';
import logo2 from '@/../public/mszsz_logo_en_feher2.png';
import LanguageSelector from './LanguageSelector';
import { getDictionary } from '@/lib/getDictionary';
import { Bars3Icon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useShoppingCart } from '@/hooks/useShoppingCart';
import { getCookie } from '@/lib/cookies';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/store';
import { XMarkIcon } from '@heroicons/react/24/solid';

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

  const { cartCount } = useShoppingCart();

  const [isOpen, setIsOpen] = useState(false);

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
      className={`z-50 fixed top-0 w-full bg-[#14144e] md:bg-gray-800 md:bg-opacity-50 transition-all duration-300 px-[5%] md:px-0 ${
        isScrolled ? 'md:-translate-y-16' : 'md:translate-y-0'
      }
      `}
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
      <div className={`flex flex-col transition-transform duration-300 `}>
        <div className='z-50 w-full flex justify-between space-x-6 p-4 items-center text-white md:px-[5%] lg:px-[20%] h-[72px]'>
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
          <div className='flex space-x-3'>
            <ul className='space-x-2 hidden md:flex'>
              {menuItems.map((item, index) => (
                <MenuItem key={index} href={item.href} text={item.text} />
              ))}
            </ul>
            {/* mobile hamburger icon if menu closed */}
            <button
              className={`block md:hidden ${isOpen && 'hidden'}`}
              onClick={() => setIsOpen(true)}
            >
              <Bars3Icon className='w-6 h-6' />
            </button>
            {/* mobile x icon if menu open */}
            <button
              className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
              onClick={() => setIsOpen(false)}
            >
              <XMarkIcon className='w-6 h-6' />
            </button>
            <div className='hidden items-center pl-5 md:flex'>
              <Link href='/cart' className='flex items-center'>
                <ShoppingCartIcon className='w-6 h-6' />
                {/* Display the number of items in the shopping cart */}
                <span className='rounded-full bg-blue-500 w-4 h-4 text-[10px] flex justify-center items-center -ml-2 mt-6'>
                  {cartCount}
                </span>
              </Link>
            </div>
            <div className='hidden md:block'>
              <LanguageSelector lang={lang} />
            </div>
          </div>
        </div>
        {/* Mobile dropdown menu */}
        <div
          className={` transition-all duration-300 overflow-hidden md:hidden ${
            isOpen ? 'max-h-56 lg:hidden' : 'max-h-0'
          }`}
        >
          <div className='flex flex-col p-4'>
            <ul className='text-sm font-bold flex flex-col'>
              {menuItems.map((item, index) => (
                // <Link key={index} href={item.href} className='text-white'>
                //   <li className='p-2'>{item.text}</li>
                // </Link>
                <MenuItem key={index} href={item.href} text={item.text} />
              ))}
            </ul>
            <div className='px-2'>
              <LanguageSelector lang={lang} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
