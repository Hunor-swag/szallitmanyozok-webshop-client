import { query } from '@/lib/db';
import { stripe } from '@/lib/stripe/stripe';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';
import { CartItem } from '@/types/typings';

export async function POST(req: NextRequest) {
  try {
    const userSession = await getServerSession(authOptions);
    if (!userSession) {
      return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const { firstname, lastname, email, phone, cart } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cart.cartItems.map((item: CartItem) => {
        return {
          price_data: {
            currency: 'eur',
            product_data: {
              name: item.product.attributes.name,
            },
            unit_amount: item.product.attributes.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      mode: 'payment',
      success_url: `${process.env.URL}/successful-payment/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL}/cancelled-payment/{CHECKOUT_SESSION_ID}`,
    });

    await fetch(`${process.env.URL}/api/payments/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: session.id,
        user_id: userSession.user.id || null,
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
        cart: cart,
        service: 'stripe',
        paid: false,
        firstname,
        lastname,
        phone,
        email,
      }),
    });

    return new NextResponse(JSON.stringify(session), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse(error, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
