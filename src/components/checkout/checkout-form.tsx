'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import TextInput from '../ui/text-input';
import { useEffect, useState } from 'react';
import { CheckoutDialog } from './checkout-dialog';
import CheckoutCartTable from './checkout-cart-table';
import Button from '../Button';
import { useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';
import { useShoppingCart } from '@/hooks/useShoppingCart';
import RadioStyleButton from '../ui/radio-style-button';
import { useRouter } from 'next/navigation';
import { getDictionary } from '@/lib/getDictionary';

interface FormData {
  firstname: string;
  lastname: string;
  tax: string;
  email: string;
  phone: string;
  state: string;
  city: string;
  postal_code: string;
  address: string;
  terms: string;
  save_billing_details: boolean;

  workshop_data: [
    {
      workshop_name: string;
      participants: {
        name: string;
        email: string;
      }[];
    }
  ];
}

export default function CheckoutForm({ lang }: { lang: string }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
    control,
  } = useForm<FormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'workshop_data',
  });

  let tax = watch('tax');

  const router = useRouter();

  const session = useSession();

  const { cart, applyDiscount } = useShoppingCart();

  const workshops = cart.cartItems?.filter(
    (item) => item.product.attributes.type === 'workshop'
  );

  const [selectedService, setSelectedService] = useState<'stripe' | 'barion'>(
    'stripe'
  );

  useEffect(() => {
    if (session && session.data && session.data.user) {
      const res = fetch(`/api/auth/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session.data.user.email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          reset({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            phone: data.phone,
          });
        });
    }
  }, [session]);

  useEffect(() => {
    if (tax && tax.length >= 8) {
      fetch(`/api/check-tax`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tax: tax,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            applyDiscount(20);
          } else {
            applyDiscount(0);
          }
        });
    } else {
      applyDiscount(0);
    }
  }, [tax]);

  const [dialogOpen, setDialogOpen] = useState(false);

  async function onSubmit(formdata: any) {
    if (formdata.save_billing_details) {
      const user = session.data?.user as { id: string; email: string };
      const res = await fetch(
        `/api/auth/users/billing-details/update/${user.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tax: formdata.tax,
            country: formdata.country || 'Hungary',
            state: formdata.state,
            city: formdata.city,
            postal_code: formdata.postal_code,
            address: formdata.address,
          }),
        }
      );
    }

    switch (selectedService) {
      case 'stripe':
        await stripeCheckout(formdata);
        break;
      case 'barion':
        await barionCheckout(formdata);
        break;
    }
  }

  async function stripeCheckout(formdata: any) {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );
    if (!stripe) {
      console.log('No stripe instance');
      return;
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/checkout/create-stripe-checkout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: formdata.firstname,
          lastname: formdata.lastname,
          email: formdata.email,
          phone: formdata.phone,
          cart: cart,
        }),
      }
    );
    const session = await res.json();
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error('Error:', error);
    }
  }

  async function barionCheckout(formdata: any) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/checkout/create-barion-checkout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: formdata.firstname,
          lastname: formdata.lastname,
          email: formdata.email,
          phone: formdata.phone,
          cart: cart,
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    router.push(data.GatewayUrl);
  }

  const dict = getDictionary(lang).checkout;

  return (
    <div>
      {!session.data && (
        <div className='flex flex-col justify-start w-full mb-6'>
          <p>
            {dict.alreadyHaveAccount}{' '}
            <button
              type='button'
              onClick={() => setDialogOpen(true)}
              className='text-blue-700'
            >
              {dict.signIn}
            </button>
          </p>
          <CheckoutDialog open={dialogOpen} setOpen={setDialogOpen} />
        </div>
      )}

      <form
        className='flex flex-col space-y-4'
        onSubmit={handleSubmit(async (data) => {
          onSubmit(data);
        })}
      >
        <div className={`flex flex-col space-y-4`}>
          <div className='space-y-4 md:space-y-0 md:flex md:space-x-4'>
            <TextInput
              lang={lang}
              label={dict.form.firstname}
              name='firstname'
              register={register}
              type='text'
              // defaultValue={user ? user.firstname : undefined}
              error={errors.firstname?.message?.toString()}
              required={true}
              placeholder={dict.form.firstname}
            />
            <TextInput
              lang={lang}
              label={dict.form.lastname}
              name='lastname'
              register={register}
              type='text'
              // defaultValue={user ? user.lastname : undefined}
              error={errors.lastname?.message?.toString()}
              required={true}
              placeholder={dict.form.lastname}
            />
          </div>
          <div className='space-y-4 md:space-y-0 md:flex md:space-x-4'>
            <TextInput
              lang={lang}
              label={dict.form.email}
              name='email'
              register={register}
              type='email'
              // defaultValue={user ? user.email : undefined}
              error={errors.email?.message?.toString()}
              required={true}
              placeholder='email@example.com'
            />
            <TextInput
              lang={lang}
              label={dict.form.phone}
              name='phone'
              register={register}
              type='text'
              // defaultValue={user ? user.phone : undefined}
              error={errors.phone?.message?.toString()}
              required={true}
              placeholder={dict.form.phone}
            />
          </div>
          <h1 className='text-lg font-semibold'>
            {dict.form.billingDetails.title}
          </h1>
          <div className='space-y-4 md:space-y-0 md:flex md:space-x-4'>
            <TextInput
              lang={lang}
              label={dict.form.billingDetails.tax}
              name='tax'
              register={register}
              type='text'
              error={errors.tax?.message?.toString()}
              required={true}
              placeholder='12345678'
              maxLength={8}
            />
          </div>
          <div className='space-y-4 md:space-y-0 md:flex md:space-x-4'>
            {/* Country dropdown */}
            <TextInput
              lang={lang}
              label={dict.form.billingDetails.state}
              name='state'
              register={register}
              type='text'
              error={errors.state?.message?.toString()}
              required={true}
              placeholder={dict.form.billingDetails.state}
            />
          </div>
          <div className='space-y-4 md:space-y-0 md:flex md:space-x-4'>
            <TextInput
              lang={lang}
              label={dict.form.billingDetails.city}
              name='city'
              register={register}
              type='text'
              error={errors.city?.message?.toString()}
              required={true}
              placeholder={dict.form.billingDetails.city}
            />
            <TextInput
              lang={lang}
              label={dict.form.billingDetails.postalCode}
              name='postal_code'
              register={register}
              type='text'
              error={errors.postal_code?.message?.toString()}
              required={true}
              placeholder={dict.form.billingDetails.postalCode}
            />
          </div>
          <div className='space-y-4 md:space-y-0 md:flex md:space-x-4'>
            <TextInput
              lang={lang}
              label={dict.form.billingDetails.address}
              name='address'
              register={register}
              type='text'
              error={errors.address?.message?.toString()}
              required={true}
              placeholder={dict.form.billingDetails.address}
            />
          </div>
          {session.data && (
            <div className={`flex whitespace-nowrap text-xs space-x-1`}>
              <input
                id='save_my_data'
                type='checkbox'
                {...register('save_billing_details')}
              />
              <label
                htmlFor='save_my_data'
                className={`${errors.terms && 'text-red-500'}`}
              >
                {dict.form.billingDetails.saveData}
              </label>
            </div>
          )}
        </div>

        <hr className='border-gray-400' />

        {/* Workshop data */}
        {workshops && workshops.length! > 0 && (
          <div className='flex flex-col space-y-4'>
            {workshops?.map((workshop, index) => (
              <div key={index} className='flex flex-col space-y-4'>
                <h1 className='font-semibold text-xl'>
                  {workshop.product.attributes.name} {dict.form.participants}
                </h1>
                {[...Array(workshop.quantity)].map((_, i) => (
                  <div key={i} className='flex space-x-4'>
                    <TextInput
                      lang={lang}
                      label={dict.form.name}
                      name={`workshop_data.${index}.participants.${i}.name`}
                      register={register}
                      type='text'
                      minLength={2}
                      required={true}
                      placeholder={dict.form.name}
                      error={errors?.workshop_data?.[index]?.participants?.[
                        i
                      ]?.name?.message?.toString()}
                    />
                    <TextInput
                      lang={lang}
                      label={dict.form.email}
                      name={`workshop_data.${index}.participants.${i}.email`}
                      register={register}
                      type='email'
                      minLength={2}
                      required={true}
                      placeholder={dict.form.email}
                      error={errors?.workshop_data?.[index]?.participants?.[
                        i
                      ]?.email?.message?.toString()}
                    />
                  </div>
                ))}
              </div>
            ))}
            <hr className='border-gray-400' />
          </div>
        )}

        <CheckoutCartTable lang={lang} />
        <div className='flex space-x-4'>
          <RadioStyleButton
            onClick={() => setSelectedService('stripe')}
            selected={selectedService === 'stripe'}
          >
            Stripe
          </RadioStyleButton>
          <RadioStyleButton
            onClick={() => setSelectedService('barion')}
            selected={selectedService === 'barion'}
          >
            Barion
          </RadioStyleButton>
        </div>

        <div className='flex justify-end py-4'>
          <Button>{dict.checkout}</Button>
        </div>
      </form>
    </div>
  );
}
