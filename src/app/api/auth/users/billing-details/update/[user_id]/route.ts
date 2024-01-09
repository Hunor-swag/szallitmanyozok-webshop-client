import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { query } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  req: NextRequest,
  { params }: { params: { user_id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(JSON.stringify({ message: 'Unauthenticated' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const { tax, country, state, city, postal_code, address } =
      await req.json();

    const { user_id } = params;

    const queryString = `UPDATE webshop_users SET tax = ?, billing_country = ?, billing_state = ?, billing_city = ?, billing_postal_code = ?, billing_address = ? WHERE id = ?`;

    const res = await query('szallitmanyozok-webshop', queryString, [
      tax,
      country,
      state,
      city,
      postal_code,
      address,
      user_id,
    ]);

    return new NextResponse(JSON.stringify(res), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
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
