import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from '@/redux/store';
import { ReduxProvider } from '@/redux/provider';

export const metadata: Metadata = {
  title: 'Strapi Next.js Webshop',
  description: 'This is a webshop built with Strapi and Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
