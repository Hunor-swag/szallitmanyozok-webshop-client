import LoadingSpinner from '@/components/ui/loading-spinner';
import { displayToastAfterFetch } from '@/lib/toasts';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const EmailVerificationComponent = dynamic(
  () =>
    import(
      '@/app/[lang]/auth/email-verification/[token]/EmailVerificationComponent'
    ),
  {
    ssr: false,
  }
);

export default function EmailVerificationPage({
  params,
}: {
  params: { token: string; lang: string };
}) {
  return (
    <div className='bg-white rounded-lg p-10'>
      <EmailVerificationComponent lang={params.lang} token={params.token} />
    </div>
  );
}
