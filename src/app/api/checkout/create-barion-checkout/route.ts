import { barion } from '@/lib/barion/barion';
import { CartItem } from '@/types/typings';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/authOptions';

export async function POST(req: NextRequest) {
  try {
    const { firstname, lastname, email, phone, cart } = await req.json();

    const session = await getServerSession(authOptions);

    let orderPayment = {
      OrderNumber: 'O-2019-0001',
      PaymentRequestId: 'O-2019-0001-1',
      PaymentType: 'Immediate',
      Transactions: [
        {
          POSTransactionId: 'O-2019-0001',
          Payee: 'mogyorosi.hunor@gmail.com',
          Total: 20,
          Items: cart.cartItems.map((item: CartItem) => {
            return {
              Name: item.product.attributes.name,
              Description:
                item.product.attributes.description[0].children[0].text,
              Quantity: item.quantity,
              Unit: 'pcs',
              UnitPrice: item.product.attributes.price,
              ItemTotal: item.product.attributes.price * item.quantity,
            };
          }),
        },
      ],
      ShippingAddress: {
        FullName: firstname + ' ' + lastname,
        Zip: '1000',
        City: 'Budapest',
        Street: 'Kossuth Street 2.',
      },
      Currency: 'EUR',
      RedirectUrl: `${process.env.URL}/successful-payment`,
      CallbackUrl: `${process.env.URL}/cancelled-payment`,
    };

    return barion.startPayment(orderPayment as any, function (err, data) {
      data.RedirectUrl = `${process.env.URL}/successful-payment/${data.PaymentId}`;
      data.CallbackUrl = `${process.env.URL}/cancelled-payment/${data.PaymentId}`;
      if (err) {
        return new NextResponse(JSON.stringify({ message: err.message }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      fetch(`${process.env.URL}/api/payments/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: data.PaymentId,
          user_id: session.user.id || null,
          timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
          cart: cart,
          service: 'barion',
          paid: false,
          firstname,
          lastname,
          phone,
          email,
        }),
      });

      return new NextResponse(JSON.stringify(data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
