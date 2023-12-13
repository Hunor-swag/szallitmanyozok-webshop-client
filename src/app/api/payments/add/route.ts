import { query } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { checkout_session_id, user_id, timestamp, cart } = await req.json();

    // check if payment already exists

    const checkQueryString = `SELECT * FROM webshop_payments WHERE checkout_session_id = ?`;
    const checkResult = (await query(
      'szallitmanyozok-webshop',
      checkQueryString,
      [checkout_session_id]
    )) as Array<any>;

    if (checkResult.length > 0) {
      return new NextResponse(
        JSON.stringify({ message: 'Payment already exists' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // add payment if not already in database

    const queryString = `INSERT INTO webshop_payments (checkout_session_id, user_id, timestamp, cart) VALUES (?, ?, ?, ?)`;

    const res = await query('szallitmanyozok-webshop', queryString, [
      checkout_session_id,
      user_id,
      timestamp,
      cart,
    ]);

    return new NextResponse(JSON.stringify({ message: 'Payment added' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
