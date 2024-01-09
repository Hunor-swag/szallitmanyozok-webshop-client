import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import EditBillingDetailsForm from '@/components/profile/EditBillingDetailsForm';
import EditProfileForm from '@/components/profile/EditProfileForm';
import { getDictionary } from '@/lib/getDictionary';
import { getUserByEmail } from '@/lib/users';
import { getServerSession } from 'next-auth';
import React from 'react';

export default async function ProfilePage({
  params,
}: {
  params: { lang: string };
}) {
  const session = await getServerSession(authOptions);
  const user = await getUserByEmail(session?.user?.email);

  const dict = getDictionary(params.lang).profile;

  return (
    <div className='p-10 rounded-lg bg-white flex flex-col space-y-4'>
      <h1 className='text-2xl font-semibold'>{dict.editProfile}</h1>
      <EditProfileForm lang={params.lang} user={user} />
      <h1 className='text-2xl font-semibold'>{dict.billingDetails}</h1>
      <EditBillingDetailsForm user={user} />
    </div>
  );
}
