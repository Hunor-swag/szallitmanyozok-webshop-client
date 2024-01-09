import { query } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { emailContent } from './html';
const mailgun = require('mailgun-js');

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

    // get email

    const emailQueryString = `SELECT email FROM webshop_payments WHERE id = ?`;
    const emailResult = (await query(
      'szallitmanyozok-webshop',
      emailQueryString,
      [id]
    )) as Array<any>;

    const email = emailResult[0].email;

    // send email

    const api_key = process.env.MAILGUN_API_KEY;
    const domain = process.env.MAILGUN_DOMAIN;
    const host = process.env.MAILGUN_HOST;
    // console.log(api_key, domain);
    const mg = mailgun({ apiKey: api_key, domain: domain, host: host });

    const data = {
      from: 'Szállítmányozók Webshop <noreply@webshop.szallitmanyozok.com>',
      to: email,
      subject: 'Order confirmation',
      html: emailContent(),
    };

    mg.messages().send(data, function (error: any, body: any) {
      if (!error) {
        console.log(body);
      } else {
        console.log(error);
      }
    });

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
