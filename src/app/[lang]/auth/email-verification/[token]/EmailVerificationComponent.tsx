'use client';

import LoadingSpinner from '@/components/ui/loading-spinner';
import { getDictionary } from '@/lib/getDictionary';
import { displayToastAfterFetch } from '@/lib/toasts';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EmailVerificationComponent({
  token,
  lang,
}: {
  token: string;
  lang: string;
}) {
  const router = useRouter();
  const [accountCreated, setAccountCreated] = useState(false);

  const dict = getDictionary(lang);

  const signUp = () => {
    const res = fetch(`/api/auth/sign-up/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      res.json().then((data) => {
        displayToastAfterFetch(res, data, () => {
          setTimeout(() => {
            router.push('/');
          }, 2000);
        });
      });
    });
  };

  useEffect(() => {
    if (token && !accountCreated) {
      signUp();
      setAccountCreated(true);
    }
  }, [token, accountCreated]);

  return (
    <div>
      <LoadingSpinner />
      <h1 className='text-lg'>
        {dict.auth.emailVerification.requestProcessing}
      </h1>
    </div>
  );
}
