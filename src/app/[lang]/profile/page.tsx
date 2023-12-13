import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import EditBillingDetailsForm from '@/components/profile/EditBillingDetailsForm';
import EditProfileForm from '@/components/profile/EditProfileForm';
import { getUserByEmail } from '@/lib/users';
import { getServerSession } from 'next-auth';
import React from 'react';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const user = await getUserByEmail(session.user.email);

  return (
    <div className='p-10 rounded-lg bg-white flex flex-col space-y-4'>
      <h1 className='text-2xl font-semibold'>Edit Profile</h1>
      <EditProfileForm user={user} />
      <h1 className='text-2xl font-semibold'>Edit Billing Details</h1>
      <EditBillingDetailsForm user={user} />
    </div>
  );
}
