import type { Metadata } from 'next';
import Header from '@/components/header/Header';
import ship from '@/../public/freight-863449_1920.jpg';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Strapi Next.js Webshop',
  description: 'This is a webshop built with Strapi and Next.js',
};

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <div>
      <Header lang={params.lang} />
      <div className='px-4 md:px-[5%] lg:px-[15%] pt-32 md:pt-52 h-[2000px] overflow-x-hidden'>
        {children}
      </div>
    </div>
  );
}
