import type { Metadata } from 'next';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReduxProvider } from '@/redux/provider';
import { NextAuthProvider } from '@/components/NextAuthProvider';

export const metadata: Metadata = {
  title: 'Strapi Next.js Webshop',
  description: 'This is a webshop built with Strapi and Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = null;

  return (
    <html lang='en'>
      <body>
        <NextAuthProvider session={session}>
          <ReduxProvider>{children}</ReduxProvider>
        </NextAuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
