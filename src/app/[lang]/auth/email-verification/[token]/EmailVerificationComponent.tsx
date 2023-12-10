'use client';

import LoadingSpinner from '@/components/ui/loading-spinner';
import { displayToastAfterFetch } from '@/lib/toasts';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EmailVerificationComponent({
  token,
}: {
  token: string;
}) {
  const router = useRouter();
  const [accountCreated, setAccountCreated] = useState(false);

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
      <h1 className='text-lg'>You're request is being processed...</h1>
    </div>
  );
}
