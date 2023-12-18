import { query } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  try {
    const { id, paid } = await req.json();

    // check if payment already exists

    const checkQueryString = `SELECT * FROM webshop_payments WHERE id = ?`;
    const checkResult = (await query(
      'szallitmanyozok-webshop',
      checkQueryString,
      [id]
    )) as Array<any>;

    if (checkResult.length === 0) {
      // payment already exists
      return new NextResponse(
        JSON.stringify({ message: 'Payment session not found' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // add payment if not already in database

    const queryString = `UPDATE webshop_payments SET paid = ? WHERE id = ?`;

    const res = await query('szallitmanyozok-webshop', queryString, [paid, id]);

    return new NextResponse(JSON.stringify({ message: 'Payment updated' }), {
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
